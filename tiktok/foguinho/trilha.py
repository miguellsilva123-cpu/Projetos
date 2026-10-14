"""Trilha e efeitos do reel "Desiste do foguinho" (tempos no relógio original de foguinho.html).

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np
mx = sfx.Mix(sys.argv[1])
rng = np.random.default_rng(11)


def ding(f=1568.0):
    """notificação de celular: dois toques curtos e limpos"""
    d = .42
    t = sfx.tt(d)
    a = np.sin(2 * np.pi * f * t) * np.exp(-t * 16) * (t < .16)
    b = np.sin(2 * np.pi * f * 1.335 * t) * np.exp(-np.clip(t - .12, 0, None) * 11) * (t >= .12)
    return (a + .8 * b + .25 * np.sin(2 * np.pi * f * 2.0 * t) * np.exp(-t * 30)) * .7


def buzz(d=.18):
    """vibração do celular"""
    t = sfx.tt(d)
    return np.sin(2 * np.pi * 150 * t) * (0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 28 * t))) * np.sin(np.pi * t / d)


def riser(d=1.2):
    t = sfx.tt(d)
    return sfx.bandnoise(d, 800, 9000) * (t / d) ** 2.2


def scan(d=1.5):
    """laser do filtro"""
    t = sfx.tt(d)
    f = 900 + 500 * np.sin(2 * np.pi * 1.0 * t)
    return np.sin(2 * np.pi * np.cumsum(f) / sfx.SR) * .25 * np.clip(t / .05, 0, 1) * np.clip((d - t) / .1, 0, 1)


def glitch(d=.35):
    t = sfx.tt(d)
    return sfx.bandnoise(d, 300, 8000) * np.sign(np.sin(2 * np.pi * 23 * t)) * np.exp(-t * 4)


# abertura: a caixinha
mx.place(ding(1320), .1, .35)
mx.place(riser(1.0), 3.1, .25)
mx.place(sfx.boom(1.6, 72, 30), 4.15, .7)                                 # NÃO DESISTE DELA
mx.place(sfx.whoosh(.4), 5.05, .25)
mx.place(sfx.tick(700, .12), 5.55, .5)                                     # risco no foguinho
mx.place(sfx.bandnoise(1.2, 200, 1800) * np.exp(-sfx.tt(1.2) * 2.5), 5.65, .18)   # fumaça
# transições
for t0, kind in [(6.25, 'w'), (12.75, 'w'), (17.75, 'f'), (24.55, 'g'), (30.75, 'w'), (38.95, 'w'), (47.85, 'w')]:
    if kind == 'g':
        mx.place(glitch(), t0, .45)
    else:
        mx.place(sfx.whoosh(.45), t0, .3, pan=-.3)
        mx.place(sfx.whoosh(.45), t0 + .02, .3, pan=.3)
# 2 · o celular acende e as notificações chegam
mx.place(sfx.tick(2200, .05), 8.3, .3)                                     # tela acendendo
NT, tt, g = [], 8.65, .34
for i in range(20):
    NT.append(tt)
    tt += g
    g = max(.055, g * .83)
for i, t0 in enumerate(NT):
    gain = .42 if i < 6 else max(.12, .42 - .025 * i)
    mx.place(ding(1568 if i % 2 == 0 else 1480), t0, gain, pan=rng.uniform(-.35, .35))
    mx.place(buzz(), t0, .18)
for k in range(6):                                                         # ela limpa tudo
    mx.place(sfx.whoosh(.25), 11.15 + k * .05, .08)
mx.place(sfx.tick(900, .08), 11.75, .35)                                   # tela apaga
# 3 · nada pra responder
mx.place(sfx.pop(), 13.2, .35)
mx.place(sfx.pop(700, 1100), 15.3, .25)
mx.place(sfx.pop(800, 1200), 15.75, .25)
mx.place(sfx.tick(2400, .07), 16.4, .4)
# 4 · o filtro
mx.place(sfx.whoosh(.4), 18.1, .25)
mx.place(sfx.pop(500, 900), 18.8, .3)
mx.place(scan(), 19.3, .5)
for t0 in (20.95, 21.4, 21.85):
    mx.place(sfx.tick(1800, .06), t0, .35)
mx.place(sfx.boom(), 22.8, .55)
mx.place(glitch(.25), 22.85, .25)
# 5 · a fórmula
for t0 in (26.6, 28.3):
    mx.place(sfx.whoosh(.35), t0, .2)
    mx.place(sfx.pop(900, 1500), t0 + .1, .28)
mx.place(sfx.tick(2000, .06), 27.9, .3)
# 6 · o exemplo
RT = 'ele acabou com o sofá inteiro ou sobrou alguma almofada?'
for i in range(len(RT)):
    if i % 2 == 0:
        mx.place(sfx.key(), 33.05 + i * .042, .2, pan=rng.uniform(-.2, .2))
mx.place(sfx.whoosh(.3), 35.6, .2)
mx.place(scan(.45), 35.8, .4)
mx.place(sfx.plim(1500), 36.15, .4)
mx.place(ding(1320), 36.75, .35)
# 7 · quando parar
mx.place(sfx.boom(1.6, 72, 30), 41.25, .65)
mx.place(sfx.tick(2400, .07), 43.0, .35)
for t0 in (44.0, 44.8):
    mx.place(sfx.tick(800, .1), t0, .4)
# 8 · desafio
mx.place(sfx.whoosh(.4), 48.6, .25)
mx.place(sfx.pop(800, 1300), 51.4, .3)
for i in range(28):
    mx.place(sfx.key(), 51.9 + i * .05, .14)
mx.place(sfx.pop(800, 1300), 53.4, .3)
mx.place(sfx.swell((220.0, 277.18, 329.63, 440.0), 2.6), 53.2, .35)

mx.render(sys.argv[3], sys.argv[2], ducks=[(8.6, 11.0, .45)], music_gain=.3)
print('ok', sys.argv[3])
