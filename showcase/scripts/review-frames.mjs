import fs from "node:fs";
import path from "node:path";
import { spawnSync } from "node:child_process";
const project = path.resolve(import.meta.dirname, "..");
const root = path.join(project, "node_modules/@remotion");
const native = fs
  .readdirSync(root)
  .find(
    (name) =>
      name.startsWith("compositor-") &&
      fs.existsSync(
        path.join(
          root,
          name,
          process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
        ),
      ),
  );
const ffmpeg = path.join(
  root,
  native,
  process.platform === "win32" ? "ffmpeg.exe" : "ffmpeg",
);
const input = process.argv[2] || "out/ori-studio-draft.mp4";
const folder = process.argv[3] || "out/review/draft-frames";
fs.mkdirSync(folder, { recursive: true });
for (const frame of [
  0, 45, 89, 90, 150, 269, 270, 359, 360, 449, 450, 480, 540, 600, 629, 630,
  700, 749,
]) {
  const result = spawnSync(
    ffmpeg,
    [
      "-y",
      "-ss",
      String(frame / 30),
      "-i",
      input,
      "-frames:v",
      "1",
      path.join(folder, String(frame).padStart(3, "0") + ".png"),
    ],
    { encoding: "utf8" },
  );
  if (result.status !== 0) throw Error(result.stderr);
}
console.log(
  "Extracted 18 actual video frames, including both sides of every cut.",
);
