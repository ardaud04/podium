// Drive timeline.html frame by frame in headless Chromium and pipe PNGs into ffmpeg.
// usage: node render.mjs <buildDir> [--frames 0,87,328] [--out file]
import { chromium } from 'playwright';
import { spawn } from 'node:child_process';
import { pathToFileURL } from 'node:url';
import fs from 'node:fs';
import path from 'node:path';

const build = path.resolve(process.argv[2]);
const arg = (k) => { const i = process.argv.indexOf(k); return i > 0 ? process.argv[i + 1] : null; };
const only = arg('--frames')?.split(',').map(Number);
const total = JSON.parse(fs.readFileSync(new URL('./edl.json', import.meta.url))).totalFrames;
const frames = only ?? [...Array(total).keys()];

const browser = await chromium.launch({ args: ['--allow-file-access-from-files', '--force-color-profile=srgb'] });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
page.on('console', m => console.log('[page]', m.text()));
page.on('pageerror', e => { console.error('[pageerror]', e); process.exit(1); });
await page.goto(pathToFileURL(path.resolve('timeline.html')).href);
await page.evaluate(u => window.setFrames(u), pathToFileURL(path.join(build, 'frames')).href + '/');
if (!(await page.evaluate(() => window.ready()))) throw new Error('font failed to load');

let ff = null;
if (!only) {
  const out = path.join(build, 'video_only.mp4');
  ff = spawn('ffmpeg', ['-hide_banner', '-loglevel', 'error', '-y', '-f', 'image2pipe', '-framerate', '60', '-c:v', 'png', '-i', '-',
    '-vf', 'scale=out_color_matrix=bt709:out_range=tv:flags=accurate_rnd+full_chroma_int,format=yuv420p',
    '-c:v', 'libx264', '-preset', 'slow', '-crf', '16', '-r', '60',
    '-colorspace', 'bt709', '-color_primaries', 'bt709', '-color_trc', 'bt709', '-color_range', 'tv', out], { stdio: ['pipe', 'inherit', 'inherit'] });
}
const canvas = await page.$('#c');
const t0 = Date.now();
for (const f of frames) {
  await page.evaluate(f => window.render(f), f);
  const png = await canvas.screenshot({ type: 'png' });
  if (ff) { if (!ff.stdin.write(png)) await new Promise(r => ff.stdin.once('drain', r)); }
  else fs.writeFileSync(path.join(build, `still_${String(f).padStart(5, '0')}.png`), png);
  if (f % 60 === 0) console.log(`frame ${f}/${total} ${((Date.now() - t0) / 1000).toFixed(0)}s`);
}
await browser.close();
if (ff) { ff.stdin.end(); await new Promise(r => ff.on('close', r)); }
console.log('done', frames.length, 'frames');
