"""Narração do Dia 3 — O fio da conversa (roteiro do usuário + retomada da promessa do Dia 2).

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
Cada trecho tem uma âncora no tempo original da animação de dia3.html.
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
from narracao_fluida import build  # noqa: E402

OLD_END = 50.5
OLD_START = -4.6   # a retomada (ela respondeu a abertura de ontem) acontece antes do tempo 0

# (id, [(trecho, âncora no tempo original), ...], pausa depois do bloco)
BLOCKS = [
    ('b00', [('Dia três.', -4.0)], 0.3),
    ('b00b', [('Ela respondeu a sua abertura.', -3.2), ('E agora?', -1.4)], 0.5),
    ('b01', [('Se a sua conversa parece isso...', 0.6), ('ela não tá te conhecendo.', 3.0),
             ('Ela tá preenchendo um formulário.', 4.3)], 0.7),
    ('b02', [('O erro é pular de assunto.', 6.5), ('Cada pergunta nova joga fora a resposta anterior.', 8.0),
             ('A conversa fica sem fio... e morre.', 11.0)], 0.8),
    ('b03', [('Toda resposta dela tem um detalhe.', 13.6), ('Pega esse detalhe e vai mais fundo.', 15.5)], 0.4),
    ('b04', [('Ela disse que trabalha o dia todo e faz faculdade à noite?', 17.5),
             ('Pergunta: que horas você dorme?', 20.0)], 2.7),
    ('b05', [('E não fica só perguntando.', 25.2), ('Comenta o que ela disse,', 26.5), ('conta algo seu,', 28.0),
             ('e devolve a bola.', 29.5), ('É pingue-pongue, não interrogatório.', 31.0)], 0.6),
    ('b06', [('No encontro é igual.', 33.3), ('Ela foi num show no fim de semana?', 34.6), ('Não pergunta: foi bom?', 36.2),
             ('Pergunta: qual música você mais gritou?', 38.0)], 0.6),
    ('b07', [('Missão de hoje: na próxima conversa, faz duas perguntas em cima da mesma resposta antes de mudar de assunto.', 41.2),
             ('Amanhã: os cinco vacilos que fazem ela esfriar.', 46.6)], 0.0),
]

if __name__ == '__main__':
    build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2], OLD_START)
