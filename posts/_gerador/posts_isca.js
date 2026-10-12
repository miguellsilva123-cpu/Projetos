// Isca grátis "10 aberturas para o direct": 8 páginas 1080x1350 (mandar como fotos no direct ou como PDF)
// Uso: POSTS=./posts_isca node render.js ../../produto
const NOISE = (op) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';
const G = '#C9A23F';
const CREAM = '#F0E5D8';
const TOTAL = 8;
const DIR = 'isca-10-aberturas';

const base = `
  body{background:radial-gradient(ellipse at 80% 15%,#2a1e10 0%,#120d08 45%,#070605 100%);font-family:Inter,${EMO}}
  body:after{content:'';position:absolute;inset:0;background:${NOISE(0.22)};pointer-events:none;z-index:9}
  .pg{position:absolute;top:64px;right:80px;font:500 24px Inter;color:#8a7a5c;letter-spacing:3px}
  .k{position:absolute;top:64px;left:80px;font:600 24px Montserrat;color:${G};letter-spacing:7px}
  .h{color:#6f6450;bottom:44px}
`;
const pg = (n) => `<div class="pg">${n}/${TOTAL}</div>`;

const blockCss = `
  .col{position:absolute;top:140px;left:80px;right:80px;bottom:110px;display:flex;flex-direction:column;justify-content:space-between}
  .b{display:flex;flex-direction:column;gap:16px}
  .hd{display:flex;align-items:baseline;gap:22px}
  .num{font:400 76px/0.9 'Playfair Display';color:${G}}
  .sit{font:700 23px Montserrat;color:#b8a57c;letter-spacing:4px}
  .me{align-self:flex-start;max-width:900px;background:${G};color:#16110a;font:600 33px/1.3 Inter,${EMO};
      padding:22px 32px;border-radius:34px;border-bottom-left-radius:8px}
  .why{font:400 29px/1.32 'Playfair Display';color:#d9cdb9;border-left:4px solid ${G};padding:2px 0 2px 24px}
  .why b,.nx b{font:700 19px Inter;letter-spacing:4px;color:${G};display:block;margin-bottom:6px}
  .nx{font:500 28px/1.32 Inter,${EMO};color:${CREAM};opacity:.9;padding-left:28px}
  .nx b{color:#8a7a5c}
  .sep{height:2px;background:linear-gradient(90deg,transparent,#3a2f20,transparent)}
`;

