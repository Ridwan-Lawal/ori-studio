import fs from "node:fs";
import path from "node:path";
import assert from "node:assert/strict";
import { spawnSync } from "node:child_process";
import { createHash } from "node:crypto";
const root = path.resolve(import.meta.dirname, "../node_modules/@remotion");
const native = fs
  .readdirSync(root)
  .find(
    (n) =>
      n.startsWith("compositor-") &&
      fs.existsSync(
        path.join(
          root,
          n,
          process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
        ),
      ),
  );
const executable = (n) =>
  path.join(root, native, n + (process.platform === "win32" ? ".exe" : ""));
const input = "out/ori-studio-showcase-refined.mp4";
const probe = spawnSync(
  executable("ffprobe"),
  ["-v", "error", "-show_streams", "-show_format", "-of", "json", input],
  { encoding: "utf8" },
);
assert.equal(probe.status, 0, probe.stderr);
const metadata = JSON.parse(probe.stdout);
const video = metadata.streams.find((s) => s.codec_type === "video");
assert.equal(video.width, 1080);
assert.equal(video.height, 1920);
assert.equal(video.codec_name, "h264");
assert(["yuv420p", "yuvj420p"].includes(video.pix_fmt), "Expected 8-bit 4:2:0 H.264 output");
assert.equal(video.r_frame_rate, "30/1");
assert.equal(Number(video.nb_frames), 750);
assert.equal(Number(metadata.format.duration), 25);
assert.equal(metadata.streams.length, 1);
const decoded = spawnSync(
  executable("ffmpeg"),
  [
    "-v",
    "error",
    "-threads",
    "1",
    "-i",
    input,
    "-vf",
    "scale=108:192",
    "-pix_fmt",
    "rgb24",
    "-c:v",
    "rawvideo",
    "-f",
    "image2pipe",
    "pipe:1",
  ],
  { maxBuffer: 64 * 1024 * 1024 },
);
assert.equal(decoded.status, 0, String(decoded.stderr));
const bytesPerFrame = 108 * 192 * 3;
assert.equal(decoded.stdout.length, 750 * bytesPerFrame);
const means = [];
const grayFractions = [];
for (let frame = 0; frame < 750; frame++) {
  let sum = 0,
    gray = 0;
  for (let i = frame * bytesPerFrame; i < (frame + 1) * bytesPerFrame; i++) {
    sum += decoded.stdout[i];
    if (
      i % 3 === 0 &&
      Math.abs(decoded.stdout[i] - 128) < 2 &&
      Math.abs(decoded.stdout[i + 1] - 128) < 2 &&
      Math.abs(decoded.stdout[i + 2] - 128) < 2
    )
      gray++;
  }
  means.push(sum / bytesPerFrame);
  grayFractions.push(gray / (108 * 192));
}
assert(
  grayFractions.every((x) => x < 0.08),
  "Unexpected large gray recorder padding",
);
assert(
  means.every((m) => m > 8 && m < 252),
  "Unexpected fully black or blank frame",
);
const checksums = Object.fromEntries(
  [input, "out/ori-studio-cover-refined.png"].map((file) => [
    file,
    createHash("sha256").update(fs.readFileSync(file)).digest("hex"),
  ]),
);
const report = {
  passed: true,
  metadata: {
    width: video.width,
    height: video.height,
    fps: video.r_frame_rate,
    frames: Number(video.nb_frames),
    duration: Number(metadata.format.duration),
    codec: video.codec_name,
    pixelFormat: video.pix_fmt,
    audioTracks: 0,
  },
  decodedFrames: 750,
  blackOrBlankFrames: 0,
  maxGrayFraction: Math.max(...grayFractions),
  frameMeanRange: [Math.min(...means), Math.max(...means)],
  checksums,
  notes: [
    "Every encoded frame decoded successfully.",
    "Blank-frame check supplements, rather than replaces, browser and visual frame review.",
  ],
};
fs.writeFileSync(
  "out/review/refined-output-validation.json",
  JSON.stringify(report, null, 2),
);
console.log(JSON.stringify(report, null, 2));
