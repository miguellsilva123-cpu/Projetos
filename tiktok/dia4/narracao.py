"""Narração do Dia 4 — Os 5 vacilos que fazem ela esfriar (roteiro do usuário + retomada do Dia 3).

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
Cada trecho tem uma âncora no tempo original da animação de dia4.html.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
from narracao_fluida import build  # noqa: E402

OLD_END = 54.0
OLD_START = -1.6

# (id, [(trecho, âncora no tempo original), ...], pausa depois do bloco)
BLOCKS = [
    ('b00', [('Dia quatro.', -1.2)], 0.3),
    ('b01', [('Ela tava respondendo bem.', 0.2), ('Do nada:', 1.4), ('resposta curta,', 1.9), ('demora,', 2.7),
             ('e sumiu.', 3.3)], 0.4),
    ('b02', [('Quase sempre foi um dos cinco vacilos que eu te prometi ontem.', 4.4)], 0.6),
    ('b03', [('Um: puxar pro lado sexual antes de ela te conhecer.', 7.0),
             ('Ela entende que você só quer uma coisa.', 10.2)], 0.7),
    ('b04', [('Dois: cobrar resposta.', 13.5), ('Sumiu? transforma interesse em obrigação.', 15.6)], 0.7),
    ('b05', [('Três: mandar mensagem atrás de mensagem sem ela responder.', 20.5),
             ('A ansiedade aparece no texto.', 24.0)], 0.7),
    ('b06', [('Quatro: falar só de você.', 27.5), ('Se ela sai do encontro e você não sabe nada dela,', 29.2),
             ('foi um monólogo, não um encontro.', 31.8)], 0.7),
    ('b07', [('Cinco: olhar o celular enquanto ela fala.', 34.5),
             ('Ela percebe na hora que não é prioridade.', 37.2)], 0.8),
    ('b08', [('Se você se viu em algum, tudo bem. Todo mundo já fez.', 41.0), ('O que importa é parar agora.', 43.4)], 0.5),
    ('b09', [('Missão de hoje: relê a última conversa que morreu e marca qual vacilo apareceu.', 45.0),
             ('Amanhã, último dia: o que fazer quando bate o silêncio.', 49.5)], 0.0),
]

if __name__ == '__main__':
    build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2], OLD_START)
