import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const project = path.resolve(import.meta.dirname, "..");
const nativeRoot = path.join(project, "node_modules/@remotion");
const native = fs
  .readdirSync(nativeRoot)
  .find(
    (name) =>
      name.startsWith("compositor-") &&
      fs.existsSync(
        path.join(
          nativeRoot,
          name,
          process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
        ),
      ),
  );
if (!native)
  throw Error("Install Remotion dependencies for this platform first.");
const bin = path.join(nativeRoot, native);
const executable = (name) =>
  path.join(bin, name + (process.platform === "win32" ? ".exe" : ""));
const media = path.join(project, "public/media");
const manifest = JSON.parse(
  fs.readFileSync(path.join(media, "capture-manifest.json")),
);
fs.mkdirSync(path.join(media, "clips"), { recursive: true });
const durations = {
  "home-desktop": 6,
  "home-mobile": 5.4,
  "services-desktop": 3,
  "lookbook-desktop": 3,
  "booking-mobile": 6,
};
for (const clip of manifest.clips) {
  const input = path.join(media, clip.rawFile);
  const probe = spawnSync(
    executable("ffprobe"),
    ["-v", "error", "-show_entries", "format=duration", "-of", "json", input],
    { encoding: "utf8" },
  );
  if (probe.status !== 0) throw Error(probe.stderr);
  const duration = Number(JSON.parse(probe.stdout).format.duration);
  const start =
    clip.sourceStartSeconds ?? Math.max(0, duration - clip.activeSeconds);
  const output = path.join(media, "clips", clip.name + ".mp4");
  const proc = spawnSync(
    executable("ffmpeg"),
    [
      "-y",
      "-ss",
      String(start),
      "-i",
      input,
      "-an",
      "-r",
      "30",
      "-t",
      String(durations[clip.name]),
      "-c:v",
      "libx264",
      "-crf",
      "16",
      "-preset",
      "medium",
      "-pix_fmt",
      "yuv420p",
      "-movflags",
      "+faststart",
      output,
    ],
    { encoding: "utf8" },
  );
  if (proc.status !== 0) throw Error(proc.stderr);
  clip.prepared = {
    file: "clips/" + clip.name + ".mp4",
    sourceDuration: duration,
    trimStart: start,
    duration: durations[clip.name],
    fps: 30,
    note: "Loading lead-in removed. End frame is held by the composition if the source is shorter than the edit.",
  };
  console.log(clip.name, JSON.stringify(clip.prepared));
}
fs.writeFileSync(
  path.join(media, "capture-manifest.json"),
  JSON.stringify(manifest, null, 2),
);
