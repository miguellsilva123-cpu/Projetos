"""Narração do Dia 2 — A primeira frase.

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
Cada trecho tem uma âncora no tempo original da animação de dia2.html.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
from narracao_fluida import build  # noqa: E402

OLD_END = 46.5
OLD_START = -4.6   # a retomada da promessa do vídeo anterior acontece antes do tempo 0

# (id, [(trecho, âncora no tempo original), ...], pausa depois do bloco)
BLOCKS = [
    ('b00', [('Dia dois.', -4.0)], 0.35),
    ('b00b', [('Ontem eu te pedi pra anotar um detalhe de três stories.', -3.4),
              ('Hoje eu te mostro o que escrever com eles.', -1.6)], 0.5),
    ('b01', [('Ela recebe esse tipo de mensagem o dia todo.', 0.8), ('Por que ela responderia a sua?', 2.6)], 0.5),
    ('b02', [('Elogio solto não abre conversa.', 5.2), ('Ela não tem nada pra responder, além de obrigada.', 8.8),
             ('Ou nada.', 11.0)], 1.0),
    ('b03', [('Mesmo story, outra mensagem.', 14.2)], 2.4),
    ('b03b', [('Agora ela tem o que contar.', 19.6),
              ('Você não elogiou a aparência dela: você reparou no que ela fez.', 22.0)], 0.5),
    ('b04', [('A fórmula é um detalhe do que ela mostrou,', 25.6), ('mais uma pergunta leve, que dá vontade de responder.', 28.0),
             ('Uma pergunta que não se responde com sim ou não.', 31.0)], 0.5),
    ('b05', [('Ao vivo funciona igual:', 34.4), ('você entendeu alguma coisa dessa aula, ou fui só eu?', 35.8)], 0.5),
    ('b06', [('Missão de hoje: pega um daqueles três detalhes e escreve a sua abertura.', 39.0),
             ('Amanhã: como não deixar a conversa morrer depois que ela responde.', 42.5)], 0.0),
]

if __name__ == '__main__':
    build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2], OLD_START)
