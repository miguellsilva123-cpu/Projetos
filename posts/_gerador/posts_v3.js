// Série nova: formatos diferentes (conversa anotada, fluxograma, tarô, tweet, guia, antes/depois, cartão de embarque)
const NOISE = (op = 0.5) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';
const G = '#C9A227';
const GRAIN = (op) => `body:after{content:'';position:absolute;inset:0;background:${NOISE(op)};pointer-events:none;z-index:9}`;

const flame = `<svg viewBox="0 0 64 64" width="120" height="120" fill="none" stroke="${G}" stroke-width="2.5" stroke-linejoin="round"><path d="M32 6c4 10 14 16 14 30a14 14 0 0 1-28 0c0-8 4-12 7-16 1 6 4 8 6 8-2-8 0-16 1-22z"/><path d="M32 46a6 6 0 0 1-6-6c0-4 3-6 4-9 2 4 8 6 8 9a6 6 0 0 1-6 6z"/></svg>`;
const loop = `<svg viewBox="0 0 64 64" width="120" height="120" fill="none" stroke="${G}" stroke-width="2.5" stroke-linecap="round"><path d="M14 30a18 18 0 0 1 32-11"/><path d="M46 9v10H36"/><path d="M50 34a18 18 0 0 1-32 11"/><path d="M18 55V45h10"/></svg>`;
const star = `<svg viewBox="0 0 64 64" width="130" height="130" fill="none" stroke="#111" stroke-width="2.5" stroke-linejoin="round"><path d="M32 4l5 19 19-5-14 14 14 14-19-5-5 19-5-19-19 5 14-14L8 18l19 5z"/><circle cx="32" cy="32" r="5"/></svg>`;

