// Reel "O direct dela depois de 1 story": 1080x1920, 30 fps, 17 s, texto animado sem rosto.
// Uso: node reel.js <saida.mp4> <capa.jpg>
// Renderiza quadro a quadro (Playwright) e junta com ffmpeg. A música entra no app, na hora de postar.
const { chromium } = require('playwright');
const { spawn } = require('child_process');
const fs = require('fs');
const path = require('path');

const [OUT, COVER] = process.argv.slice(2);
const W = 1080, H = 1920, FPS = 30, DUR = 17;
const G = '#C9A23F', CREAM = '#F0E5D8';
const EMO = `'Noto Color Emoji'`;
const NOISE = (op) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

// Do mais antigo para o mais novo. Os 6 primeiros já aparecem no primeiro quadro.
const MSGS = ['🔥', 'linda 😍', 'oi sumida', '🔥🔥🔥', 'tá on?', '😍😍', 'bom dia princesa', '🔥', 'oi',
  'nossa 😳', 'me responde', 'gata', '👀', '🔥', 'oiii', 'que isso 🔥', 'visualizou e não respondeu?'];
const NAMEW = [210, 160, 240, 190, 150, 230, 180, 250, 170, 200, 220, 160, 240, 190, 210, 175, 230];
const ROW = 116;

const css = `
*{margin:0;padding:0;box-sizing:border-box}
html,body{width:${W}px;height:${H}px;overflow:hidden;position:relative;-webkit-font-smoothing:antialiased}
body{background:radial-gradient(ellipse at 80% 12%,#2a1e10 0%,#120d08 45%,#070605 100%);font-family:Inter,${EMO}}
body:after{content:'';position:absolute;inset:0;background:${NOISE(0.22)};pointer-events:none;z-index:9}
.k{position:absolute;top:196px;left:60px;right:60px;font:600 28px Montserrat,${EMO};color:${G};letter-spacing:3px;white-space:nowrap}
.t{position:absolute;top:262px;left:60px;right:60px;font:400 92px/1.04 'Playfair Display';color:${CREAM}}
.t i{color:${G}}
.card{position:absolute;top:520px;left:60px;width:900px;height:960px;border-radius:44px;overflow:hidden;
  background:linear-gradient(180deg,#1d160f,#130e09);border:2px solid #2f2619;box-shadow:0 40px 90px rgba(0,0,0,.55)}
.ch{height:104px;display:flex;align-items:center;justify-content:space-between;padding:0 44px;border-bottom:2px solid #2a2117;
  font:700 38px Inter;color:${CREAM}}
.badge{min-width:76px;height:56px;border-radius:28px;background:${G};color:#16110a;font:800 32px Inter;
  display:flex;align-items:center;justify-content:center;padding:0 18px}
.list{position:absolute;top:104px;left:0;right:0;bottom:0}
.r{position:absolute;left:0;right:0;height:${ROW}px;display:flex;align-items:center;gap:26px;padding:0 44px}
.av{flex:none;width:78px;height:78px;border-radius:50%;background:radial-gradient(circle at 35% 35%,#6b5c49,#2c241b);filter:blur(1.5px)}
.tx{flex:1;min-width:0}
.nm{height:20px;border-radius:10px;background:linear-gradient(90deg,#5a4d3d,#3a3127);filter:blur(5px);margin-bottom:14px}
.pv{font:700 40px Inter,${EMO};color:${CREAM};white-space:nowrap;overflow:hidden;text-overflow:ellipsis}
.pv s{text-decoration:none;font:500 26px Inter;color:#8a7a5c;margin-left:14px}
.dot{flex:none;width:20px;height:20px;border-radius:50%;background:${G}}
.good{position:absolute;top:150px;left:36px;right:36px;padding:34px 40px 36px;border-radius:34px;
  background:linear-gradient(180deg,#2b2113,#1b140c);border:3px solid ${G};box-shadow:0 0 60px rgba(201,162,63,.35)}
.gl{display:inline-block;font:800 24px Montserrat;letter-spacing:4px;color:#16110a;background:${G};padding:10px 20px;border-radius:12px;margin-bottom:22px}
.gm{font:600 44px/1.3 Inter,${EMO};color:${CREAM}}
.gs{font:500 26px Inter;color:#9c8a66;margin-top:16px}
.notes{position:absolute;top:640px;left:60px;right:60px;display:flex;flex-direction:column;gap:30px}
.n{font:500 40px/1.25 Inter;color:${CREAM}}
.n b{display:inline-block;width:62px;color:${G};font:700 44px 'Playfair Display'}
#C{position:absolute;inset:0;text-align:center}
.c1{position:absolute;top:330px;left:40px;right:40px;font:400 80px/1.08 'Playfair Display';color:${CREAM}}
.c2{position:absolute;top:530px;left:40px;right:40px;font:italic 400 80px/1.08 'Playfair Display';color:${G}}
.c3{position:absolute;top:820px;left:60px;right:60px;font:500 42px/1.35 Inter;color:#d9cdb9}
.c4{position:absolute;top:1010px;left:0;right:0;font:700 30px Montserrat;color:${G};letter-spacing:7px}
.pill{position:absolute;top:1070px;left:50%;padding:28px 70px;border-radius:32px;background:${G};
  font:900 112px/1 Montserrat;color:#16110a;letter-spacing:4px;box-shadow:0 0 80px rgba(201,162,63,.45)}
.c5{position:absolute;top:1262px;left:0;right:0;font:500 42px Inter,${EMO};color:${CREAM}}
.c6{position:absolute;top:1360px;left:0;right:0;font:600 28px Inter;color:#6f6450;letter-spacing:3px}
/* Capa: título maior, centralizado na área 3:4 que aparece no grid */
body.cover .k{top:300px;text-align:center}
body.cover .t{top:356px;text-align:center;font-size:104px}
body.cover .card{top:640px}
`;