const A = [
  ['STORY DE SÉRIE OU FILME', 'Só mais um episódio à 1h da manhã? Qual série tá te sequestrando? 😅',
    'Mostra que você reparou num detalhe (o horário). E a pergunta se responde em 2 segundos.',
    '“Tô atrás de uma pra viciar. Vale começar ou piora na 2ª temporada?”'],
  ['STORY DE COMIDA', 'Isso tem cara de que valeu cada centavo. Foi tão bom quanto parece ou foi mais foto que sabor?',
    'Brincadeira leve + pede a opinião dela. Ela vira a especialista.',
    '“Anotado. Qual prato você pediria lá de olhos fechados?”'],
  ['STORY DE VIAGEM OU LUGAR', 'Esse lugar parece papel de parede. Foi tão bom quanto a foto ou teve perrengue que não entrou no story?',
    'Convida a contar uma história, não a responder “sim”.',
    '“Perrengue de viagem vira a melhor história depois. Qual foi o pior que você já passou?”'],
  ['STORY DE TREINO', 'Você é do time que treina às 6h ou do time que encara a academia lotada às 19h?',
    'Pergunta de “time” é fácil de responder e já gera identificação.',
    'Diga o seu time e conte algo seu: “Sou do time das 19h. Já desisti de esperar o supino vagar 😂”'],
  ['STORY COM MÚSICA', 'Essa música no seu story me fez ouvir de novo. Sua playlist é toda desse nível ou essa foi sorte?',
    'Elogia o gosto dela, não a aparência. Quase ninguém faz isso.',
    '“Então me manda uma que você aposta que eu não conheço.”'],
  ['STORY DE LIVRO', 'Que livro é esse? Preciso de uma indicação que não seja o algoritmo escolhendo por mim.',
    'É um pedido sincero. Ela tem algo a te ensinar, e isso é bom de responder.',
    '“Sem spoiler: tá valendo ou é daqueles que você termina por teimosia?”'],
  ['STORY COM PET', 'Preciso saber o nome dele. E se ele manda na casa ou só finge que obedece.',
    'Pet é o assunto mais fácil do mundo. Humor sem esforço.',
    '“Qual foi a maior arte que ele já aprontou?”'],
  ['STORY DE TRABALHO OU ESTUDO', 'Isso tem cara de prazo apertado. Tá sobrevivendo ou já passou da fase do café pra fase do desespero?',
    'Mostra empatia com o momento dela, sem deixar o clima pesado.',
    '“Força! Agora fiquei curioso: o que você tá estudando?”'],
  ['DEBATE RÁPIDO (QUANDO NÃO TEM STORY)', 'Preciso de uma opinião imparcial: pizza de abacaxi é crime ou é preconceito?',
    'Polêmica boba gera resposta com personalidade e abre espaço pra brincadeira.',
    'Defenda seu lado com humor e devolva: “E qual é a SUA opinião polêmica?”'],
  ['SINCERIDADE DIRETA', 'Não vou fingir que vim comentar o story: achei você interessante e quis puxar assunto. Como tá sendo seu dia?',
    'Sinceridade é rara. É direto, sem cantada e sem pressão.',
    'Escute de verdade e pergunte sobre o que ela contou. Presença é isso.'],
];

const block = (i) => {
  const [sit, msg, why, nx] = A[i];
  const n = String(i + 1).padStart(2, '0');
  return `<div class="b"><div class="hd"><div class="num">${n}</div><div class="sit">${sit}</div></div>
    <div class="me">${msg}</div>
    <div class="why"><b>POR QUE FUNCIONA</b>${why}</div>
    <div class="nx"><b>SE ELA RESPONDER</b>${nx}</div></div>`;
};

const dupla = (p, i) => ({
  dir: DIR, file: `pagina-0${p}.png`,
  css: base + blockCss,
  body: `<div class="k">ABERTURAS ${String(i + 1).padStart(2, '0')} E ${String(i + 2).padStart(2, '0')}</div>${pg(p)}
    <div class="col">${block(i)}<div class="sep"></div>${block(i + 1)}</div><div class="h">${H}</div>`,
});

