"""Narração do Dia 5 — O silêncio e o próximo passo (roteiro do usuário, gancho e chamada final reforçados), com a voz da série.

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
Cada trecho tem uma âncora no tempo original da animação de dia5.html (os tempos do briefing).
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import narracao_fluida  # noqa: E402

narracao_fluida.LEAD_IN = 0.5
OLD_END = 54.0

# (id, [(trecho, âncora no tempo original), ...], pausa depois do bloco)
BLOCKS = [
    ('b01', [('Acabou o assunto no encontro?', 0.3), ('Tem uma frase que salva.', 1.9)], 0.6),
    ('b02', [('Primeiro: calma.', 4.3), ('Alguns segundos de silêncio são normais.', 5.8),
             ('O que mata é o desespero de disparar qualquer pergunta.', 8.6)], 0.55),
    ('b03', [('Segundo: volta num assunto que ficou aberto.', 13.3),
             ('A frase é essa:', 16.3), ('Peraí, você não terminou de contar daquele show.', 17.0),
             ('Ela percebe que você prestou atenção,', 20.5), ('e a conversa volta sozinha.', 22.8)], 0.55),
    ('b04', [('Terceiro: sem assunto aberto, usa o que tá na sua frente.', 25.3),
             ('O lugar, a música, o que vocês pediram.', 28.6)], 0.55),
    ('b05', [('E no direct, quando a conversa tá boa, não deixa esfriar.', 32.4),
             ('Chama pra algo concreto:', 35.4),
             ('Você falou que queria um hambúrguer bom. Conheço um... Sábado?', 36.8)], 0.55),
    ('b06', [('Chamar, abrir, sustentar, não vacilar e lidar com o silêncio.', 41.3),
             ('Esses foram os cinco dias.', 44.3)], 0.5),
    ('b07', [('Isso é só uma parte do protocolo.', 46.3),
             ('O completo vai do primeiro direct ao primeiro encontro, em onze capítulos.', 47.5),
             ('Comenta presença, que eu te mando o acesso.', 49.6)], 0.0),
]

if __name__ == '__main__':
    narracao_fluida.build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2])