const rows = MSGS.map((m, i) =>
  `<div class="r" id="r${i}"><div class="av"></div><div class="tx"><div class="nm" style="width:${NAMEW[i]}px"></div>` +
  `<div class="pv">${m}<s>· agora</s></div></div><div class="dot"></div></div>`).join('');

const body = `
<div id="A">
  <div class="k">STORY DELA: “SÓ MAIS UM EPISÓDIO” 📺</div>
  <div class="t" id="hA">O direct dela<br><i>5 minutos depois:</i></div>
  <div class="t" id="hB" style="opacity:0">47 mensagens.<br><i>Ela respondeu uma.</i></div>
  <div class="card">
    <div class="ch">Mensagens <span class="badge" id="cnt">6</span></div>
    <div class="list" id="list">${rows}</div>
    <div class="good" id="good" style="opacity:0">
      <div class="gl">✓ RESPONDIDA</div>
      <div class="gm">Só mais um episódio à 1h da manhã? Qual série tá te sequestrando? 😅</div>
      <div class="gs">respondeu ao seu story · agora</div>
    </div>
    <div class="notes">
      <div class="n" id="n0" style="opacity:0"><b>1</b>Viu o detalhe (1h da manhã)</div>
      <div class="n" id="n1" style="opacity:0"><b>2</b>Pergunta fácil de responder</div>
      <div class="n" id="n2" style="opacity:0"><b>3</b>Leve, sem pressão</div>
    </div>
  </div>
</div>
<div id="C" style="opacity:0">
  <div class="c1" id="c1">Ela não responde<br>o cara mais bonito.</div>
  <div class="c2" id="c2">Responde quem<br>prestou atenção.</div>
  <div class="c3" id="c3">Separei 10 aberturas assim,<br>prontas pra adaptar.</div>
  <div class="c4" id="c4">MANDA NO MEU DIRECT</div>
  <div class="pill" id="pill">ABERTURA</div>
  <div class="c5" id="c5">que eu te envio grátis 🎁</div>
  <div class="c6" id="c6">@oprotocolodapresenca</div>
</div>`;