module.exports = [
  {
    dir: DIR, file: 'pagina-01.png',
    css: base + `
      .w{position:absolute;top:380px;left:80px;right:80px}
      .tag{display:inline-block;font:800 26px Montserrat;letter-spacing:8px;color:#16110a;background:${G};padding:14px 26px;border-radius:12px}
      .t{font:400 128px/1.0 'Playfair Display';color:${CREAM};margin-top:56px}
      .t i{color:${G}}
      .s{font:400 44px/1.3 'Playfair Display';color:#d9cdb9;margin-top:48px;max-width:860px}
      .ln{width:120px;height:4px;background:${G};margin-top:60px}
      .f{font:500 28px Inter;color:#8a7a5c;margin-top:30px;letter-spacing:2px}`,
    body: `<div class="w"><div class="tag">GUIA GRÁTIS</div>
      <div class="t">10 aberturas<br><i>para o direct</i></div>
      <div class="s">que dão a ela vontade de responder. Sem cantada pronta.</div>
      <div class="ln"></div><div class="f">O PROTOCOLO DA PRESENÇA</div></div><div class="h">${H}</div>`,
  },
  {
    dir: DIR, file: 'pagina-02.png',
    css: base + `
      .w{position:absolute;top:150px;left:80px;right:80px}
      .t{font:400 84px/1.05 'Playfair Display';color:${CREAM}}
      .t i{color:${G}}
      .rg{margin-top:70px;display:flex;flex-direction:column;gap:50px}
      .r{display:flex;gap:28px;align-items:flex-start}
      .r .n{flex:none;width:64px;height:64px;border-radius:50%;border:3px solid ${G};color:${G};font:700 32px 'Playfair Display';display:flex;align-items:center;justify-content:center}
      .r b{display:block;font:800 30px Montserrat;letter-spacing:5px;color:${G};margin-bottom:6px}
      .r span{font:400 38px/1.3 Inter;color:${CREAM}}
      .ev{margin-top:84px;border-top:2px solid #3a2f20;padding-top:40px}
      .ev b{font:700 22px Inter;letter-spacing:5px;color:#d04a4a}
      .ev p{font:500 36px/1.4 Inter,${EMO};color:#d9cdb9;margin-top:14px}
      .ev small{display:block;font:italic 400 32px/1.35 'Playfair Display';color:#9c8a66;margin-top:16px}`,
    body: `<div class="k">ANTES DE COMEÇAR</div>${pg(2)}
      <div class="w"><div class="t">A regra por trás<br><i>das 10 aberturas</i></div>
      <div class="rg">
        <div class="r"><div class="n">1</div><div><b>OBSERVAÇÃO</b><span>Mostre que você viu algo específico dela.</span></div></div>
        <div class="r"><div class="n">2</div><div><b>PERGUNTA</b><span>Dê a ela algo fácil e gostoso de responder.</span></div></div>
        <div class="r"><div class="n">3</div><div><b>LEVEZA</b><span>Sem textão, sem pressão, sem cobrar resposta.</span></div></div>
      </div>
      <div class="ev"><b>EVITE</b><p>🔥 sozinho · “oi linda” · “oi sumida” · “tá on?”</p>
      <small>Cabem em qualquer story, de qualquer pessoa. Por isso se perdem no meio de todo o resto. E não copie palavra por palavra: use a estrutura e troque o detalhe pelo que ELA postou.</small></div></div>
      <div class="h">${H}</div>`,
  },
  dupla(3, 0), dupla(4, 2), dupla(5, 4), dupla(6, 6), dupla(7, 8),
  {
    dir: DIR, file: 'pagina-08.png',
    css: base + `
      .w{position:absolute;top:150px;left:80px;right:80px}
      .t{font:400 84px/1.06 'Playfair Display';color:${CREAM}}
      .t i{color:${G}}
      .p{font:400 38px/1.4 Inter;color:#d9cdb9;margin-top:36px}
      .box{margin-top:84px;border:3px solid ${G};border-radius:34px;padding:44px 48px;background:linear-gradient(180deg,#2b2113,#1b140c)}
      .box b{font:800 24px Montserrat;letter-spacing:6px;color:${G}}
      .box .bt{font:400 54px/1.1 'Playfair Display';color:${CREAM};margin-top:18px}
      .box p{font:400 32px/1.4 Inter;color:#d9cdb9;margin-top:20px}
      .box .cta{display:inline-block;margin-top:30px;font:800 30px Montserrat;letter-spacing:4px;color:#16110a;background:${G};padding:18px 30px;border-radius:14px}
      .end{font:italic 400 38px/1.35 'Playfair Display';color:#9c8a66;margin-top:80px}`,
    body: `<div class="k">PRA FECHAR</div>${pg(8)}
      <div class="w"><div class="t">E se ela<br><i>não responder?</i></div>
      <div class="p">Não mande “oi??”. Não cobre. Silêncio também é resposta, e saber sair com elegância é presença.</div>
      <div class="box"><b>QUER IR ALÉM DO “OI”?</b>
        <div class="bt">O Protocolo da Presença</div>
        <p>O método completo: como sustentar a conversa, o que fazer com resposta seca e como levar o papo pra vida real, com respeito.</p>
        <div class="cta">LINK NA BIO</div></div>
      <div class="end">Testou alguma? Me conta no direct qual foi. Eu leio todas.</div></div>
      <div class="h">${H}</div>`,
  },
];
