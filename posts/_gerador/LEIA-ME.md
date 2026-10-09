# Gerador das imagens

Código usado para criar as imagens de `posts/simples` e `posts/dark` (HTML + Playwright).
- `posts.js`: texto e design de cada post.
- `render.js`: transforma cada post em PNG 1080×1350.

As fontes (Google Fonts) são baixadas para uma pasta `fonts/` ao lado destes arquivos, com um `local.css`.
Uso: `node render.js <pasta-de-saida> [filtro-de-nome]`