module.exports = [
  // N1 · Anatomia de uma conversa
  {
    dir: 'serie-nova', file: 'n01-anatomia-da-conversa.png',
    css: `
      body{background:#0F0F10;font-family:Inter,${EMO}}${GRAIN(0.15)}
      .k{position:absolute;top:80px;left:80px;font:500 30px Oswald;letter-spacing:6px;color:${G}}
      .t{position:absolute;top:126px;left:80px;font:700 84px/1 Oswald;color:#F2F2F2;letter-spacing:1px}
      .ctx{position:absolute;top:330px;left:80px;right:80px;display:flex;align-items:center;gap:20px;font:500 30px Inter,${EMO};color:#9a9a9a}
      .th{width:54px;height:80px;border-radius:10px;background:linear-gradient(160deg,#5b4a3a,#2a221b);border:2px solid ${G}}
      .c{position:absolute;top:450px;left:80px;right:80px;display:flex;flex-direction:column;gap:22px}
      .m{max-width:700px;font:500 38px/1.25 Inter,${EMO};padding:26px 34px;border-radius:40px;position:relative}
      .me{align-self:flex-end;background:#2E2E30;color:#F4F4F4;border-bottom-right-radius:10px}
      .her{align-self:flex-start;background:#F2EEE6;color:#151515;border-bottom-left-radius:10px}
      .b{position:absolute;top:-16px;width:52px;height:52px;border-radius:50%;background:${G};color:#111;font:800 28px/52px Inter;text-align:center;box-shadow:0 0 0 6px #0F0F10}
      .me .b{left:-26px}.her .b{right:-26px}
      .lg{position:absolute;top:1075px;left:80px;right:80px;display:flex;flex-direction:column;gap:16px}
      .li{display:flex;gap:20px;align-items:flex-start;font:500 31px/1.3 Inter;color:#CFCFCF}
      .li span{flex:none;width:44px;height:44px;border-radius:50%;background:${G};color:#111;font:800 24px/44px Inter;text-align:center}
      .li b{color:#fff}
      .h{color:#555;bottom:36px}`,
    body: `<div class="k">ESTUDO DE CASO</div><div class="t">ANATOMIA DE UMA<br>CONVERSA QUE FLUI</div>
      <div class="ctx"><div class="th"></div>Ela postou um story numa livraria 📚</div>
      <div class="c">
        <div class="m me"><span class="b">1</span>Saiu de lá com quantos livros? Seja sincera 😂</div>
        <div class="m her">kkkk 3. e nem terminei os outros</div>
        <div class="m me"><span class="b">2</span>Clássico. Qual deles fura a fila?</div>
        <div class="m her"><span class="b">3</span>um de suspense que todo mundo tá falando. você lê?</div>
      </div>
      <div class="lg">
        <div class="li"><span>1</span><div><b>Contexto:</b> ele comentou o que ela postou.</div></div>
        <div class="li"><span>2</span><div><b>Humor + pergunta fácil:</b> ela responde sem esforço.</div></div>
        <div class="li"><span>3</span><div><b>Ela devolveu a pergunta:</b> agora é conversa de verdade.</div></div>
      </div>
      <div class="h">${H}</div>`,
  },

  // N2 · Fluxograma
  {
    dir: 'serie-nova', file: 'n02-fluxograma-resposta-seca.png',
    css: `
      body{background-color:#141414;background-image:linear-gradient(#1d1d1d 1px,transparent 1px),linear-gradient(90deg,#1d1d1d 1px,transparent 1px);background-size:54px 54px;font-family:Inter}
      .t{position:absolute;top:80px;left:0;right:0;text-align:center;font:700 92px/1 Oswald;color:#F2F2F2;letter-spacing:1px}
      .t span{color:${G}}
      .s{position:absolute;top:190px;left:0;right:0;text-align:center;font:400 32px Inter;color:#8d8d8d}
      .n{position:absolute;left:50%;transform:translateX(-50%);text-align:center;font:600 38px/1.25 Inter;color:#F2F2F2;padding:28px 40px;border:3px solid #3b3b3b;background:#1b1b1b;border-radius:22px}
      .n1{top:285px;border-radius:60px;border-color:${G};color:${G}}
      .n2{top:440px;width:760px}
      .d{position:absolute;top:690px;left:50%;width:280px;height:280px;margin-left:-140px;transform:rotate(45deg);border:3px solid ${G};background:#1b1b1b}
      .dt{position:absolute;top:778px;left:50%;width:250px;margin-left:-125px;text-align:center;font:600 28px/1.25 Inter;color:#F2F2F2}
      .y,.no{position:absolute;top:1065px;width:400px;padding:30px 30px;border-radius:22px;font:600 34px/1.28 Inter;text-align:center}
      .y{left:70px;background:${G};color:#111}
      .no{right:70px;border:3px solid #3b3b3b;background:#1b1b1b;color:#E8E8E8}
      .lb{position:absolute;top:860px;font:800 34px Oswald;letter-spacing:3px}
      .ly{left:185px;color:${G}}.ln{right:200px;color:#9a9a9a}
      svg.ar{position:absolute;left:0;top:0}
      .h{color:#5a5a5a;bottom:36px}`,
    body: `<div class="t">ELA RESPONDEU <span>SECO.</span></div><div class="s">e agora? siga o mapa</div>
      <svg class="ar" width="1080" height="1350"><defs><marker id="a" markerWidth="12" markerHeight="12" refX="6" refY="6" orient="auto"><path d="M0,0 L12,6 L0,12 z" fill="${G}"/></marker></defs>
        <g stroke="${G}" stroke-width="4" fill="none" marker-end="url(#a)">
          <line x1="540" y1="388" x2="540" y2="428"/>
          <line x1="540" y1="595" x2="540" y2="625"/>
          <path d="M342 830 H270 V1050"/>
          <path d="M738 830 H810 V1050"/>
        </g></svg>
      <div class="n n1">“kkk sim”</div>
      <div class="n n2">Mande <b style="color:${G}">UMA</b> pergunta leve sobre o que ela acabou de dizer</div>
      <div class="d"></div><div class="dt">Ela respondeu com detalhe ou outra pergunta?</div>
      <div class="lb ly">SIM</div><div class="lb ln">NÃO</div>
      <div class="y">Conversa viva. Siga o ritmo dela.</div>
      <div class="no">Dê espaço. Sem “oi??”, sem cobrança.</div>
      <div class="h">${H}</div>`,
  },

  // N3 · Tarô do direct
  {
    dir: 'serie-nova', file: 'n03-taro-do-direct.png',
    css: `
      body{background:radial-gradient(circle at 50% 55%,#2a2216,#0c0b09 70%)}${GRAIN(0.25)}
      .k{position:absolute;top:100px;left:0;right:0;text-align:center;font:500 30px Montserrat;letter-spacing:14px;color:${G}}
      .t{position:absolute;top:150px;left:0;right:0;text-align:center;font:700 112px/1 'Cormorant Garamond';color:#F3E7C9;letter-spacing:4px}
      .cards{position:absolute;top:400px;left:0;right:0;height:600px}
      .cd{position:absolute;top:0;width:310px;height:540px;border-radius:18px;background:#14120e;border:2px solid ${G};padding:16px;box-shadow:0 30px 60px rgba(0,0,0,.6)}
      .in{position:absolute;inset:14px;border:1px solid rgba(201,162,39,.5);border-radius:10px;display:flex;flex-direction:column;align-items:center;justify-content:space-between;padding:30px 16px}
      .rn{font:700 46px 'Cormorant Garamond';color:${G}}
      .nm{font:700 40px/1 'Cormorant Garamond';color:#F3E7C9;letter-spacing:2px;text-align:center}
      .ds{font:italic 500 33px/1.2 'Cormorant Garamond';color:#bfae86;text-align:center;margin-top:10px}
      .c1{left:70px;transform:rotate(-8deg);top:40px}
      .c2{left:385px;top:0;z-index:2}
      .c3{right:70px;transform:rotate(8deg);top:40px;background:${G};border-color:#F3E7C9;box-shadow:0 0 80px rgba(201,162,39,.45),0 30px 60px rgba(0,0,0,.6)}
      .c3 .in{border-color:rgba(17,17,17,.4)}.c3 .rn,.c3 .nm{color:#111}.c3 .ds{color:#3a2f12}
      .q{position:absolute;top:1050px;left:0;right:0;text-align:center;font:italic 500 56px 'Cormorant Garamond';color:#F3E7C9}
      .b{position:absolute;top:1135px;left:0;right:0;text-align:center;font:600 28px Montserrat;letter-spacing:6px;color:${G}}
      .h{color:#7a6a45;bottom:40px}`,
    body: `<div class="k">ORÁCULO</div><div class="t">O Tarô do Direct</div>
      <div class="cards">
        <div class="cd c1"><div class="in"><div class="rn">I</div>${flame}<div><div class="nm">O FOGUINHO</div><div class="ds">reage, mas não conversa</div></div></div></div>
        <div class="cd c2"><div class="in"><div class="rn">II</div>${loop}<div><div class="nm">O INSISTENTE</div><div class="ds">não aceita o silêncio</div></div></div></div>
        <div class="cd c3"><div class="in"><div class="rn">III</div>${star}<div><div class="nm">O PRESENTE</div><div class="ds">lembra, pergunta e escuta</div></div></div></div>
      </div>
      <div class="q">Qual carta você tem sido?</div>
      <div class="b">COMENTA: I, II OU III</div>
      <div class="h">${H}</div>`,
  },

  // N4 · Post estilo tweet
  {
    dir: 'serie-nova', file: 'n04-tweet-segunda-mensagem.png',
    css: `
      body{background:#000;font-family:Inter,${EMO}}
      .w{position:absolute;top:0;bottom:0;left:90px;right:90px;display:flex;flex-direction:column;justify-content:center}
      .hd{display:flex;align-items:center;gap:24px}
      .av{width:104px;height:104px;border-radius:50%;background:#141414;border:2px solid ${G};display:flex;align-items:center;justify-content:center;font:700 54px 'Cormorant Garamond';color:${G}}
      .nm{font:800 40px Inter;color:#E7E9EA}.hn{font:400 34px Inter;color:#71767B;margin-top:4px}
      .tx{font:400 70px/1.28 Inter,${EMO};color:#E7E9EA;margin-top:50px}
      .tx b{font-weight:400;color:${G}}
      .mt{font:400 32px Inter;color:#71767B;margin-top:50px;padding-bottom:34px;border-bottom:1px solid #2F3336}
      .ic{display:flex;justify-content:space-between;padding:30px 20px 0}
      .ic svg{width:44px;height:44px}
      .h{display:none}`,
    body: `<div class="w"><div class="hd"><div class="av">P</div><div><div class="nm">Protocolo da Presença</div><div class="hn">${H}</div></div></div>
      <div class="tx">o cara passa 3 dias pensando no “oi” perfeito<br><br>e <b>0 segundos</b> pensando na segunda mensagem</div>
      <div class="mt">23:41 · 9 de out de 2026</div>
      <div class="ic">
        <svg viewBox="0 0 24 24" fill="none" stroke="#71767B" stroke-width="1.8"><path d="M4 5h16v11H9l-5 4z"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="#71767B" stroke-width="1.8" stroke-linecap="round"><path d="M7 4L3 8l4 4"/><path d="M3 8h13a4 4 0 0 1 4 4v1"/><path d="M17 20l4-4-4-4"/><path d="M21 16H8a4 4 0 0 1-4-4v-1"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="#71767B" stroke-width="1.8"><path d="M12 20s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 10c0 5.5-7 10-7 10z"/></svg>
        <svg viewBox="0 0 24 24" fill="none" stroke="#71767B" stroke-width="1.8"><path d="M6 3h12v18l-6-4-6 4z"/></svg>
      </div></div>`,
  },

  // N5 · Guia "copie a ideia"
  {
    dir: 'serie-nova', file: 'n05-tres-stories-tres-aberturas.png',
    css: `
      body{background:#EDE7DC;font-family:Inter,${EMO}}${GRAIN(0.12)}
      .t{position:absolute;top:100px;left:90px;right:90px;font:400 108px/1 'DM Serif Display';color:#141414}
      .s{position:absolute;top:340px;left:90px;font:italic 400 44px 'DM Serif Display';color:#8B1E2D}
      .r{position:absolute;left:90px;right:90px;padding:34px 40px;background:#141414;border-radius:26px;color:#F2EEE6}
      .r1{top:450px}.r2{top:705px}.r3{top:960px}
      .ch{display:inline-flex;align-items:center;gap:12px;font:700 24px Inter,${EMO};letter-spacing:4px;color:#111;background:${G};padding:10px 20px;border-radius:30px}
      .m{font:500 42px/1.25 Inter,${EMO};margin-top:20px}
      .h{color:#8a8071;bottom:44px}`,
    body: `<div class="t">3 stories,<br>3 aberturas.</div><div class="s">Copie a ideia, não a frase.</div>
      <div class="r r1"><span class="ch">🏋️ STORY DE TREINO</span><div class="m">“Treino de perna hoje ou você é do time que ‘esquece’?”</div></div>
      <div class="r r2"><span class="ch">✈️ STORY DE VIAGEM</span><div class="m">“Esse lugar é real? Me conta o melhor e o pior de lá.”</div></div>
      <div class="r r3"><span class="ch">🍝 STORY DE COMIDA</span><div class="m">“Nota de 0 a 10. Sem ser educada 😂”</div></div>
      <div class="h">${H}</div>`,
  },

  // N6 · Antes e depois em duas telas
  {
    dir: 'serie-nova', file: 'n06-conversa-que-morre-x-que-flui.png',
    css: `
      body{background:#111;font-family:Inter,${EMO}}${GRAIN(0.15)}
      .t{position:absolute;top:80px;left:0;right:0;text-align:center;font:900 70px/1.05 Montserrat;color:#F2F2F2;letter-spacing:-1px}
      .ph{position:absolute;top:290px;width:470px;height:880px;border-radius:48px;background:#1C1C1E;border:2px solid #2c2c2e;padding:30px 24px;display:flex;flex-direction:column;gap:16px}
      .p1{left:50px}.p2{right:50px;border-color:${G}}
      .lb{font:800 30px Oswald;letter-spacing:4px;text-align:center;padding:10px 0 16px;border-bottom:1px solid #2c2c2e;margin-bottom:6px}
      .p1 .lb{color:#E5484D}.p2 .lb{color:${G}}
      .m{max-width:400px;font:500 33px/1.28 Inter,${EMO};padding:18px 24px;border-radius:30px}
      .me{align-self:flex-end;background:#3A3A3C;color:#fff;border-bottom-right-radius:8px}
      .her{align-self:flex-start;background:#E9E5DD;color:#151515;border-bottom-left-radius:8px}
      .vs{align-self:flex-end;font:500 22px Inter;color:#8e8e93;margin-top:-6px}
      .p1 .m{opacity:.9}
      .f{position:absolute;top:1210px;left:0;right:0;text-align:center;font:600 34px Inter;color:#BDBDBD}
      .f b{color:${G}}
      .h{color:#555;bottom:36px}`,
    body: `<div class="t">MESMA MULHER.<br>CONVERSAS DIFERENTES.</div>
      <div class="ph p1"><div class="lb">✕ MORRE</div>
        <div class="m me">oi linda</div><div class="m her">oi</div>
        <div class="m me">tudo bem?</div><div class="m her">tudo</div>
        <div class="m me">e aí?</div><div class="vs">Visto</div></div>
      <div class="ph p2"><div class="lb">✓ FLUI</div>
        <div class="m me">Esse show do seu story foi onde? Parecia insano</div>
        <div class="m her">foi no ibira!! muito bom 😭</div>
        <div class="m me">Inveja. Qual música fez valer o ingresso?</div>
        <div class="m her">a última, chorei kkkk e você, curte?</div></div>
      <div class="f">A diferença não é sorte. <b>É contexto.</b></div>
      <div class="h">${H}</div>`,
  },

  // N7 · Cartão de embarque
  {
    dir: 'serie-nova', file: 'n07-cartao-de-embarque.png',
    css: `
      body{background:#1A1A1A;font-family:Inter,${EMO}}${GRAIN(0.18)}
      .t{position:absolute;top:90px;left:0;right:0;text-align:center;font:700 40px Oswald;letter-spacing:10px;color:#8d8d8d}
      .bp{position:absolute;top:170px;left:90px;right:90px;height:1060px;background:#F4F0E8;border-radius:30px;overflow:hidden;color:#141414;box-shadow:0 40px 90px rgba(0,0,0,.55)}
      .top{background:#141414;color:${G};padding:34px 50px;display:flex;justify-content:space-between;align-items:center;font:700 32px Oswald;letter-spacing:5px}
      .rt{display:flex;justify-content:space-between;align-items:center;padding:46px 50px 20px}
      .cd{font:700 100px/1 Oswald;letter-spacing:2px}.cn{font:500 24px Inter;color:#6b6b6b;letter-spacing:3px;margin-top:6px}
      .pl{font-size:56px}
      .gr{display:grid;grid-template-columns:1fr 1fr;gap:28px 40px;padding:24px 50px 34px;border-bottom:4px dashed #c9c1b2}
      .f .l{font:600 22px Inter;letter-spacing:3px;color:#8a8478}.f .v{font:700 36px/1.2 Inter,${EMO};margin-top:6px}
      .no{padding:30px 50px}
      .no .l{font:700 24px Inter;letter-spacing:3px;color:#B42318}
      .no .v{font:600 34px/1.45 Inter,${EMO};color:#3b3b3b;margin-top:10px}
      .bc{position:absolute;bottom:40px;left:50px;right:50px;height:80px;background:repeating-linear-gradient(90deg,#141414 0 4px,transparent 4px 8px,#141414 8px 10px,transparent 10px 16px,#141414 16px 22px,transparent 22px 25px)}
      .h{color:#5a5a5a;bottom:44px}`,
    body: `<div class="t">CARTÃO DE EMBARQUE</div>
      <div class="bp"><div class="top"><span>PROTOCOLO AIRLINES</span><span>VOO PP-001</span></div>
        <div class="rt"><div><div class="cd">DIR</div><div class="cn">DIRECT</div></div><div class="pl">✈️</div><div style="text-align:right"><div class="cd">CNV</div><div class="cn">CONVERSA</div></div></div>
        <div class="gr">
          <div class="f"><div class="l">PASSAGEIRO</div><div class="v">Você</div></div>
          <div class="f"><div class="l">PORTÃO</div><div class="v">O story dela</div></div>
          <div class="f"><div class="l">BAGAGEM</div><div class="v">Contexto ✓<br>Pergunta ✓<br>Leveza ✓</div></div>
          <div class="f"><div class="l">EMBARQUE</div><div class="v">Horário decente<br>(não 3h da manhã)</div></div>
        </div>
        <div class="no"><div class="l">⛔ PROIBIDO A BORDO</div><div class="v">🔥 sozinho · “oi sumida” · “tá on?”<br>cobrança · 5 mensagens seguidas</div></div>
        <div class="bc"></div></div>
      <div class="h">${H}</div>`,
  },
];
