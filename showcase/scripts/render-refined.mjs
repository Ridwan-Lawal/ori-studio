import path from 'node:path';
import {spawnSync} from 'node:child_process';
const cli=path.resolve('node_modules/@remotion/cli/remotion-cli.js');
const render=spawnSync(process.execPath,[cli,'render','OriStudioShowcase','out/review/ori-studio-refined-master.mp4','--browser-executable=/usr/bin/google-chrome','--codec=h264','--crf=18','--pixel-format=yuv420p','--concurrency=1','--timeout=120000','--media-cache-size-in-bytes=268435456','--offthreadvideo-cache-size-in-bytes=67108864',...process.argv.slice(2)],{stdio:'inherit'});
if(render.status!==0)process.exit(render.status||1);
const normalized=spawnSync(process.execPath,['scripts/normalize-color.mjs','out/review/ori-studio-refined-master.mp4','out/ori-studio-showcase-refined.mp4'],{stdio:'inherit'});
if(normalized.status!==0)process.exit(normalized.status||1);
