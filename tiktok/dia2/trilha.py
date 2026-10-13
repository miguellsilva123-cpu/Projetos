"""Trilha, efeitos e locutor do Dia 2 (tempos no relógio original de dia2.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

MSG_A = 'gata demais'
MSG_B = '1 mês sem faltar? qual foi o dia que quase te fez desistir?'

mx = sfx.Mix(sys.argv[1])
rng = sfx.np.random.default_rng(3)

for t0, d, g in [(0.15, 1.2, .22), (4.2, .9, .3), (24.8, .9, .3), (33.8, .9, .3), (38.4, .9, .3)]:
    mx.place(sfx.whoosh(d), t0, g, pan=-.3)
    mx.place(sfx.whoosh(d), t0 + .02, g, pan=.3)
for k, t0 in enumerate([0.6, 0.95, 1.3, 1.6, 1.9, 2.2, 2.45]):          # caixa de entrada enchendo
    mx.place(sfx.plim(1250 + 40 * k), t0, .32, pan=rng.uniform(-.4, .4))
for t0, g in [(1.7, .6), (5.9, .5), (14.9, .45), (28.1, .55)]:
    mx.place(sfx.boom(), t0, g)
for i in range(len(MSG_A)):                                               # ele digita "gata demais"
    mx.place(sfx.key(), 6.3 + i * .08, .3, pan=rng.uniform(-.2, .2))
for i in range(len(MSG_B)):                                               # a mensagem com contexto
    mx.place(sfx.key(), 15.2 + i * .048, .26, pan=rng.uniform(-.2, .2))
for t0 in (7.8, 18.2):                                                    # enviar
    mx.place(sfx.whoosh(.35), t0, .25)
mx.place(sfx.tick(2400, .07), 8.8, .4)                                    # "Visto"
mx.place(sfx.rewind(.95), 12.85, .35)
for k in range(5):                                                        # três pontinhos
    mx.place(sfx.key(), 18.6 + k * .2, .12)
mx.place(sfx.pop(), 19.6, .45)                                            # resposta longa dela
for t0 in (25.7, 27.6, 28.0, 31.0):                                       # fórmula se montando
    mx.place(sfx.tick(2000, .08), t0, .35)
aula = sfx.murmur(mx.span(34.2, 38.4), 5)
mx.place(aula * sfx.np.clip(sfx.np.arange(len(aula)) / sfx.SR / .5, 0, 1), 34.2, .16)
mx.place(sfx.pop(800, 1300), 37.4, .4)
for t0 in (41.2, 41.6):
    mx.place(sfx.tick(1800, .08), t0, .35)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.6), 43.2, .4)

# a trilha some no começo, corta no "Visto" (silêncio) e abaixa no rebobinar
mx.render(sys.argv[3], sys.argv[2], ducks=[(0, .5, 0), (8.8, 11.8, 0), (12.8, 13.8, .3)])
print('ok', sys.argv[3])
