import fs from 'node:fs';
import {spawnSync} from 'node:child_process';
const dir='out/review/refined-frames';fs.mkdirSync(dir,{recursive:true});
for(const frame of [0,54,89,90,179,180,250,284,285,320,360,404,405,430,470,490,505,515,533,550,590,629,630,700,749]){
 const r=spawnSync('node_modules/@remotion/compositor-linux-x64-gnu/ffmpeg',['-y','-ss',String(frame/30),'-i','out/ori-studio-showcase-refined.mp4','-frames:v','1','-vf','scale=390:693',`${dir}/${frame}.png`],{encoding:'utf8'});if(r.status!==0)throw Error(r.stderr);
}
console.log('Extracted 25 phone-size encoded frames including both sides of each cut.');
