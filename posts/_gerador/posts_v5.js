// Carrossel "O que mandar depois do oi" — slides 2 a 8 (a capa é a foto do whisky feita no Canva)
const NOISE = (op) =>
  `url("data:image/svg+xml;utf8,<svg xmlns='http://www.w3.org/2000/svg' width='300' height='300'><filter id='n'><feTurbulence type='fractalNoise' baseFrequency='.85' numOctaves='3' stitchTiles='stitch'/><feColorMatrix values='0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  0 0 0 ${op} 0'/></filter><rect width='100%' height='100%' filter='url(%23n)'/></svg>")`;
const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';
const G = '#C9A23F';
const CREAM = '#F0E5D8';
const TOTAL = 9;

const base = `
  body{background:radial-gradient(ellipse at 80% 15%,#2a1e10 0%,#120d08 45%,#070605 100%);font-family:Inter,${EMO}}
  body:after{content:'';position:absolute;inset:0;background:${NOISE(0.22)};pointer-events:none;z-index:9}
  .pg{position:absolute;top:70px;right:80px;font:500 26px Inter;color:#8a7a5c;letter-spacing:3px}
  .k{position:absolute;top:70px;left:80px;font:600 26px Montserrat;color:${G};letter-spacing:8px}
  .h{color:#6f6450;bottom:50px}
  .t{font:400 92px/1.04 'Playfair Display';color:${CREAM}}
  .t i{color:${G}}
  .chat{display:flex;flex-direction:column;gap:22px}
  .m{max-width:760px;font:500 42px/1.28 Inter,${EMO};padding:28px 38px;border-radius:44px}
  .her{align-self:flex-start;background:#2B2622;color:${CREAM};border-bottom-left-radius:10px}
  .me{align-self:flex-end;background:${G};color:#16110a;border-bottom-right-radius:10px}
  .lbl{font:600 24px Inter;letter-spacing:4px;color:#8a7a5c;margin-bottom:-8px}
  .lbl.r{align-self:flex-end}
  .au{display:flex;align-items:center;gap:20px}.pl{width:58px;height:58px;border-radius:50%;background:#16110a;color:${G};font-size:26px;display:flex;align-items:center;justify-content:center}
  .wv{width:330px;height:46px;background:repeating-linear-gradient(90deg,#16110a 0 5px,transparent 5px 11px);-webkit-mask:linear-gradient(90deg,#000 0 100%);clip-path:polygon(0 40%,8% 20%,16% 55%,24% 10%,32% 45%,40% 0,48% 35%,56% 15%,64% 60%,72% 25%,80% 50%,88% 20%,100% 45%,100% 100%,0 100%)}
  .tm{font:600 30px Inter}.tr{display:block;margin-top:18px;font:italic 400 34px/1.3 'Playfair Display';opacity:.85}
  .why{border-left:5px solid ${G};padding:8px 0 8px 34px;font:400 40px/1.35 'Playfair Display';color:#d9cdb9}
  .why b{color:${G};font-weight:700;font-family:Inter;font-size:26px;letter-spacing:5px;display:block;margin-bottom:10px}
`;
const pg = (n) => `<div class="pg">${n}/${TOTAL}</div>`;

const NOMES=['','A PROVOCAÇÃO LEVE','A OPINIÃO POLÊMICA','O JOGO RÁPIDO','O CENÁRIO IMAGINÁRIO','O ÁUDIO DE 10 SEGUNDOS','A SINCERIDADE DIRETA'];
const SLUG=['','provocacao','opiniao','jogo','cenario','audio','sinceridade'];
const exemplo = (n, titulo, herMsg, meMsg, why) => ({
  dir: 'carrossel-6-formas', file: `slide-0${n + 2}-${SLUG[n]}.png`,
  css: base + `
    .w{position:absolute;top:170px;left:80px;right:80px}
    .num{font:400 200px/0.8 'Playfair Display';color:${G};opacity:.9}
    .tt{font:400 74px/1.05 'Playfair Display';color:${CREAM};margin-top:10px}
    .chat{margin-top:70px}
    .why{position:absolute;left:80px;right:80px;bottom:160px}`,
  body: `<div class="k">0${n} · ${NOMES[n]}</div>${pg(n + 2)}
    <div class="w"><div class="num">0${n}</div><div class="tt">${titulo}</div>
    <div class="chat"><div class="lbl">ELA</div><div class="m her">${herMsg}</div>
    <div class="lbl r">VOCÊ</div><div class="m me">${meMsg}</div></div></div>
    <div class="why"><b>POR QUE FUNCIONA</b>${why}</div>
    <div class="h">${H}</div>`,
});

