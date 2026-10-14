"""Narração do reel "Foguinho no direct" — mesma pergunta da caixinha do reel de referência,
resposta e método próprios do Protocolo (o filtro: serviria pra qualquer outra?).

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import narracao_fluida  # noqa: E402

narracao_fluida.LEAD_IN = 0.3
OLD_END = 57.5

BLOCKS = [
    ('b01', [('Eu mando foguinho no direct dela, e ela não responde. Devo desistir dela?', 0.3)], 0.35),
    ('b02', [('Não desiste dela.', 4.0), ('Desiste do foguinho.', 5.0)], 0.7),
    ('b03', [('Foguinho é a mensagem mais fácil de mandar.', 6.6), ('Por isso é a que ela mais recebe.', 8.6),
             ('E é a primeira que ela esquece.', 10.8)], 0.5),
    ('b04', [('E foguinho não deixa nada pra ela responder.', 13.0), ('Ou ela devolve outro emoji, ou ignora.', 15.2)], 0.6),
    ('b05', [('Então, antes de mandar, usa o filtro:', 18.0),
             ('essa mensagem serviria pra qualquer outra mulher?', 20.4)], 0.35),
    ('b06', [('Se sim, você é invisível.', 22.8)], 0.7),
    ('b07', [('Pra passar no filtro, toma a iniciativa de verdade:', 25.0),
             ('repara no que ela faz, não no corpo dela,', 26.6),
             ('e pergunta algo que só ela sabe responder.', 28.3)], 0.5),
    ('b08', [('Ela postou o cachorro que destruiu o sofá. Manda assim:', 31.0),
             ('Ele acabou com o sofá inteiro, ou sobrou alguma almofada?', 33.0)], 0.5),
    ('b09', [('Agora ela tem do que rir. E vocês têm assunto.', 36.4)], 0.6),
    ('b10', [('E se mesmo assim ela não responder?', 39.4), ('Aí sim: segue a vida.', 41.2)], 0.4),
    ('b11', [('Uma mensagem boa. Nada de segundo foguinho, nada de sumiu.', 42.8),
             ('Quem tem interesse, responde.', 46.0)], 0.6),
    ('b12', [('Agora é com você: ela postou um bolo que queimou.', 48.4),
             ('Comenta o que você mandaria, que eu passo no filtro.', 51.0)], 0.0),
]

if __name__ == '__main__':
    narracao_fluida.build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2])
