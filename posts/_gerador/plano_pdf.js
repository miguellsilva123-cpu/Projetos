// PDFs separados do plano de hoje (o que fazer, diagnóstico, Reel, legenda, bio, roteiro do direct, como medir), páginas 1080x1350.
// Uso: node plano_pdf.js <pasta-de-saida> [pasta-para-previews-png]
const { chromium } = require('playwright');
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const [OUT_DIR, PREVIEW] = process.argv.slice(2);
const ROOT = path.join(__dirname, '..', '..');
const HTML_DIR = path.join(__dirname, 'html', 'plano');
fs.mkdirSync(HTML_DIR, { recursive: true });

const G = '#C9A23F', CREAM = '#F0E5D8';
const EMO = `'Noto Color Emoji'`;
const H = '@oprotocolodapresenca';

// Quadros do Reel para o storyboard
const REEL = path.join(ROOT, 'posts/reel-direct-dela/reel-direct-dela.mp4');
const FRAMES = [['0.0', '0 s', 'O gancho: o direct dela já lotado de 🔥 e “oi sumida”.'],
  ['4.6', '4 s', 'Chega a 47 mensagens.'],
  ['10.5', '10 s', 'A única que ela respondeu, e por quê.'],
  ['16.5', '16 s', 'A chamada: manda ABERTURA no direct.']];
for (const [t] of FRAMES) {
  execFileSync('ffmpeg', ['-loglevel', 'error', '-y', '-ss', t, '-i', REEL, '-frames:v', '1', '-vf', 'scale=440:-1', '-q:v', '3',
    path.join(HTML_DIR, `frame-${t}.jpg`)]);
}

const css = `
@page{size:1080px 1350px;margin:0}
*{margin:0;padding:0;box-sizing:border-box}
html,body{-webkit-print-color-adjust:exact;print-color-adjust:exact;background:#070605}
.page{width:1080px;height:1350px;position:relative;overflow:hidden;break-after:page;
  background:radial-gradient(ellipse at 80% 12%,#2a1e10 0%,#120d08 45%,#070605 100%);
  font-family:Inter,${EMO};color:#d9cdb9;padding:150px 80px 120px}
.page:last-child{break-after:auto}
.k{position:absolute;top:64px;left:80px;font:600 24px Montserrat;color:${G};letter-spacing:7px}
.pg{position:absolute;top:64px;right:80px;font:500 24px Inter;color:#8a7a5c;letter-spacing:3px}
.h{position:absolute;bottom:50px;left:0;right:0;text-align:center;font:600 22px Inter;letter-spacing:3px;color:#6f6450}
h1{font:400 70px/1.06 'Playfair Display';color:${CREAM};margin-bottom:40px}
h1 i,h2 i{color:${G}}
h2{font:400 46px/1.15 'Playfair Display';color:${CREAM};margin:36px 0 18px}
p{font:400 30px/1.45 Inter,${EMO}}
b{color:${CREAM};font-weight:700}
.gold{color:${G}}
.steps{display:flex;flex-direction:column;gap:30px}
.st{display:flex;gap:28px;align-items:flex-start}
.st .n{flex:none;width:62px;height:62px;border-radius:50%;border:3px solid ${G};color:${G};font:700 30px 'Playfair Display';
  display:flex;align-items:center;justify-content:center;margin-top:2px}
.st p{font-size:30px}
.st p b{display:block;font:700 32px/1.3 Inter;margin-bottom:4px}
.box{border:3px solid ${G};border-radius:30px;padding:34px 40px;background:linear-gradient(180deg,#2b2113,#1b140c)}
.box .lb{font:800 22px Montserrat;letter-spacing:6px;color:${G};margin-bottom:14px}
.warn{border-color:#c0583f;background:linear-gradient(180deg,#2b1610,#1b0f0a)}
.warn .lb{color:#e07a5f}
.tiles{display:grid;grid-template-columns:repeat(4,1fr);gap:18px;margin-bottom:44px}
.tile{border:2px solid #3a2f20;border-radius:24px;padding:26px 20px;text-align:center;background:#16100a}
.tile .v{font:400 68px/1 'Playfair Display';color:${G}}
.tile .l{font:600 20px Inter;letter-spacing:2px;color:#9c8a66;margin-top:12px;text-transform:uppercase}
table{width:100%;border-collapse:collapse;font:500 26px Inter,${EMO}}
th{font:700 18px Inter;letter-spacing:3px;color:${G};text-align:left;padding:0 10px 16px;text-transform:uppercase;border-bottom:2px solid #3a2f20}
td{padding:22px 10px;border-bottom:1px solid #2a2117;color:${CREAM}}
td.num,th.num{text-align:right}
td small{display:block;font:500 20px Inter;color:#8a7a5c;margin-top:4px}
tr.best td{background:rgba(201,162,63,.10)}
.pts{display:flex;flex-direction:column;gap:22px}
.pt{border-left:4px solid ${G};padding:2px 0 2px 26px}
.pt p{font-size:27px;line-height:1.4}
.pts.small .pt p{font-size:25px}
.pts.small .pt p b{font-size:inherit}
.pt p b{display:block;font-size:29px;margin-bottom:4px}
.chat{display:flex;flex-direction:column;gap:14px}
.me{align-self:flex-start;max-width:900px;background:${G};color:#16110a;font:600 29px/1.35 Inter,${EMO};
  padding:20px 30px;border-radius:30px;border-bottom-left-radius:8px}
.lbl{font:700 20px Inter;letter-spacing:4px;color:#9c8a66;margin-top:18px}
.cap{white-space:pre-wrap;font:400 25px/1.42 Inter,${EMO};color:${CREAM}}
.bio{white-space:pre-wrap;font:600 38px/1.45 Inter,${EMO};color:${CREAM}}
.frames{display:grid;grid-template-columns:repeat(4,1fr);gap:16px}
.fr img{width:100%;border-radius:18px;border:2px solid #3a2f20;display:block}
.fr .t{font:700 20px Inter;letter-spacing:3px;color:${G};margin-top:14px}
.fr p{font-size:21px;line-height:1.35;margin-top:6px}
`;