module.exports = [
  {
    dir: 'carrossel-6-formas', file: 'slide-02-o-problema.png',
    css: base + `
      .w{position:absolute;top:190px;left:80px;right:80px}
      .chat{margin-top:80px}
      .x{align-self:flex-end;font:700 30px Inter;color:#d04a4a;letter-spacing:3px;margin-top:-6px}
      .f{position:absolute;left:80px;right:80px;bottom:170px;font:400 52px/1.2 'Playfair Display';color:${CREAM}}
      .f i{color:${G}}
      .sw{position:absolute;right:80px;bottom:110px;font:600 26px Inter;color:#8a7a5c;letter-spacing:3px}`,
    body: `<div class="k">O PROBLEMA</div>${pg(2)}
      <div class="w"><div class="t">Ela respondeu.<br><i>E você travou.</i></div>
      <div class="chat"><div class="m her">oi, tudo bem? 😊</div><div class="m me" style="opacity:.55">tudo e você?</div>
      <div class="x">✕ VIROU ENTREVISTA</div></div></div>
      <div class="f">Resposta que serve pra qualquer uma <i>morre no “tudo”.</i><br>Aqui vão 6 formas diferentes de continuar.</div>
      <div class="sw">ARRASTA →</div>
      <div class="h">${H}</div>`,
  },
  exemplo(1, 'Humor com <i style="color:' + G + '">atitude</i>', 'oi, tudo bem?',
    'Tudo. Mas confesso que tô decepcionado: achei que você ia me deixar esperando bem mais 😏',
    'Brincadeira confiante tira a conversa do automático.'),
  exemplo(2, 'Puxe um <i style="color:' + G + '">debate</i>', 'oi, tudo bem?',
    'Tudo! Mas preciso discordar de uma coisa do seu perfil: café gelado não é café, é sobremesa. Pode se defender.',
    'Todo mundo gosta de defender o que ama.'),
  exemplo(3, 'Transforme em <i style="color:' + G + '">brincadeira</i>', 'oi, tudo bem?',
    'Tudo! Teste rápido: me manda 3 emojis que resumem sua semana que eu adivinho o resto.',
    'Fácil de responder e divertido de continuar.'),
  exemplo(4, 'Crie uma história <i style="color:' + G + '">a dois</i>', 'oi, tudo bem?',
    'Tudo! Já decidi: se a gente fosse dupla num quiz de bar, você ficava com cultura pop e eu com o resto. Fechado?',
    'Imaginação cria cumplicidade logo de cara.'),
  exemplo(5, 'Mude o <i style="color:' + G + '">formato</i>', 'oi, tudo bem?',
    '<span class="au"><span class="pl">▶</span><span class="wv"></span><span class="tm">0:10</span></span><span class="tr">“Tudo ótimo! Mandei áudio porque digitar ‘tudo e você’ me deu preguiça. Me conta: o que salvou seu dia hoje?”</span>',
    'Ninguém espera. Sua voz passa presença que texto não passa.'),
  exemplo(6, 'Sem <i style="color:' + G + '">joguinho</i>', 'oi, tudo bem?',
    'Tudo! Vou ser sincero: te chamei porque achei você interessante e queria trocar uma ideia de verdade. Como foi seu dia?',
    'Clareza é rara. E rara chama atenção.'),
  {
    dir: 'carrossel-6-formas', file: 'slide-09-salva.png',
    css: base + `
      .w{position:absolute;top:0;bottom:0;left:80px;right:80px;display:flex;flex-direction:column;justify-content:center;align-items:center;text-align:center}
      .ic{width:120px;height:150px;border:4px solid ${G};border-bottom:none;position:relative;margin-bottom:60px}
      .ic:after{content:'';position:absolute;left:-4px;right:-4px;bottom:-40px;height:80px;background:linear-gradient(135deg,transparent 50%,#0b0907 50%) left/50% 100% no-repeat,linear-gradient(225deg,transparent 50%,#0b0907 50%) right/50% 100% no-repeat}
      .big{font:400 96px/1.05 'Playfair Display';color:${CREAM}}
      .big i{color:${G}}
      .s{font:400 44px/1.35 Inter;color:#bfb3a0;margin-top:50px}
      .q{margin-top:70px;font:600 40px Inter,${EMO};color:#16110a;background:${G};padding:26px 44px;border-radius:60px}`,
    body: `<div class="k">PRA NÃO ESQUECER</div>${pg(9)}
      <div class="w"><svg width="110" height="140" viewBox="0 0 24 30" fill="none" stroke="${G}" stroke-width="1.6" stroke-linejoin="round" style="margin-bottom:60px"><path d="M3 2h18v26l-9-6-9 6z"/></svg>
      <div class="big">Salva pra usar na<br><i>próxima conversa.</i></div>
      <div class="s">O “oi” abre a porta.<br>A segunda mensagem decide se você entra.</div>
      <div class="q">Qual dessas 6 você testa? 👇</div></div>
      <div class="h">${H}</div>`,
  },
];
