"""Trilha, efeitos e locutor do Dia 3 (tempos no relógio original de dia3.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np
FICHA = [('atendente', 0.8), ('zona sul', 1.5), ('sim', 2.15), ('várias coisas', 2.6)]


def snip():
    """tesoura fechando: dois estalos metálicos"""
    d = 0.16
    t = sfx.tt(d)
    s = np.zeros(len(t))
    for t0, f in ((0.0, 3800), (0.05, 5200)):
        i = int(t0 * sfx.SR)
        n = len(t) - i
        s[i:] += (np.sin(2 * np.pi * f * t[:n]) * 0.5 + sfx.bandnoise(n / sfx.SR, 3000, 10000) * 0.6) * np.exp(-t[:n] * 70)
    return s


def tock(f=1150):
    """bolinha de pingue-pongue batendo"""
    d = 0.09
    t = sfx.tt(d)
    return (np.sin(2 * np.pi * f * t) * 0.8 + sfx.bandnoise(d, 1500, 6000) * 0.3) * np.exp(-t * 60)


def fade_down(d=1.1):
    """tom que cai: a conversa morrendo"""
    t = sfx.tt(d)
    f = 320 * np.exp(-t * 1.6) + 60
    return np.sin(2 * np.pi * np.cumsum(f) / sfx.SR) * np.exp(-t * 2.2) * np.clip(t / .03, 0, 1)


def scratch(d=0.25):
    """caneta riscando"""
    t = sfx.tt(d)
    return sfx.bandnoise(d, 1500, 7000) * (0.6 + 0.4 * np.sin(2 * np.pi * 38 * t)) * np.sin(np.pi * t / d)


mx = sfx.Mix(sys.argv[1])
rng = np.random.default_rng(5)

for t0, d, g in [(-4.5, 1.2, .22), (-0.5, .9, .3), (5.9, .9, .3), (12.6, .9, .26), (33.0, .9, .3), (40.8, .9, .3)]:
    mx.place(sfx.whoosh(d), t0, g, pan=-.3)
    mx.place(sfx.whoosh(d), t0 + .02, g, pan=.3)
# 0 · retomada
mx.place(sfx.whoosh(.35), -4.25, .2)
for k in range(4):
    mx.place(sfx.key(), -3.6 + k * .15, .1)
mx.place(sfx.plim(1250), -3.0, .32)
mx.place(sfx.boom(), -1.4, .4)
# 1 · ficha se preenchendo e carimbo
for txt, t0 in FICHA:
    for i in range(len(txt)):
        mx.place(sfx.key(), t0 + i * .055, .24, pan=rng.uniform(-.2, .2))
mx.place(sfx.whoosh(.25), 5.05, .3)
mx.place(sfx.boom(1.6, 70, 30), 5.3, .7)
mx.place(sfx.bandnoise(.08, 200, 3000) * np.exp(-sfx.tt(.08) * 40), 5.3, .5)
# 2 · perguntas e cortes
for t0 in (6.65, 7.65, 8.85, 9.95):
    mx.place(sfx.pop(), t0, .35)
for t0 in (8.1, 9.25, 10.35):
    mx.place(snip(), t0 - .02, .55, pan=.25)
    mx.place(sfx.whoosh(.55), t0 + .05, .14)
mx.place(fade_down(), 11.3, .32)
# 3 · reconstrução e mais fundo
for k, t0 in enumerate((13.2, 13.35, 13.5, 13.65)):
    mx.place(sfx.tick(1200 + 300 * k, .07), t0 + .4, .35)
mx.place(sfx.boom(), 13.9, .45)
mx.place(sfx.tick(2400, .06), 14.55, .35)
mx.place(sfx.pop(800, 1300), 14.8, .35)
mx.place(sfx.pop(), 19.95, .35)
for k in range(4):
    mx.place(sfx.key(), 21.3 + k * .18, .1)
mx.place(sfx.plim(1320), 22.0, .32)
# transição
mx.place(sfx.whoosh(.45), 24.4, .32)
mx.place(sfx.boom(), 24.8, .5)
# 4 · ping-pong
for i, t0 in enumerate((26.5, 28.0, 29.5, 30.5, 31.45, 31.95, 32.45)):
    mx.place(tock(1100 + 120 * (i % 2)), t0, .55, pan=(-.4, .4)[i % 2])
for t0 in (26.5, 28.0, 29.5):
    mx.place(sfx.pop(900, 1500), t0 + .05, .22)
mx.place(sfx.whoosh(.4), 32.55, .18)
# 5 · no encontro
bar = sfx.murmur(mx.span(33.3, 40.9), 9)
mx.place(bar * np.clip(np.arange(len(bar)) / sfx.SR / .6, 0, 1) * np.clip((len(bar) - np.arange(len(bar))) / sfx.SR / .4, 0, 1), 33.3, .15)
mx.place(sfx.pop(), 34.6, .35)
mx.place(sfx.pop(700, 1000), 36.2, .3)
mx.place(scratch(), 36.7, .3)
mx.place(sfx.plim(1400), 38.05, .35)
# 6 · missão
for t0 in (43.15, 44.25):
    mx.place(sfx.tick(1800, .08), t0, .3)
    mx.place(sfx.tick(2600, .06), t0 + .65, .35)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.6), 46.4, .4)
mx.place(sfx.pop(800, 1300), 47.4, .3)
mx.place(sfx.whoosh(.7)[::-1].copy(), 49.75, .3)

# a trilha some no começo e quase some quando a conversa "morre"
mx.render(sys.argv[3], sys.argv[2], ducks=[(-4.6, -4.1, 0), (11.4, 13.2, .12)])
print('ok', sys.argv[3])
