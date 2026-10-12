// Renderiza o painel contínuo e fatia em slides 1080x1350.
// Uso: node render.cjs [pasta_saida]
const { chromium } = require('playwright');
const path = require('path');
(async () => {
  const out = process.argv[2] || '.';
  const b = await chromium.launch();
  const p = await b.newPage({ viewport: { width: 8640, height: 1350 } });
  await p.goto('file://' + path.resolve('carrossel.html'));
  await p.evaluate(() => document.fonts.ready);
  await p.waitForFunction(() => window.READY === true);
  await p.waitForTimeout(300);
  const el = await p.$('#pano');
  await el.screenshot({ path: path.join(out, 'painel.png') });
  for (let i = 0; i < 8; i++) {
    await p.screenshot({ path: path.join(out, `slide-${String(i + 1).padStart(2, '0')}.png`), clip: { x: i * 1080, y: 0, width: 1080, height: 1350 } });
  }
  await b.close();
})();
