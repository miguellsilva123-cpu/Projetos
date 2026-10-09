// Versão 2 dos 8 posts mais fracos: texto maior, paleta da marca (escuro / creme / dourado)
const NOISE = (op = 0.5) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';
const GOLD = '#C9A227';
const SEARCH_ICON = (c, s) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>`;
const GRAIN = (op) => `body:after{content:'';position:absolute;inset:0;background:${NOISE(op)};pointer-events:none}`;

module.exports = [
  {
    dir: 'simples', file: 'post-04-elogio-escolha-v2.png',
    css: `
      body{background:#EFEBE4}${GRAIN(0.14)}
      .k{position:absolute;top:110px;left:100px;font:600 26px Montserrat;letter-spacing:8px;color:#8a7f70}
      .t{position:absolute;top:170px;left:100px;right:100px;font:400 128px/1 'DM Serif Display';color:#141414;letter-spacing:-1px}
      .t i{color:#8B1E2D}
      .a{position:absolute;top:560px;left:100px;right:100px}
      .row{display:flex;gap:30px;align-items:flex-start;padding:40px 0;border-top:2px solid #141414}
      .ic{font:700 56px/1.1 Inter;width:60px;flex:none}
      .x{color:#a39a8d}.x .tx{color:#a39a8d;text-decoration:line-through;text-decoration-thickness:5px}
      .tx{font:italic 400 66px/1.12 'DM Serif Display';color:#141414}
      .f{position:absolute;bottom:150px;left:100px;right:100px;font:500 38px/1.35 Inter;color:#4a443c}
      .f b{color:#141414}
      .h{color:#8a7f70}`,
    body: `<div class="k">REGRA DO ELOGIO</div>
      <div class="t">Elogie o que ela <i>escolheu.</i></div>
      <div class="a"><div class="row x"><div class="ic">✕</div><div class="tx">“Você é linda.”</div></div>
      <div class="row" style="border-bottom:2px solid #141414"><div class="ic">✓</div><div class="tx">“Seu jeito de contar história no story é viciante.”</div></div></div>
      <div class="f">Uma mostra que você olhou.<br><b>A outra mostra que você prestou atenção.</b></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-05-enquete-v2.png',
    css: `
      body{background:#0E0E0E}${GRAIN(0.2)}
      .k{position:absolute;top:120px;left:100px;font:600 28px Montserrat;letter-spacing:8px;color:${GOLD}}
      .t{position:absolute;top:180px;left:100px;right:100px;font:900 92px/1.04 Montserrat;color:#F4F4F4;letter-spacing:-2px}
      .p{position:absolute;left:100px;right:100px;height:180px;border-radius:28px;display:flex;align-items:center;padding:0 46px;gap:34px;font:700 52px/1.1 Inter,${EMO}}
      .p1{top:640px;border:3px solid #3a3a3a;color:#EDEDED}
      .p2{top:860px;background:${GOLD};color:#111}
      .l{font:900 76px Montserrat;width:70px}
      .p1 .l{color:#6d6d6d}
      .b{position:absolute;top:1110px;left:0;right:0;text-align:center;font:600 40px Inter,${EMO};color:#BDBDBD}
      .h{color:#5a5a5a}`,
    body: `<div class="k">ENQUETE</div>
      <div class="t">Primeira mensagem:<br>qual você manda?</div>
      <div class="p p1"><span class="l">A</span>Um elogio</div>
      <div class="p p2"><span class="l">B</span>Uma pergunta sobre o story dela</div>
      <div class="b">Comenta A ou B 👇</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-06-perguntas-v2.png',
    css: `
      body{background:radial-gradient(circle at 70% 30%,#2a2a2a,#151515 70%)}${GRAIN(0.22)}
      .q{position:absolute;right:-40px;top:40px;font:400 1050px/1 'DM Serif Display';color:transparent;-webkit-text-stroke:3px rgba(201,162,39,.28)}
      .t{position:absolute;top:330px;left:100px;right:120px;font:400 112px/1.06 'DM Serif Display';color:#F2F2F2}
      .t i{color:${GOLD}}
      .s{position:absolute;top:870px;left:100px;font:600 54px Inter,${EMO};color:#8d8d8d}
      .s s{text-decoration-thickness:5px;text-decoration-color:#d04a4a}
      .h{color:#5d5d5d}`,
    body: `<div class="q">?</div>
      <div class="t">Interesse se mostra em <i>perguntas.</i></div>
      <div class="s">Não em <s>🔥😍👀</s></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-08-pesquisa-v2.png',
    css: `
      body{background:#121212}${GRAIN(0.18)}
      .sb{position:absolute;top:170px;left:70px;right:70px;height:150px;border-radius:75px;background:#232323;border:2px solid #333;display:flex;align-items:center;gap:30px;padding:0 50px}
      .q{font:400 50px Inter;color:#EDEDED}
      .cur{display:inline-block;width:4px;height:56px;background:${GOLD};margin-left:6px;vertical-align:middle}
      .a1{position:absolute;top:560px;left:100px;font:500 46px Inter;color:#8a8a8a}
      .a2{position:absolute;top:640px;left:100px;right:90px;font:400 118px/1.04 'DM Serif Display';color:#F4F4F4}
      .a2 i{color:${GOLD}}
      .h{color:#5a5a5a}`,
    body: `<div class="sb">${SEARCH_ICON('#8a8a8a', 52)}<span class="q">como fazer ela me responder<span class="cur"></span></span></div>
      <div class="a1">Talvez a pergunta certa seja:</div>
      <div class="a2">O que eu mandei que <i>mereça</i> uma resposta?</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-10-recibo-v2.png',
    css: `
      body{background:#1C1C1C}${GRAIN(0.2)}
      .r{position:absolute;top:80px;left:110px;width:860px;height:1140px;background:#F6F3EC;transform:rotate(-1.5deg);box-shadow:0 40px 90px rgba(0,0,0,.6);padding:80px 70px;font-family:'Courier Prime',${EMO};color:#1a1a1a;
        -webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/44px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/44px 51% repeat-x}
      .s2{font:700 70px/1 'Courier Prime';text-align:center}
      .s3{font:400 30px 'Courier Prime';color:#666;text-align:center;margin-top:16px}
      .d{border-top:4px dashed #9a9a9a;margin:44px 0}
      .row{display:flex;justify-content:space-between;font:400 48px 'Courier Prime',${EMO};margin:26px 0}
      .g{font-weight:700}
      .tot{display:flex;justify-content:space-between;font:700 64px 'Courier Prime'}
      .bc{height:100px;margin:56px 10px 0;background:repeating-linear-gradient(90deg,#1a1a1a 0 5px,transparent 5px 9px,#1a1a1a 9px 11px,transparent 11px 18px,#1a1a1a 18px 24px,transparent 24px 28px)}
      .h{color:#6a6a6a;bottom:44px}`,
    body: `<div class="r"><div class="s2">RECIBO DA<br>CONVERSA</div><div class="s3">caixa: direct · 23:41</div>
      <div class="d"></div>
      <div class="row"><span>oi</span><span>R$ 0</span></div>
      <div class="row"><span>🔥</span><span>R$ 0</span></div>
      <div class="row"><span>oi linda</span><span>R$ 0</span></div>
      <div class="d"></div>
      <div class="row g"><span>pergunta sobre<br>o story dela</span><span>30 seg</span></div>
      <div class="d"></div>
      <div class="tot"><span>TOTAL</span><span>ATENÇÃO</span></div>
      <div class="bc"></div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-11-dicionario-v2.png',
    css: `
      body{background:#EFE9DF}${GRAIN(0.14)}
      .w{position:absolute;top:150px;left:100px;right:100px}
      .wd{font:900 168px/1 'Playfair Display';color:#141414;letter-spacing:-2px}
      .ph{font:400 40px 'Playfair Display';color:#7d7466;margin-top:24px}
      .ph i{color:#8B1E2D}
      .ln{height:3px;background:#141414;margin:50px 0}
      .df{display:flex;gap:28px;font:400 50px/1.25 'Playfair Display';color:#222;margin-bottom:40px}
      .n{font:700 50px 'Playfair Display';color:#8B1E2D;flex:none}
      .ne{margin-top:30px;padding:36px 40px;background:#141414;color:#F2EEE6;font:400 44px/1.3 'Playfair Display'}
      .ne b{color:${GOLD};font-weight:700}
      .h{color:#8a8071}`,
    body: `<div class="w"><div class="wd">insistir</div>
      <div class="ph">in·sis·tir · <i>verbo</i></div>
      <div class="ln"></div>
      <div class="df"><span class="n">1.</span><span>Repetir a mesma mensagem esperando outro resultado.</span></div>
      <div class="df"><span class="n">2.</span><span>Não aceitar o silêncio como resposta.</span></div>
      <div class="ne"><b>≠ persistir:</b> melhorar a abordagem e respeitar o “não”.</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-12-e-agora-v2.png',
    css: `
      body{background:#0F0F0F}${GRAIN(0.2)}
      .in{position:absolute;top:150px;left:80px;max-width:760px;background:#262626;color:#F2F2F2;font:500 58px/1.2 Inter,${EMO};padding:38px 48px;border-radius:52px 52px 52px 14px}
      .ty{position:absolute;top:420px;right:80px;background:${GOLD};border-radius:52px 52px 14px 52px;padding:40px 54px;display:flex;gap:18px}
      .ty span{width:26px;height:26px;border-radius:50%;background:#111;opacity:.85}
      .ty span:nth-child(2){opacity:.55}.ty span:nth-child(3){opacity:.3}
      .t{position:absolute;top:700px;left:80px;font:900 110px/1.02 Montserrat;color:#F4F4F4;letter-spacing:-3px}
      .t span{color:${GOLD}}
      .s{position:absolute;top:1000px;left:80px;right:80px;font:500 46px/1.3 Inter;color:#9a9a9a}
      .h{color:#555}`,
    body: `<div class="in">kkkk sim! e você, já foi lá?</div>
      <div class="ty"><span></span><span></span><span></span></div>
      <div class="t">Ela respondeu.<br><span>E agora?</span></div>
      <div class="s">Abrir é fácil. Continuar a conversa é que mostra presença.</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-03-terminal-v2.png',
    css: `
      body{background:#0E0F10}${GRAIN(0.18)}
      .win{position:absolute;top:110px;left:60px;right:60px;background:#18191B;border:1px solid #2C2F33;border-radius:26px;overflow:hidden;box-shadow:0 40px 90px rgba(0,0,0,.6)}
      .tb{height:76px;background:#212326;display:flex;align-items:center;gap:16px;padding:0 30px}
      .dot{width:22px;height:22px;border-radius:50%;background:#45484D}
      .bd{padding:50px 46px 60px;font:400 44px/1.7 'Space Mono';color:#E6E6E6}
      .p{color:#6f747a}
      .e{color:#111;font-weight:700;background:#E6E6E6;padding:2px 14px}
      .cur{display:inline-block;width:24px;height:46px;background:${GOLD};vertical-align:middle}
      .t{position:absolute;top:900px;left:60px;right:60px;font:700 86px/1.12 'Space Mono';color:#F2F2F2;letter-spacing:-2px}
      .t span{color:${GOLD}}
      .h{color:#555}`,
    body: `<div class="win"><div class="tb"><span class="dot"></span><span class="dot"></span><span class="dot"></span></div>
      <div class="bd"><span class="p">$</span> enviar "oi sumida"<br>
      <span class="p">›</span> contexto: nenhum<br>
      <span class="p">›</span> assunto: nenhum<br>
      <span class="e">ERRO: mensagem genérica</span><br>
      <span class="p">$</span> <span class="cur"></span></div></div>
      <div class="t">Mensagem genérica <span>não compila.</span></div>
      <div class="h">${H}</div>`,
  },
];
