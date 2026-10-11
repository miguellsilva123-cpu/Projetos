# Gerador das imagens

Código usado para criar as imagens de `posts/simples` e `posts/dark` (HTML + Playwright).
- `posts.js`: texto e design de cada post.
- `render.js`: transforma cada post em PNG 1080×1350.

As fontes (Google Fonts) são baixadas para uma pasta `fonts/` ao lado destes arquivos, com um `local.css`.
Uso: `node render.js <pasta-de-saida> [filtro-de-nome]`
- `posts_v2.js`: versões refeitas dos 8 posts mais fracos (use `POSTS=./posts_v2 node render.js <saida>`).
- `posts_v3.js`: série nova (conversa anotada, fluxograma, tarô, tweet, guia, antes/depois, cartão de embarque).
- `posts_isca.js`: guia grátis "10 aberturas para o direct" (use `POSTS=./posts_isca node render.js ../../produto`).
- `reel.js`: Reel em vídeo 1080×1920 quadro a quadro + ffmpeg (`node reel.js <saida.mp4> <capa.jpg>`).
- `plano_pdf.js`: PDFs separados do plano de hoje (`node plano_pdf.js ../reel-direct-dela/pdfs`). A legenda vem de `posts/reel-direct-dela/legenda.txt` e a bio de `bio-nova.txt`.
