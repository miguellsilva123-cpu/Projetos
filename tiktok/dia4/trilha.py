"""Trilha, efeitos e locutor do Dia 4 (tempos no relógio original de dia4.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np


def cool(d=0.9):
    """o interesse dela esfriando: tom que desce"""
    t = sfx.tt(d)
    f = 520 * np.exp(-t * 2.2) + 140
    return np.sin(2 * np.pi * np.cumsum(f) / sfx.SR) * np.exp(-t * 3.0) * np.clip(t / .02, 0, 1)


mx = sfx.Mix(sys.argv[1])
rng = np.random.default_rng(4)

for t0, d, g in [(-1.5, 1.0, .22), (6.0, .9, .3), (13.05, .9, .3), (20.05, .9, .3), (34.0, .9, .3), (40.6, .9, .3)]:
    mx.place(sfx.whoosh(d), t0, g, pan=-.3)
    mx.place(sfx.whoosh(d), t0 + .02, g, pan=.3)
# 0 · a conversa esfriando
for t0, f in [(.25, 1250), (.8, 1200), (2.35, 1050)]:
    mx.place(sfx.plim(f), t0, .26)
for t0 in (1.3, 3.15):
    mx.place(sfx.whoosh(.3), t0, .14)
mx.place(sfx.tick(2400, .07), 3.45, .4)
mx.place(cool(1.2), 3.5, .3)
mx.place(sfx.boom(), -0.75, .5)                                          # título do gancho
# mensagens dos vacilos (plim = ela, whoosh curto = ele enviando)
for t0 in (6.95, 8.05, 13.95):
    mx.place(sfx.plim(1300), t0, .24)
for t0 in (7.5, 8.65, 14.55, 15.35, 21.0, 21.5, 22.0, 22.5):
    mx.place(sfx.whoosh(.3), t0, .16)
    mx.place(sfx.pop(), t0 + .05, .2)
mx.place(sfx.tick(1800, .07), 23.0, .35)
# pensamento dela e o medidor esfriando em cada vacilo
for tm, tt in [(9.0, 10.2), (15.8, 16.6), (23.2, 24.0), (30.6, 31.8), (36.5, 37.2)]:
    mx.place(cool(), tm, .26)
    mx.place(sfx.pop(700, 1100), tt, .3)
# transição para o encontro
mx.place(sfx.whoosh(.4), 26.82, .32)
mx.place(sfx.boom(), 27.2, .5)
bar = sfx.murmur(mx.span(27.3, 34.0), 11)
mx.place(bar * np.clip(np.arange(len(bar)) / sfx.SR / .6, 0, 1) * np.clip((len(bar) - np.arange(len(bar))) / sfx.SR / .4, 0, 1), 27.3, .13)
for t0 in (28.1, 28.55, 29.0, 29.45):
    mx.place(sfx.pop(900, 1400), t0, .26, pan=.3)
for k in range(4):
    mx.place(sfx.tick(3000, .03), 29.8 + k * .25, .2)                     # ponteiro do relógio
# 5 · ela falando, notificação, frase cortada
for i in range(int((36.15 - 34.65) / .032)):
    if i % 2 == 0:
        mx.place(sfx.key(), 34.65 + i * .032, .12, pan=rng.uniform(-.2, .2))
mx.place(sfx.plim(1500), 35.85, .4)
for k in range(3):
    mx.place(sfx.bandnoise(.09, 120, 400) * np.exp(-sfx.tt(.09) * 30), 35.88 + k * .14, .35)   # vibração na mesa
# 6 · fechamento
for k in range(5):
    mx.place(sfx.tick(1600 + 120 * k, .07), 41.2 + k * .25, .3)
mx.place(sfx.tick(2600, .06), 47.4, .4)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.6), 49.4, .4)
mx.place(sfx.pop(800, 1300), 51.0, .3)
mx.place(sfx.whoosh(.7)[::-1].copy(), 53.15, .3)

mx.render(sys.argv[3], sys.argv[2], ducks=[(-1.6, -1.0, 0)])
print('ok', sys.argv[3])