const foot = `<div class="h">${H}</div>`;
// Cada página vira uma função (n, total) para numerar dentro do próprio PDF
const page = (kicker, inner) => (n, total) =>
  `<section class="page"><div class="k">${kicker}</div>${total > 1 ? `<div class="pg">${n}/${total}</div>` : ''}${inner}${foot}</section>`;

const CAPTION = `Ela posta UM story e o direct dela vira isso. 📲

🔥 "linda" "oi sumida" "tá on?" 🔥🔥

Não é que ela não responda ninguém. É que quase todo mundo manda a mesma coisa. E mensagem que serve pra qualquer story não mostra que você prestou atenção NELA.

A mensagem que ela responde tem 3 coisas:
1️⃣ Um detalhe do que ela postou
2️⃣ Uma pergunta fácil de responder
3️⃣ Leveza, sem pressão

Separei 10 aberturas nesse estilo, uma pra cada tipo de story: série, comida, viagem, treino, pet...

📩 Manda ABERTURA no meu direct que eu te envio o guia grátis.

#direct #dicasparahomens #comunicação #paquera #relacionamento`;

const BIO = fs.readFileSync(path.join(ROOT, 'posts/reel-direct-dela/bio-nova.txt'), 'utf8').trim();

const P = {
  hoje: page('O QUE FAZER HOJE', `<h1>Hoje, <i>em ordem</i></h1>
    <div class="steps">
      <div class="st"><div class="n">1</div><p><b>Trocar a bio</b>Está no PDF 05 (Bio nova). Leva 1 minuto.</p></div>
      <div class="st"><div class="n">2</div><p><b>Postar o Reel entre 20h e 21h</b>Pelo app, com uma música em alta e a capa. Passo a passo no PDF 03 (Reel e como postar).</p></div>
      <div class="st"><div class="n">3</div><p><b>Fixar o Reel no perfil</b>Nos 3 pontinhos do Reel, toque em Fixar.</p></div>
      <div class="st"><div class="n">4</div><p><b>Responder quem mandar ABERTURA</b>Em até 1 hora, com as 8 fotos do guia. Olhe também em Solicitações de mensagem. Roteiro no PDF 06 (Roteiro do direct).</p></div>
      <div class="st"><div class="n">5</div><p><b>Amanhã à noite, conferir os números</b>A tabela está no PDF 07 (Como medir).</p></div>
    </div>
    <div class="box" style="margin-top:48px"><div class="lb">REGRA DO MÊS</div>
      <p>1 Reel por dia, sempre com a mesma chamada: <b>“Manda ABERTURA no meu direct”.</b></p></div>`),

  numeros: page('DIAGNÓSTICO', `<h1>Os números <i>do perfil</i></h1>
    <p style="margin:-18px 0 34px;font-size:24px;color:#9c8a66">Dados do Instagram puxados pelo Windsor.ai, últimos 30 dias.</p>
    <div class="tiles">
      <div class="tile"><div class="v">0</div><div class="l">Seguidores</div></div>
      <div class="tile"><div class="v">4</div><div class="l">Posts</div></div>
      <div class="tile"><div class="v">267</div><div class="l">Views no mês</div></div>
      <div class="tile"><div class="v">0</div><div class="l">Toques no link</div></div>
    </div>
    <table>
      <tr><th>Post</th><th class="num">Views</th><th class="num">Alcance</th><th class="num">Saiu nos 3 s</th></tr>
      <tr><td>Reel “🔥 no story”<small>02/10, 19h29</small></td><td class="num">43</td><td class="num">23</td><td class="num">91%</td></tr>
      <tr><td>Carrossel “coleção de cartas”<small>04/10, 01h44</small></td><td class="num">35</td><td class="num">2</td><td class="num">n/a</td></tr>
      <tr class="best"><td>Reel “curtiu seu foguinho”<small>08/10, 22h58 · o melhor até agora</small></td><td class="num">161</td><td class="num">126</td><td class="num">58%</td></tr>
      <tr><td>Imagem “segunda mensagem”<small>10/10, 00h32</small></td><td class="num">10</td><td class="num">3</td><td class="num">n/a</td></tr>
    </table>
    <p style="margin-top:34px;font-size:27px">Somando os 4 posts: <b>2 curtidas, 0 comentários, 0 salvos e 3 compartilhamentos.</b> E <b>94% das views</b> vieram de quem não te segue.</p>`),

  leitura: page('DIAGNÓSTICO', `<h1>O que os números <i>dizem</i></h1>
    <div class="pts">
      <div class="pt"><p><b>Ainda é pouca gente pra julgar.</b>O melhor Reel chegou a 126 pessoas. Conta nova costuma transformar bem menos de 1% do alcance em seguidor. Com esse alcance, 0 seguidor é o esperado.</p></div>
      <div class="pt"><p><b>O Instagram já te mostra pra estranhos.</b>94% das views vieram de quem não te segue. A distribuição funciona.</p></div>
      <div class="pt"><p><b>Foto e carrossel não chegam em ninguém agora.</b>Alcançaram 2 e 3 pessoas. Até uns 300 a 500 seguidores, o post do dia tem que ser Reel.</p></div>
      <div class="pt"><p><b>A maioria sai antes do 3º segundo.</b>91% no 1º Reel, 58% no 2º. O gancho tem que ser visual e reconhecível no primeiro quadro.</p></div>
      <div class="pt"><p><b>Faltou um presente.</b>Cada post pedia uma coisa diferente, e a bio vende o ebook pago pra quem nem te conhece. Resultado: 0 toques no link.</p></div>
      <div class="pt"><p><b>Homem não comenta em público nesse tema.</b>0 comentários, mas 3 compartilhamentos: a ação mais discreta foi a que mais apareceu. Por isso a chamada agora é pelo direct.</p></div>
    </div>`),

  nicho: page('O NICHO É RUIM?', `<h1>O nicho é ruim? <i>Não.</i></h1>
    <p>Comunicação e relacionamento para homens é um dos nichos de produto digital mais antigos e concorridos do Brasil. <b>Concorrência alta é sinal de que tem gente comprando.</b></p>
    <p style="margin-top:22px">O que ainda falta é teste: 4 posts em 9 dias e 267 views não validam nem derrubam nicho nenhum.</p>
    <div class="box" style="margin-top:32px"><div class="lb">CRITÉRIO JUSTO PRA DECIDIR</div>
      <p>30 Reels, 1 por dia, com a mesma oferta grátis. Se nenhum passar de 1.000 views <b>e</b> ninguém pedir o guia no direct, a gente muda o ângulo (o jeito de falar do tema) antes de pensar em trocar de nicho.</p></div>
    <h2>O que muda <i>a partir de hoje</i></h2>
    <div class="pts small" style="gap:12px">
      <div class="pt"><p>1 Reel por dia, entre 20h e 21h, com música em alta. (3 dos 4 posts saíram depois das 22h30.)</p></div>
      <div class="pt"><p>Uma chamada só: <b style="display:inline">“Manda ABERTURA no meu direct”</b>, com o guia grátis.</p></div>
      <div class="pt"><p>Bio pedindo ABERTURA no direct, e não vendendo o ebook.</p></div>
      <div class="pt"><p>Próximos Reels: série “Abertura nº X”, uma por dia. Série dá motivo pra seguir.</p></div>
    </div>`),

  reel: page('O REEL DE HOJE', `<h1>O direct dela <i>5 minutos depois</i></h1>
    <p style="margin:-14px 0 36px;font-size:26px;color:#9c8a66">17 segundos · vertical 1080×1920 · arquivo: reel-direct-dela.mp4</p>
    <div class="frames">${FRAMES.map(([t, l, d]) =>
      `<div class="fr"><img src="frame-${t}.jpg"><div class="t">${l}</div><p>${d}</p></div>`).join('')}</div>
    <div class="box" style="margin-top:40px"><div class="lb">POR QUE ESSE REEL</div>
      <p>Abre com uma cena que qualquer um reconhece (o direct lotado), mostra o jeito certo em vez de só criticar o errado e termina com <b>uma chamada só</b>. O vídeo vem sem música de propósito: ela entra pelo app.</p></div>`),

  postar: page('COMO POSTAR', `<h1>Como postar <i>pelo app</i></h1>
    <div class="steps">
      <div class="st"><div class="n">1</div><p><b>Horário: hoje, entre 20h e 21h</b>Horário de Brasília. É quando seu público está no celular.</p></div>
      <div class="st"><div class="n">2</div><p><b>Novo Reel</b>Escolha o arquivo reel-direct-dela.mp4.</p></div>
      <div class="st"><div class="n">3</div><p><b>Áudio</b>Toque em “Áudio” e escolha uma música em alta (a que tem a setinha ↗), instrumental e com volume baixo. Reel sem áudio chega em menos gente.</p></div>
      <div class="st"><div class="n">4</div><p><b>Capa</b>“Editar capa” → “Adicionar da galeria” → capa.jpg.</p></div>
      <div class="st"><div class="n">5</div><p><b>Legenda</b>Cole a legenda do PDF 04 (Legenda), inteira, e publique.</p></div>
      <div class="st"><div class="n">6</div><p><b>Fixe no perfil</b>Nos 3 pontinhos do Reel, toque em Fixar.</p></div>
    </div>`),

  legenda: page('LEGENDA PRONTA', `<h1>A legenda <i>(copie inteira)</i></h1>
    <div class="box" style="padding:36px 40px"><div class="cap">${CAPTION}</div></div>`),

  bio: page('A BIO NOVA', `<h1>A bio nova</h1>
    <div class="box"><div class="lb">COPIE EXATAMENTE ISTO</div><div class="bio">${BIO}</div></div>
    <h2 style="margin-top:30px">Como trocar</h2>
    <p>Perfil <b>@oprotocolodapresenca</b> → <b>Editar perfil</b> → <b>Bio</b> → apague o texto atual → cole o novo → <b>Concluir</b>. Não mexa no link: ele continua o mesmo e aparece logo abaixo do “📖 Ebook completo 👇”.</p>
    <h2 style="margin-top:30px">O que cada linha faz</h2>
    <div class="pts" style="gap:14px">
      <div class="pt"><p><b style="display:inline">Linhas 1 e 2:</b> dizem em 2 segundos o que o perfil ensina.</p></div>
      <div class="pt"><p><b style="display:inline">Linha 3:</b> a mais importante. Diz o que a pessoa ganha e o que fazer pra receber. É a mesma palavra que o Reel pede.</p></div>
      <div class="pt"><p><b style="display:inline">Linha 4:</b> deixa o ebook pago como segundo passo, pra quem já confia em você.</p></div>
    </div>`),

  direct: page('QUANDO ALGUÉM MANDAR ABERTURA', `<h1>O roteiro <i>do direct</i></h1>
    <div class="box warn"><div class="lb">ATENÇÃO</div><p>Quem não te segue cai em <b>Solicitações de mensagem</b>. Olhe lá, senão o lead se perde. Responda em até 1 hora.</p></div>
    <div class="chat" style="margin-top:20px">
      <div class="lbl">MENSAGEM 1 · JUNTO COM AS 8 FOTOS DO GUIA</div>
      <div class="me">Fala! Aqui tá o guia com as 10 aberturas 👇</div>
      <div class="lbl">MENSAGEM 2</div>
      <div class="me">Começa pela 01 ou pela 07, são as mais fáceis de adaptar. Depois me conta qual você testou? 👊</div>
      <div class="lbl">SÓ SE A PESSOA VOLTAR PRA CONTAR COMO FOI</div>
      <div class="me">Que bom que funcionou! Se quiser o método completo (como sustentar a conversa e levar pro encontro), o ebook tá no link da bio.</div>
    </div>
    <p style="margin-top:30px;font-size:25px;color:#9c8a66">O Instagram não deixa mandar PDF no direct pelo celular. Por isso o guia vai como 8 fotos, num álbum só. Não ofereça o ebook na primeira conversa.</p>`),

  medir: page('COMO SABER SE FUNCIONOU', `<h1>Amanhã à noite, <i>confira</i></h1>
    <table>
      <tr><th>Métrica</th><th class="num">Reel de 08/10</th><th class="num">Meta deste</th></tr>
      <tr><td>Saiu nos 3 primeiros segundos</td><td class="num">58%</td><td class="num gold">abaixo de 50%</td></tr>
      <tr><td>Alcance</td><td class="num">126</td><td class="num gold">300+</td></tr>
      <tr><td>Pedidos de ABERTURA no direct</td><td class="num">não tinha</td><td class="num gold">1 já é sinal</td></tr>
      <tr><td>Seguidores novos</td><td class="num">0</td><td class="num gold">1+</td></tr>
    </table>
    <div class="box" style="margin-top:50px"><div class="lb">ONDE VER</div>
      <p>No Reel, toque em <b>Ver insights</b>. Ou me peça aqui que eu puxo os números pelo Windsor.</p></div>
    <p style="margin-top:40px">Bateu a meta? Repita o formato amanhã com a próxima abertura do guia. Não bateu? Me mande os números que a gente ajusta o gancho.</p>`),

};

