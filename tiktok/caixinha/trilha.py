"""Trilha, efeitos e locutor do reel da caixinha (tempos no relógio original de caixinha.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np
mx = sfx.Mix(sys.argv[1])

mx.place(sfx.plim(1320), .15, .4)                                        # a caixinha aparece
mx.place(sfx.whoosh(.5), 3.9, .25)
mx.place(sfx.boom(), 4.3, .5)
for t0, d, g in [(8.4, .9, .3), (21.8, .9, .3), (56.4, .9, .3), (66.4, .9, .3), (81.2, .9, .3)]:
    mx.place(sfx.whoosh(d), t0, g, pan=-.3)
    mx.place(sfx.whoosh(d), t0 + .02, g, pan=.3)
for k, t0 in enumerate((10.9, 13.5, 14.6)):                              # mensagens iguais chegando
    mx.place(sfx.plim(1250 + 40 * k), t0, .3, pan=(-.3, 0, .3)[k])
mx.place(sfx.boom(), 16.0, .45)
mx.place(sfx.whoosh(.3), 22.7, .18)
mx.place(sfx.pop(), 22.75, .3)
for t0 in (25.3, 26.0, 26.7):                                            # sem dia, sem lugar, sem plano
    mx.place(sfx.tick(900, .09), t0, .4)
mx.place(sfx.whoosh(.25), 35.15, .3)
mx.place(sfx.boom(1.6, 70, 30), 35.4, .65)                               # carimbo
mx.place(sfx.whoosh(.45), 38.42, .32)                                    # círculo da virada
mx.place(sfx.boom(), 38.8, .5)
for t0 in (47.0, 48.6, 50.8, 52.2):                                      # o convite se montando
    mx.place(sfx.whoosh(.3), t0, .15)
    mx.place(sfx.pop(900, 1500), t0 + .25, .26)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.2), 54.8, .32)
mx.place(sfx.tick(2400, .07), 58.3, .4)
mx.place(sfx.tick(800, .1), 60.9, .45)
mx.place(sfx.boom(), 64.1, .4)
for t0 in (70.9, 72.0, 73.2):
    mx.place(sfx.tick(1800, .07), t0, .3)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.6), 75.0, .35)
mx.place(sfx.plim(1320), 81.6, .4)
for i in range(19):
    mx.place(sfx.key(), 82.6 + i * .05, .14)
mx.place(sfx.pop(800, 1300), 85.2, .3)
mx.place(sfx.whoosh(.7)[::-1].copy(), 87.15, .3)

mx.render(sys.argv[3], sys.argv[2], ducks=[(0, .5, .4)])
print('ok', sys.argv[3])
