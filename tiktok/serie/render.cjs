// Uso: node render.cjs <html> <saida.mp4> <duracao_s> [fps] [--frames t1,t2,...] [--range ini,fim]
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const path = require('path');
(async () => {
  const [html, out, durS, fpsS] = process.argv.slice(2);
  const fps = +(fpsS || 30), dur = +durS;
  const fi = process.argv.indexOf('--frames');
  const stills = fi > 0 ? process.argv[fi + 1].split(',').map(Number) : null;
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1920 } });
  await page.goto('file://' + path.resolve(html));
  await page.evaluate(() => document.fonts.ready);
  await page.evaluate(() => Promise.all([...document.images].map(i => i.complete ? 1 : new Promise(r => { i.onload = i.onerror = r; }))));
  await page.waitForTimeout(300);
  const stage = await page.$('#stage');
  if (stills) {
    for (const t of stills) {
      await page.evaluate(t => window.render(t), t);
      await stage.screenshot({ path: `${out}-${t}.jpg`, type: 'jpeg', quality: 80 });
    }
    await browser.close(); return;
  }
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-c:v', 'mjpeg', '-i', '-',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-crf', '18', '-preset', 'medium', '-movflags', '+faststart', out], { stdio: ['pipe', 'inherit', 'inherit'] });
  const n = Math.round(dur * fps);
  const ri = process.argv.indexOf('--range');
  const [r0, r1] = ri > 0 ? process.argv[ri + 1].split(',').map(Number) : [0, n];
  for (let i = r0; i < Math.min(r1, n); i++) {
    await page.evaluate(t => window.render(t), i / fps);
    const buf = await stage.screenshot({ type: 'jpeg', quality: 94 });
    if (!ff.stdin.write(buf)) await new Promise(r => ff.stdin.once('drain', r));
    if (i % 150 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise(r => ff.on('close', r));
  await browser.close();
})();