const PDFS = [
  ['01-o-que-fazer-hoje', [P.hoje]],
  ['02-diagnostico', [P.numeros, P.leitura, P.nicho]],
  ['03-reel-e-como-postar', [P.reel, P.postar]],
  ['04-legenda', [P.legenda]],
  ['05-bio-nova', [P.bio]],
  ['06-roteiro-do-direct', [P.direct]],
  ['07-como-medir', [P.medir]],
];


(async () => {
  fs.mkdirSync(OUT_DIR, { recursive: true });
  const browser = await chromium.launch();
  const page = await browser.newPage({ viewport: { width: 1080, height: 1350 } });
  for (const [name, fns] of PDFS) {
    const file = path.join(HTML_DIR, name + '.html');
    const body = fns.map((fn, i) => fn(i + 1, fns.length)).join('\n');
    fs.writeFileSync(file, `<!doctype html><html><head><meta charset="utf-8"><link rel="stylesheet" href="../../fonts/local.css">` +
      `<style>${css}</style></head><body>${body}</body></html>`);
    await page.goto('file://' + file);
    await page.evaluate(() => document.fonts.ready);
    await page.waitForTimeout(300);
    await page.pdf({ path: path.join(OUT_DIR, name + '.pdf'), width: '1080px', height: '1350px', printBackground: true,
      margin: { top: 0, right: 0, bottom: 0, left: 0 } });
    if (PREVIEW) {
      fs.mkdirSync(PREVIEW, { recursive: true });
      const secs = await page.$$('section.page');
      for (let i = 0; i < secs.length; i++) await secs[i].screenshot({ path: path.join(PREVIEW, `${name}-${i + 1}.png`) });
    }
    console.log('pdf ok', name);
  }
  await browser.close();
})();