// Roda dentro da página: posiciona tudo em função do tempo t (determinístico, quadro a quadro).
function render(t, P) {
  const cl = (x) => Math.max(0, Math.min(1, x));
  const ease = (x) => 1 - Math.pow(1 - cl(x), 3);
  const f = (a, b) => ease((t - a) / (b - a));
  const $ = (id) => document.getElementById(id);
  const arrive = (i) => (i < 6 ? -1 : 0.25 + (i - 6) * 0.35);

  // Cena A: mensagens chegando
  let n = 0; for (let i = 0; i < P.count; i++) if (t >= arrive(i)) n = i + 1;
  const slide = n > 6 ? f(arrive(n - 1), arrive(n - 1) + 0.16) : 1;
  for (let i = 0; i < P.count; i++) {
    const r = $('r' + i);
    if (i >= n) { r.style.display = 'none'; continue; }
    r.style.display = 'flex';
    r.style.top = ((n - 1 - i) * P.row + (slide - 1) * P.row) + 'px';
    r.style.opacity = i === n - 1 ? String(slide) : '1';
  }
  const cnt = Math.round(6 + 41 * ease(t / 4.5));
  $('cnt').textContent = cnt;
  const dim = f(6.6, 7.0);
  $('list').style.opacity = String(1 - 0.88 * dim);
  $('list').style.filter = `blur(${4 * dim}px)`;
  $('hA').style.opacity = String(1 - f(6.5, 6.8));
  $('hB').style.opacity = String(f(6.7, 7.0));

  // Cena B: a mensagem que ela responde + por quê
  const g = f(7.0, 7.4);
  $('good').style.opacity = String(g);
  $('good').style.transform = `translateY(${(g - 1) * 40}px) scale(${0.96 + 0.04 * g})`;
  [8.2, 8.8, 9.4].forEach((a, i) => {
    const k = f(a, a + 0.3);
    $('n' + i).style.opacity = String(k);
    $('n' + i).style.transform = `translateX(${(k - 1) * 40}px)`;
  });

  // Cena C: virada + chamada para o direct
  $('A').style.opacity = String(1 - f(11.6, 11.95));
  $('C').style.opacity = String(f(11.85, 12.1));
  const up = (id, a) => { const k = f(a, a + 0.35); $(id).style.opacity = String(k); $(id).style.transform = `translateY(${(1 - k) * 30}px)`; };
  up('c1', 11.9); up('c2', 12.5); up('c3', 13.3); up('c4', 13.9); up('c5', 14.4); up('c6', 14.4);
  const p = f(13.9, 14.3);
  const pulse = t > 14.6 ? 1 + 0.035 * Math.sin((t - 14.6) * 5) : 1;
  $('pill').style.opacity = String(p);
  $('pill').style.transform = `translateX(-50%) scale(${(0.85 + 0.15 * p) * pulse})`;
}

(async () => {
  const dir = path.join(__dirname, 'html');
  fs.mkdirSync(dir, { recursive: true });
  const file = path.join(dir, 'reel-direct-dela.html');
  fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../fonts/local.css">` +
    `<style>${css}</style></head><body>${body}<script>${render.toString()}</script></body></html>`);

  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: W, height: H } });
  await page.goto('file://' + file);
  await page.evaluate(() => document.fonts.ready);
  await page.waitForTimeout(300);
  const P = { count: MSGS.length, row: ROW };

  if (COVER) {
    await page.evaluate(({ P }) => { document.body.classList.add('cover'); render(5.8, P); }, { P });
    await page.screenshot({ path: COVER, type: 'jpeg', quality: 92 });
    await page.evaluate(() => document.body.classList.remove('cover'));
    console.log('capa ok', COVER);
  }

  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(FPS), '-c:v', 'mjpeg', '-i', '-',
    '-f', 'lavfi', '-i', 'anullsrc=r=44100:cl=stereo', '-shortest',
    '-c:v', 'libx264', '-pix_fmt', 'yuv420p', '-profile:v', 'high', '-crf', '18', '-preset', 'medium', '-r', String(FPS),
    '-c:a', 'aac', '-b:a', '128k', '-movflags', '+faststart', OUT], { stdio: ['pipe', 'inherit', 'inherit'] });
  const total = DUR * FPS;
  for (let i = 0; i < total; i++) {
    await page.evaluate(({ t, P }) => render(t, P), { t: i / FPS, P });
    const buf = await page.screenshot({ type: 'jpeg', quality: 93 });
    if (!ff.stdin.write(buf)) await new Promise((r) => ff.stdin.once('drain', r));
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  await browser.close();
  console.log('reel ok', OUT);
})();
