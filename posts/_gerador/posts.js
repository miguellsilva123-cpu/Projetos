// Definições dos 18 posts (HTML + CSS). Cada post: { dir, file, css, body }
const NOISE = (op = 0.5) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;

const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';
const SEARCH_ICON = (c = '#9AA0A6', s = 40) =>
  `<svg width="${s}" height="${s}" viewBox="0 0 24 24" fill="none" stroke="${c}" stroke-width="2.4" stroke-linecap="round"><circle cx="10.5" cy="10.5" r="6.5"/><line x1="15.5" y1="15.5" x2="21" y2="21"/></svg>`;

module.exports = [
  // ───────────────────────── 12 POSTS VARIADOS ─────────────────────────
  {
    dir: 'simples', file: 'post-01-sem-motivo.png',
    css: `
      body{background:#F3EDE2}
      body:after{content:'';position:absolute;inset:0;background:${NOISE(0.18)};pointer-events:none}
      .w{position:absolute;inset:0;padding:120px 110px;display:flex;flex-direction:column;justify-content:center}
      .q{font:900 300px/1 'Playfair Display';color:#7A1E2C;height:170px;margin-left:-10px}
      .l1{font:700 96px/1.08 'Playfair Display';color:#1D1A16}
      .l2{font:italic 400 96px/1.08 'Playfair Display';color:#7A1E2C;margin-top:30px}
      .r{width:130px;height:5px;background:#1D1A16;margin-top:80px}
      .h{color:#7d7368}`,
    body: `<div class="w"><div class="q">“</div>
      <div class="l1">Ela não está<br>sem tempo.</div>
      <div class="l2">Ela está sem<br>motivo pra<br>responder.</div><div class="r"></div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-02-visto.png',
    css: `
      body{background:#F4E4DC}
      .t{position:absolute;top:100px;left:0;right:0;text-align:center;font:900 82px/1.02 Montserrat;color:#1B1B1B;letter-spacing:-1px}
      .ph{position:absolute;top:330px;left:160px;width:760px;height:880px;background:#fff;border-radius:52px;box-shadow:0 40px 90px rgba(90,40,30,.18);overflow:hidden;font-family:Inter,${EMO}}
      .hd{display:flex;align-items:center;gap:22px;padding:34px 36px;border-bottom:1px solid #eee}
      .bk{font:300 64px/1 Inter;color:#111;margin-top:-8px}
      .av{width:78px;height:78px;border-radius:50%;background:linear-gradient(135deg,#d8d2cf,#b7aeaa)}
      .nm{font:700 34px Inter;color:#111}.st{font:400 24px Inter;color:#8e8e8e;margin-top:4px}
      .ts{text-align:center;font:600 22px Inter;color:#a5a5a5;margin:30px 0 18px;letter-spacing:1px}
      .rs{display:flex;flex-direction:column;align-items:flex-end;padding:0 36px}
      .lb{font:400 22px Inter;color:#8e8e8e;margin-bottom:10px}
      .story{width:140px;height:200px;border-radius:22px;background:linear-gradient(160deg,#c9c1bc,#8f8580);margin-bottom:10px}
      .emo{font-size:64px;line-height:1;margin-bottom:24px}
      .bb{background:linear-gradient(135deg,#6C3BF5,#A03BD8);color:#fff;font:500 38px Inter;padding:24px 34px;border-radius:40px}
      .vs{font:500 24px Inter;color:#8e8e8e;margin-top:14px}
      .in{position:absolute;left:36px;right:36px;bottom:36px;height:92px;border:2px solid #ececec;border-radius:46px;display:flex;align-items:center;padding-left:40px;font:400 30px Inter;color:#a8a8a8}
      .h{color:#8a6b60}`,
    body: `<div class="t">O VISTO TAMBÉM<br>É UMA RESPOSTA.</div>
      <div class="ph"><div class="hd"><div class="bk">‹</div><div class="av"></div><div><div class="nm">ela</div><div class="st">Ativa há 2 h</div></div></div>
      <div class="ts">HOJE 23:39</div>
      <div class="rs"><div class="lb">Você respondeu ao story</div><div class="story"></div><div class="emo">🔥</div>
      <div class="bb">oi sumida</div><div class="vs">Visto às 23:41</div></div>
      <div class="in">Mensagem...</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-03-notas.png',
    css: `
      body{background:#fff;font-family:Inter,${EMO}}
      .bar{display:flex;justify-content:space-between;padding:70px 70px 0;font:600 34px Inter;color:#D9A400}
      .dt{text-align:center;font:500 24px Inter;color:#a1a1a1;margin-top:46px}
      .w{padding:40px 90px 0}
      .tt{font:800 64px/1.1 Inter;color:#111;margin-bottom:40px;letter-spacing:-1px}
      .li{font:400 46px/1 Inter,${EMO};color:#2a2a2a;padding:20px 0;border-bottom:1px solid #f0f0f0;display:flex;gap:26px;align-items:center}
      .li span{color:#c7c7c7}
      .hw{font:700 70px/1.05 Caveat;color:#D7263D;transform:rotate(-2.5deg);margin-top:50px}
      .ul{width:560px;height:14px;margin-top:6px}
      .h{color:#b3b3b3}`,
    body: `<div class="bar"><span>‹ Notas</span><span>OK</span></div>
      <div class="dt">9 de outubro de 2026 às 23:12</div>
      <div class="w"><div class="tt">Mensagens que ela<br>recebeu hoje:</div>
      <div class="li"><span>—</span>🔥</div>
      <div class="li"><span>—</span>oi linda</div>
      <div class="li"><span>—</span>bom dia princesa 🌹</div>
      <div class="li"><span>—</span>tá on?</div>
      <div class="li"><span>—</span>🔥🔥🔥</div>
      <div class="li"><span>—</span>oi sumida</div>
      <div class="hw">Ninguém perguntou do livro<br>que ela postou.
      <svg class="ul" viewBox="0 0 560 14"><path d="M4 9 C120 2, 260 13, 556 5" stroke="#D7263D" stroke-width="5" fill="none" stroke-linecap="round"/></svg></div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-04-elogio-escolha.png',
    css: `
      body{background:#fff}
      .t{padding:120px 100px 0;font:400 76px/1.08 'Archivo Black';color:#111;letter-spacing:-1px}
      .t em{font-style:normal;color:#2E9E5B}
      .c{margin:0 100px;padding:46px 50px;border-radius:10px}
      .c1{background:#FDECEC;border-left:16px solid #E5484D;margin-top:80px}
      .c2{background:#E8F6EE;border-left:16px solid #2E9E5B;margin-top:36px}
      .lb{font:800 28px Inter;letter-spacing:4px;margin-bottom:18px}
      .c1 .lb{color:#E5484D}.c2 .lb{color:#2E9E5B}
      .tx{font:600 58px/1.15 Inter;color:#1a1a1a}
      .c1 .tx{text-decoration:line-through;text-decoration-color:#E5484D;text-decoration-thickness:6px;color:#7a7a7a}
      .c2 .tx{font-weight:700;font-size:52px}
      .nt{margin:70px 100px 0;font:400 36px/1.4 Inter;color:#6b6b6b}.nt b{color:#111}
      .h{color:#9a9a9a}`,
    body: `<div class="t">Elogie o que ela<br><em>escolheu</em>, não só<br>o que ela é.</div>
      <div class="c c1"><div class="lb">✕ EM VEZ DE</div><div class="tx">“Você é linda.”</div></div>
      <div class="c c2"><div class="lb">✓ TENTE</div><div class="tx">“Você conta história no story melhor que muita série.”</div></div>
      <div class="nt">Elogio à aparência mostra que você olhou.<br>Elogio à escolha mostra que você <b>prestou atenção</b>.</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-05-enquete.png',
    css: `
      body{background:linear-gradient(90deg,#FF6B35 50%,#0F3D4C 50%)}
      .top{position:absolute;top:100px;left:0;right:0;text-align:center;color:#fff}
      .k{font:400 64px Bebas Neue;letter-spacing:8px;opacity:.9}
      .q{font:400 108px/1 Anton;margin-top:8px;letter-spacing:1px}
      .s{position:absolute;top:400px;width:540px;text-align:center;color:#fff}
      .s1{left:0}.s2{right:0}
      .n{font:400 440px/1 Anton}
      .lb{font:400 70px/1 Bebas Neue;letter-spacing:3px;margin-top:10px}
      .or{position:absolute;top:610px;left:470px;width:140px;height:140px;border-radius:50%;background:#fff;color:#111;font:400 64px/140px Anton;text-align:center;box-shadow:0 14px 40px rgba(0,0,0,.25)}
      .b{position:absolute;bottom:130px;left:0;right:0;text-align:center;font:700 36px Inter,${EMO};color:#fff;letter-spacing:2px}
      .h{color:rgba(255,255,255,.75)}`,
    body: `<div class="top"><div class="k">PRIMEIRA MENSAGEM</div><div class="q">QUAL VOCÊ MANDARIA?</div></div>
      <div class="s s1"><div class="n">1</div><div class="lb">UM ELOGIO</div></div>
      <div class="s s2"><div class="n">2</div><div class="lb">UMA PERGUNTA<br>SOBRE O STORY</div></div>
      <div class="or">OU</div>
      <div class="b">VOTE NOS COMENTÁRIOS 👇</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-06-perguntas.png',
    css: `
      body{background:#FAFAF7}
      .lb{position:absolute;top:110px;left:110px;font:400 28px 'Space Mono';color:#9b9b9b;letter-spacing:4px}
      .t{position:absolute;top:290px;left:110px;right:100px;font:700 108px/1.08 Fraunces;color:#141414;letter-spacing:0;word-spacing:6px;font-variation-settings:'opsz' 72}
      mark{background:linear-gradient(transparent 58%,#FFE14D 58%,#FFE14D 92%,transparent 92%);color:inherit;padding:0 6px}
      .s{position:absolute;bottom:200px;left:110px;font:italic 400 44px Fraunces;color:#8a8a8a}
      .h{color:#b0b0b0}`,
    body: `<div class="lb">NOTA Nº 06</div>
      <div class="t">Interesse se mostra em <mark>perguntas</mark>, não em emojis.</div>
      <div class="s">Emoji é reação. Pergunta é convite.</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-07-para-elas.png',
    css: `
      body{background:radial-gradient(circle at 50% 40%,#7A1A33,#4A0B1C 75%)}
      .f{position:absolute;inset:50px;border:2px solid #C9A227}
      .f2{position:absolute;inset:66px;border:1px solid rgba(201,162,39,.45)}
      .k{position:absolute;top:170px;left:0;right:0;text-align:center;font:600 28px Montserrat;color:#C9A227;letter-spacing:12px}
      .o{position:absolute;top:240px;left:0;right:0;text-align:center;font:400 46px 'Cormorant Garamond';color:#C9A227}
      .t{position:absolute;top:370px;left:130px;right:130px;text-align:center;font:italic 500 92px/1.14 'Cormorant Garamond';color:#F6E9D7}
      .b{position:absolute;bottom:200px;left:0;right:0;text-align:center;font:600 28px Montserrat;color:#C9A227;letter-spacing:6px}
      .h{color:rgba(201,162,39,.8);bottom:100px}`,
    body: `<div class="f"></div><div class="f2"></div>
      <div class="k">PARA ELAS</div><div class="o">✦</div>
      <div class="t">Qual foi a mensagem mais criativa que você já recebeu no direct?</div>
      <div class="b">CONTA NOS COMENTÁRIOS ↓</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-08-pesquisa.png',
    css: `
      body{background:#fff;font-family:Inter}
      .k{position:absolute;top:150px;left:0;right:0;text-align:center;font:500 36px Inter;color:#80868b}
      .sb{position:absolute;top:250px;left:100px;width:880px;border:2px solid #dfe1e5;border-radius:44px;box-shadow:0 6px 24px rgba(32,33,36,.12);overflow:hidden}
      .row{display:flex;align-items:center;gap:26px;padding:0 40px;height:110px}
      .q{font:400 42px Inter;color:#202124}
      .cur{display:inline-block;width:3px;height:48px;background:#202124;margin-left:4px;vertical-align:middle}
      .sg{height:90px;border-top:1px solid #eee}
      .sg span{font:400 34px Inter;color:#5f6368}.sg b{color:#202124;font-weight:700}
      .a1{position:absolute;top:820px;left:100px;right:100px;font:600 40px Inter;color:#80868b}
      .a2{position:absolute;top:890px;left:100px;right:100px;font:400 92px/1.06 'DM Serif Display';color:#111}
      .h{color:#b0b0b0}`,
    body: `<div class="k">a pesquisa que todo mundo faz:</div>
      <div class="sb"><div class="row">${SEARCH_ICON('#9AA0A6', 42)}<span class="q">como fazer ela me responder<span class="cur"></span></span></div>
      <div class="row sg">${SEARCH_ICON('#9AA0A6', 32)}<span>como fazer ela me responder <b>rápido</b></span></div>
      <div class="row sg">${SEARCH_ICON('#9AA0A6', 32)}<span>como fazer ela me responder <b>no direct</b></span></div>
      <div class="row sg">${SEARCH_ICON('#9AA0A6', 32)}<span>como fazer ela me responder <b>depois do visto</b></span></div></div>
      <div class="a1">Talvez a pergunta certa seja:</div>
      <div class="a2">O que eu mandei que mereça uma resposta?</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-09-notificacao.png',
    css: `
      body{background:linear-gradient(165deg,#22163F,#45276F 45%,#B4507A 100%);font-family:Inter,${EMO}}
      body:before{content:'';position:absolute;width:700px;height:700px;border-radius:50%;background:#7d3cff;filter:blur(160px);opacity:.35;top:-200px;right:-200px}
      .tm{position:absolute;top:60px;left:0;right:0;text-align:center;font:200 180px/1 Inter;color:#fff;letter-spacing:-4px}
      .dt{position:absolute;top:255px;left:0;right:0;text-align:center;font:500 36px Inter;color:rgba(255,255,255,.85)}
      .st{position:absolute;top:350px;left:90px;right:90px;display:flex;flex-direction:column;gap:16px}
      .n{background:rgba(255,255,255,.16);border-radius:32px;padding:22px 30px;color:#fff;opacity:.62}
      .ap{display:flex;align-items:center;gap:12px;font:600 20px Inter;letter-spacing:2px;color:rgba(255,255,255,.75);margin-bottom:8px}
      .ic{width:30px;height:30px;border-radius:8px;background:linear-gradient(135deg,#6C3BF5,#E1306C)}
      .ap i{margin-left:auto;font-style:normal;letter-spacing:0;font-weight:500}
      .m{font:500 32px Inter,${EMO}}.m b{font-weight:700}
      .hi{background:rgba(255,255,255,.96);opacity:1;color:#111;box-shadow:0 0 0 4px rgba(255,255,255,.35),0 20px 60px rgba(0,0,0,.35)}
      .hi .ap{color:#666}.hi .m{font-size:33px;line-height:1.3}
      .t{position:absolute;top:1100px;left:0;right:0;text-align:center;font:900 62px/1.08 Montserrat;color:#fff}
      .h{color:rgba(255,255,255,.7);bottom:40px}`,
    body: `<div class="tm">23:41</div><div class="dt">quinta-feira, 9 de outubro</div>
      <div class="st">
      <div class="n"><div class="ap"><span class="ic"></span>DIRECT<i>agora</i></div><div class="m"><b>perfil_2291:</b> 🔥</div></div>
      <div class="n"><div class="ap"><span class="ic"></span>DIRECT<i>2 min</i></div><div class="m"><b>rafa.o_:</b> oi linda</div></div>
      <div class="n"><div class="ap"><span class="ic"></span>DIRECT<i>5 min</i></div><div class="m"><b>user.884:</b> tá on?</div></div>
      <div class="n"><div class="ap"><span class="ic"></span>DIRECT<i>9 min</i></div><div class="m"><b>jp_m:</b> oi sumida</div></div>
      <div class="n hi"><div class="ap"><span class="ic"></span>DIRECT<i>12 min</i></div><div class="m"><b>theo.m:</b> Terminou aquele livro do story? Fiquei curioso com o final.</div></div>
      </div>
      <div class="t">Seja a notificação<br>que ela abre primeiro.</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-10-recibo.png',
    css: `
      body{background:#CFC8BC}
      body:after{content:'';position:absolute;inset:0;background:${NOISE(0.15)}}
      .r{position:absolute;top:90px;left:190px;width:700px;height:1130px;background:#FFFEFA;transform:rotate(-2deg);box-shadow:0 30px 70px rgba(60,50,40,.28);padding:70px 60px;font-family:'Courier Prime',${EMO};color:#222;
        -webkit-mask:conic-gradient(from -45deg at bottom,#0000,#000 1deg 89deg,#0000 90deg) bottom/36px 51% repeat-x,conic-gradient(from 135deg at top,#0000,#000 1deg 89deg,#0000 90deg) top/36px 51% repeat-x}
      .c{text-align:center}
      .s1{font:400 26px 'Courier Prime';letter-spacing:3px}
      .s2{font:700 54px 'Courier Prime';margin-top:14px}
      .s3{font:400 24px 'Courier Prime';color:#666;margin-top:10px}
      .d{border-top:3px dashed #999;margin:34px 0}
      .row{display:flex;justify-content:space-between;font:400 34px 'Courier Prime',${EMO};margin:20px 0}
      .row.g{font-weight:700}
      .tot{display:flex;justify-content:space-between;font:700 50px 'Courier Prime'}
      .pg{font:400 26px 'Courier Prime';color:#555;margin-top:18px;text-align:center}
      .bc{height:90px;margin:40px 30px 16px;background:repeating-linear-gradient(90deg,#222 0 4px,transparent 4px 7px,#222 7px 9px,transparent 9px 15px,#222 15px 20px,transparent 20px 23px)}
      .ft{font:italic 700 30px 'Courier Prime';text-align:center}
      .h{color:#6e665c}`,
    body: `<div class="r"><div class="c"><div class="s1">★ PROTOCOLO DA PRESENÇA ★</div><div class="s2">RECIBO DA CONVERSA</div><div class="s3">09/10 · 23:41 · caixa: direct</div></div>
      <div class="d"></div>
      <div class="row"><span>oi</span><span>0 assunto</span></div>
      <div class="row"><span>🔥</span><span>0 contexto</span></div>
      <div class="row"><span>oi linda</span><span>0 novidade</span></div>
      <div class="row"><span>tá on?</span><span>0 interesse</span></div>
      <div class="d"></div>
      <div class="row g"><span>pergunta sobre<br>o story dela</span><span>1 conversa</span></div>
      <div class="d"></div>
      <div class="tot"><span>TOTAL</span><span>ATENÇÃO</span></div>
      <div class="pg">pago com: 30 seg de curiosidade</div>
      <div class="bc"></div>
      <div class="ft">conversa boa custa atenção</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-11-jornal.png',
    css: `
      body{background:#F1EDE4}
      body:after{content:'';position:absolute;inset:0;background:${NOISE(0.12)}}
      .w{position:absolute;inset:80px 90px}
      .rl{border-top:6px solid #111;border-bottom:2px solid #111;height:14px}
      .mh{font:900 128px/1 'Playfair Display';text-align:center;letter-spacing:2px;margin:24px 0 18px;color:#111}
      .mt{border-top:2px solid #111;border-bottom:2px solid #111;padding:14px 0;text-align:center;font:600 22px Inter;letter-spacing:5px;color:#111}
      .hl{font:900 122px/0.98 'Playfair Display';color:#111;margin-top:64px;letter-spacing:-2px}
      .sh{font:italic 400 58px/1.1 'Playfair Display';color:#8B1E2D;margin-top:26px}
      .cols{column-count:2;column-gap:50px;font:400 29px/1.5 'Playfair Display';color:#2a2a2a;text-align:left;margin-top:56px;border-top:1px solid #111;padding-top:34px}
      .cols:first-letter{float:left;font:900 104px/0.8 'Playfair Display';margin:8px 12px 0 0;color:#111}
      .h{color:#7a7468;bottom:44px}`,
    body: `<div class="w"><div class="rl"></div><div class="mh">O PROTOCOLO</div>
      <div class="mt">EDIÇÃO Nº 11 · OUTUBRO DE 2026 · COMPORTAMENTO</div>
      <div class="hl">Insistir não é persistência.</div>
      <div class="sh">É não aceitar a resposta.</div>
      <div class="cols">Persistir é melhorar a abordagem a cada tentativa. Insistir é repetir a mesma mensagem esperando outro resultado. Um silêncio, um “não” ou uma resposta seca também são respostas, e respeitá-las é sinal de maturidade, não de fraqueza. Presença é saber a hora de continuar e, principalmente, a hora de parar.</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'simples', file: 'post-12-e-agora.png',
    css: `
      body{background:linear-gradient(145deg,#1430FF,#5B7BFF)}
      .qm{position:absolute;right:-60px;bottom:-200px;font:400 1250px/1 Anton;color:rgba(255,255,255,.11)}
      .t{position:absolute;top:220px;left:100px;font:900 132px/1 Montserrat;color:#fff;letter-spacing:-3px}
      .t span{color:#FFD84D;display:block;margin-top:14px}
      .s{position:absolute;top:740px;left:100px;right:160px;font:500 52px/1.3 Inter;color:rgba(255,255,255,.92)}
      .b{position:absolute;bottom:170px;left:100px;font:700 36px Inter,${EMO};color:#fff;background:rgba(0,0,0,.18);padding:22px 34px;border-radius:50px}
      .h{color:rgba(255,255,255,.7)}`,
    body: `<div class="qm">?</div>
      <div class="t">Ela respondeu.<span>E agora?</span></div>
      <div class="s">Você planeja o “oi” perfeito… mas sabe continuar a conversa?</div>
      <div class="b">Comenta: abrir ou continuar? 👇</div>
      <div class="h">${H}</div>`,
  },

  // ───────────────────────── 6 POSTS DARK ─────────────────────────
  {
    dir: 'dark', file: 'dark-01-silenciosa.png',
    css: `
      body{background:radial-gradient(circle at 50% 45%,#1a1a1a,#060606 75%)}
      body:after{content:'';position:absolute;inset:0;background:${NOISE(0.32)}}
      .w{position:absolute;inset:0;display:flex;flex-direction:column;align-items:center;justify-content:center;text-align:center}
      .a{font:700 118px/1.05 'Playfair Display';color:#F2F2F2}
      .ln{width:170px;height:2px;background:#3d3d3d;margin:70px 0}
      .b{font:italic 400 86px/1.08 'Playfair Display';color:#7D7D7D}
      .h{color:#555}`,
    body: `<div class="w"><div class="a">Presença é<br>silenciosa.</div><div class="ln"></div><div class="b">Insistência<br>faz barulho.</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-02-cantada.png',
    css: `
      body{background:#2A2C2E}
      .bg{position:absolute;top:-40px;left:-60px;right:-60px;font:400 300px/0.9 'Bebas Neue';color:transparent;-webkit-text-stroke:2px #44474B;white-space:nowrap}
      .bg div:nth-child(even){margin-left:-260px}
      .cd{position:absolute;top:390px;left:90px;right:90px;background:#1B1C1E;padding:80px 70px;border:1px solid #3a3d41}
      .t{font:400 88px/1.1 'Archivo Black';color:#F0F0F0;letter-spacing:-1px}
      .t span{color:#8F9296}
      .h{color:#7a7d81}`,
    body: `<div class="bg"><div>CANTADA CANTADA</div><div>CANTADA CANTADA</div><div>CANTADA CANTADA</div><div>CANTADA CANTADA</div><div>CANTADA CANTADA</div></div>
      <div class="cd"><div class="t">Quem presta<br>atenção <span>não<br>precisa de</span><br>cantada.</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-03-terminal.png',
    css: `
      body{background:#111213}
      .win{position:absolute;top:140px;left:80px;right:80px;background:#1B1D1F;border:1px solid #2C2F33;border-radius:24px;overflow:hidden;box-shadow:0 30px 80px rgba(0,0,0,.6)}
      .tb{height:70px;background:#232528;display:flex;align-items:center;gap:14px;padding:0 28px;position:relative}
      .dot{width:20px;height:20px;border-radius:50%;background:#45484D}
      .tl{position:absolute;left:0;right:0;text-align:center;font:400 24px 'Space Mono';color:#7d8288}
      .bd{padding:44px 44px 54px;font:400 32px/1.75 'Space Mono';color:#E6E6E6}
      .p{color:#7d8288}.c{color:#5d6166}.e{color:#fff;font-weight:700;background:#33363a;padding:2px 10px}
      .cur{display:inline-block;width:18px;height:36px;background:#E6E6E6;vertical-align:middle}
      .t{position:absolute;top:985px;left:80px;right:80px;font:700 70px/1.15 'Space Mono';color:#EDEDED}
      .h{color:#5d6166}`,
    body: `<div class="win"><div class="tb"><span class="dot"></span><span class="dot"></span><span class="dot"></span><span class="tl">direct.sh</span></div>
      <div class="bd"><span class="p">$</span> enviar --msg "oi sumida"<br>
      <span class="p">›</span> analisando mensagem...<br>
      <span class="p">›</span> contexto: não encontrado<br>
      <span class="p">›</span> assunto: não encontrado<br>
      <span class="e">✕ ERRO: mensagem genérica</span><br>
      <span class="c"># dica: comente algo que ela postou</span><br>
      <span class="p">$</span> <span class="cur"></span></div></div>
      <div class="t">Mensagem genérica<br>não compila.</div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-04-pensar.png',
    css: `
      body{background:radial-gradient(circle at 25% 20%,#6A6A6A,#393939 55%,#222 100%)}
      body:after{content:'';position:absolute;inset:0;background:${NOISE(0.28)}}
      .w{position:absolute;left:110px;right:110px;top:0;bottom:0;display:flex;flex-direction:column;justify-content:center}
      .a{font:900 116px/1.06 Fraunces;word-spacing:8px;font-variation-settings:'opsz' 72;background:linear-gradient(180deg,#FFFFFF 10%,#9C9C9C 95%);-webkit-background-clip:text;color:transparent;letter-spacing:0}
      .b{font:italic 300 66px/1.15 Fraunces;color:#C4C4C4;margin-top:50px}
      .h{color:#9a9a9a}`,
    body: `<div class="w"><div class="a">Ela lembra de quem a fez pensar.</div><div class="b">Não de quem<br>só a elogiou.</div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-05-tres-regras.png',
    css: `
      body{background-color:#0F0F0F;background-image:linear-gradient(#1C1C1C 1px,transparent 1px),linear-gradient(90deg,#1C1C1C 1px,transparent 1px);background-size:60px 60px}
      .w{position:absolute;inset:110px 100px}
      .t{font:700 100px/1 Oswald;color:#EDEDED;letter-spacing:3px}
      .s{font:300 34px Oswald;color:#7a7a7a;letter-spacing:4px;margin-top:16px}
      .r{display:flex;align-items:center;gap:44px;padding:44px 0;border-bottom:1px solid #2b2b2b}
      .r:first-of-type{margin-top:60px;border-top:1px solid #2b2b2b}
      .n{font:700 150px/1 Oswald;color:transparent;-webkit-text-stroke:2px #5a5a5a;width:200px}
      .k{font:500 62px/1 Oswald;color:#F2F2F2;letter-spacing:2px}
      .d{font:400 34px/1.3 Inter;color:#9a9a9a;margin-top:12px}
      .h{color:#555}`,
    body: `<div class="w"><div class="t">3 REGRAS DO DIRECT</div><div class="s">ANTES DE APERTAR ENVIAR</div>
      <div class="r"><div class="n">01</div><div><div class="k">CONTEXTO</div><div class="d">Fale de algo que ela postou.</div></div></div>
      <div class="r"><div class="n">02</div><div><div class="k">PERGUNTA</div><div class="d">Dê algo pra ela responder.</div></div></div>
      <div class="r"><div class="n">03</div><div><div class="k">LEVEZA</div><div class="d">Sem cobrança, sem pressa.</div></div></div></div>
      <div class="h">${H}</div>`,
  },
  {
    dir: 'dark', file: 'dark-06-conversar-ou-notado.png',
    css: `
      body{background:linear-gradient(118deg,#161616 50%,#383838 50%)}
      .k{position:absolute;top:150px;left:0;right:0;text-align:center;font:600 48px Montserrat;color:#CFCFCF}
      .a{position:absolute;top:400px;left:80px;font:900 108px/1 Montserrat;color:#F5F5F5;letter-spacing:-2px}
      .or{position:absolute;top:615px;left:460px;width:160px;height:160px;border-radius:50%;background:#F5F5F5;color:#161616;font:900 54px/160px Montserrat;text-align:center}
      .b{position:absolute;top:880px;right:80px;font:900 108px/1 Montserrat;color:#F5F5F5;letter-spacing:-2px;text-align:right}
      .f{position:absolute;bottom:170px;left:0;right:0;text-align:center;font:600 34px Inter,${EMO};color:#BDBDBD}
      .h{color:#8a8a8a}`,
    body: `<div class="k">Você manda mensagem para…</div>
      <div class="a">CONVERSAR</div><div class="or">OU</div><div class="b">SER<br>NOTADO?</div>
      <div class="f">Responde com sinceridade 👇</div>
      <div class="h">${H}</div>`,
  },
];
