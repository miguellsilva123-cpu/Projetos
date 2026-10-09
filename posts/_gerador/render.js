const { chromium } = require('playwright');
const fs = require('fs');
const path = require('path');
const posts = require(process.env.POSTS || './posts');

const OUT = process.argv[2];
const only = process.argv[3]; // filtro opcional por nome de arquivo
const HTML_DIR = path.join(__dirname, 'html');
fs.mkdirSync(HTML_DIR, { recursive: true });

const BASE = `*{margin:0;padding:0;box-sizing:border-box}
html,body{width:1080px;height:1350px;overflow:hidden;position:relative;-webkit-font-smoothing:antialiased}
.h{position:absolute;bottom:56px;left:0;right:0;text-align:center;font:600 24px Inter;letter-spacing:3px;z-index:5}`;

(async () => {
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const p of posts) {
    if (only && !p.file.includes(only)) continue;
    const html = `<!doctype html><html><head><meta charset="utf-8">
      <link rel="stylesheet" href="../fonts/local.css"><style>${BASE}${p.css}</style></head>
      <body>${p.body}</body></html>`;
    const f = path.join(HTML_DIR, p.file.replace('.png', '.html'));
    fs.writeFileSync(f, html);
    await page.goto('file://' + f);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(150);
    const dir = path.join(OUT, p.dir);
    fs.mkdirSync(dir, { recursive: true });
    await page.screenshot({ path: path.join(dir, p.file) });
    console.log('ok', p.dir + '/' + p.file);
  }
  await browser.close();
})();
