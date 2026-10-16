"""Trilha, efeitos e locutor do Dia 5 (tempos no relógio original de dia5.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np
mx = sfx.Mix(sys.argv[1])

# 1 · gancho: o fio desce e tudo congela no silêncio
mx.place(sfx.boom(1.4, 60, 36), 0.05, .45)
mx.place(sfx.whoosh(1.6), 0.2, .14)
mx.place(sfx.tick(1200, .08), 3.0, .3)
# trocas de cena descendo pelo fio
for t0 in (3.7, 12.85, 24.85, 40.85, 45.85):
    mx.place(sfx.whoosh(.7), t0 - .05, .26, pan=-.25)
    mx.place(sfx.whoosh(.7), t0 - .03, .26, pan=.25)
# 2 · os 3 segundos de silêncio
for i in range(4):
    mx.place(sfx.tick(1800, .05), 5.9 + i * 1.13, .26)
# 3 · os assuntos no fio
for t0, f in ((13.7, 1500), (14.2, 1600), (14.8, 1750)):
    mx.place(sfx.tick(f, .06), t0, .3)
mx.place(sfx.pop(700, 1100), 15.4, .22)
mx.place(sfx.whoosh(.5), 16.4, .14)
mx.place(sfx.pop(800, 1300), 17.1, .3)
mx.place(sfx.whoosh(.5), 20.3, .16)
# 4 · o que tá na sua frente
for t0 in (28.7, 29.35, 30.0):
    mx.place(sfx.pop(900, 1500), t0, .24)
# 5 · o círculo vermelho e o direct
mx.place(sfx.swell((110.0, 164.81, 220.0), 1.0), 31.6, .35)
mx.place(sfx.whoosh(.6), 31.95, .3)
mx.place(sfx.boom(1.2, 66, 34), 32.45, .5)
mx.place(sfx.plim(1320), 36.95, .3)
mx.place(sfx.plim(1568), 39.4, .3)
mx.place(sfx.pop(800, 1300), 39.9, .26)
# 6 · os cinco dias, um check por vez
for k in range(5):
    mx.place(sfx.tick(1400 + 160 * k, .06), 41.3 + k * .6, .32)
mx.place(sfx.boom(1.0, 64, 38), 44.4, .35)
# 7 · chamada final e o fio voltando ao topo
mx.place(sfx.boom(1.2, 60, 36), 49.7, .4)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.4), 50.0, .3)
mx.place(sfx.rewind(.9), 52.95, .12)

mx.render(sys.argv[3], sys.argv[2], ducks=[(3.0, 3.7, .2)], music_gain=.28)
print('ok', sys.argv[3])
