"""Trilha e efeitos do reel "Desiste do foguinho" (tempos no relógio original de foguinho.html).

Música própria (clara e moderna, em ré maior) no lugar da trilha escura da série.

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

np = sfx.np
SR = sfx.SR
rng = np.random.default_rng(11)


def lp(x, fc):
    """passa-baixa suave no domínio da frequência (rápido para sinais longos)"""
    f = np.fft.rfft(x)
    fr = np.fft.rfftfreq(len(x), 1 / SR)
    f *= 1 / np.sqrt(1 + (fr / fc) ** 4)
    return np.fft.irfft(f, len(x))


def music(dur, bpm=104):
    """pulso claro: piano elétrico, arpejo, baixo macio e bateria leve"""
    n = int(dur * SR)
    beat = 60 / bpm
    bar = beat * 4
    out = np.zeros(n)
    side = np.ones(n)
    prog = [  # (baixo, acorde)
        (73.42, (146.83, 185.00, 220.00, 277.18, 329.63)),   # Dmaj9
        (61.74, (146.83, 185.00, 220.00, 277.18, 246.94)),   # Bm9
        (49.00, (146.83, 185.00, 220.00, 246.94, 293.66)),   # Gmaj9
        (55.00, (138.59, 164.81, 185.00, 246.94, 329.63)),   # A6/9
    ]

    def add(sig, at, g=1.0):
        i = int(at * SR)
        if i >= n or i < 0:
            return
        seg = sig[: n - i]
        out[i:i + len(seg)] += seg * g

    def ep(f, d=1.6):
        t = sfx.tt(d)
        env = np.exp(-t * 3.2) * np.clip(t / .004, 0, 1)
        return (np.sin(2 * np.pi * f * t) + .35 * np.sin(4 * np.pi * f * t) * np.exp(-t * 6)
                + .5 * np.sin(2 * np.pi * f * 1.003 * t)) * env

    def mallet(f, d=.45):
        t = sfx.tt(d)
        return (np.sin(2 * np.pi * f * t) + .25 * np.sin(2 * np.pi * f * 4.0 * t) * np.exp(-t * 30)) * np.exp(-t * 9) * np.clip(t / .002, 0, 1)

    kick = sfx.boom(.45, 70, 44) * .9
    snap = sfx.bandnoise(.09, 1400, 7000) * np.exp(-sfx.tt(.09) * 45)
    hat = sfx.bandnoise(.035, 7000, 15000) * np.exp(-sfx.tt(.035) * 140)
    nbars = int(dur / bar) + 1
    for b in range(nbars):
        t0 = b * bar
        root, ch = prog[b % 4]
        # pad
        i0, i1 = int(t0 * SR), min(n, int((t0 + bar + .6) * SR))
        if i0 >= n:
            break
        tl = np.arange(i1 - i0) / SR
        env = np.clip(tl / .9, 0, 1) * np.clip((bar + .6 - tl) / .6, 0, 1)
        pad = sum(np.sin(2 * np.pi * f * tl) + .6 * np.sin(2 * np.pi * f * 1.004 * tl) for f in ch)
        out[i0:i1] += pad / len(ch) * env * .10
        # piano elétrico em síncope
        for k, g in ((0, .2), (1.5, .13), (2.5, .1)):
            for f in ch[1:]:
                add(ep(f), t0 + k * beat, g / 4)
        # arpejo em colcheias, uma oitava acima
        if b >= 1:
            arp = [ch[0] * 2, ch[2] * 2, ch[3] * 2, ch[4] * 2, ch[3] * 2, ch[2] * 2, ch[1] * 2, ch[2] * 2]
            for k, f in enumerate(arp):
                add(mallet(f), t0 + k * beat / 2, .07 if k % 2 == 0 else .045)
        # baixo
        for k in (0, 2, 3.5):
            d = .5
            t = sfx.tt(d)
            add(np.sin(2 * np.pi * root * t) * np.exp(-t * 3) * np.clip(t / .01, 0, 1), t0 + k * beat, .35)
        # bateria (entra no segundo compasso)
        if b >= 1:
            for k in range(4):
                tk = t0 + k * beat
                if k in (0, 2):
                    add(kick, tk, .5)
                    i = int(tk * SR)
                    L = int(.3 * SR)
                    if i < n:
                        seg = side[i:i + L]
                        side[i:i + L] = np.minimum(seg, .55 + .45 * np.linspace(0, 1, len(seg)) ** .7)
                if k in (1, 3):
                    add(snap, tk, .16)
                add(hat, tk + beat / 2, .05)
                add(hat, tk, .025)
    out *= side
    fade = np.ones(n)
    fl = int(1.6 * SR)
    fade[-fl:] = np.linspace(1, 0, fl) ** 1.5
    return lp(out, 7000) * fade


sfx.music = music
mx = sfx.Mix(sys.argv[1])


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


def soft_hit(d=1.0):
    """impacto macio e grave, sem distorção"""
    t = sfx.tt(d)
    f = 48 + 40 * np.exp(-t * 9)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 4.5) * np.clip(t / .004, 0, 1)


def chime(fs=(659.25, 987.77), d=1.4):
    t = sfx.tt(d)
    return sum(np.sin(2 * np.pi * f * t) * np.exp(-t * (3 + i)) for i, f in enumerate(fs)) / len(fs) * np.clip(t / .003, 0, 1)


def zip_(d=.4, lo=1500, hi=6000):
    """traço sendo desenhado"""
    t = sfx.tt(d)
    return sfx.bandnoise(d, lo, hi) * np.sin(np.pi * t / d) ** 2 * .6


def hiss(d=1.0):
    """foguinho apagando: chiado que morre"""
    t = sfx.tt(d)
    return sfx.bandnoise(d, 2500, 11000) * np.exp(-t * 3.5) * np.clip(t / .02, 0, 1)


def sweep_down(d=.9):
    t = sfx.tt(d)
    f = 700 * np.exp(-t * 2.2) + 120
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 2.4) * .5 + sfx.bandnoise(d, 300, 2500) * np.exp(-t * 4) * .2


def scan(d=1.1):
    t = sfx.tt(d)
    f = 800 + 900 * (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * .18 * np.clip(t / .05, 0, 1) * np.clip((d - t) / .1, 0, 1)


def wipe(t0):
    mx.place(sfx.whoosh(.7), t0 - .15, .32, pan=-.25)
    mx.place(sfx.whoosh(.7), t0 - .12, .32, pan=.25)
    mx.place(soft_hit(.8), t0 + .2, .35)
    mx.place(chime(), t0 + .05, .12)
    mx.place(sfx.whoosh(.55), t0 + .55, .2)


def push(t0):
    mx.place(sfx.whoosh(.5), t0, .24, pan=-.2)
    mx.place(sfx.whoosh(.5), t0 + .02, .24, pan=.2)


# 1 · a caixinha e o gancho
mx.place(sfx.pop(700, 1200), .1, .3)
mx.place(sfx.pop(900, 1500), .95, .26)                                   # a mensagem dele
mx.place(sfx.tick(2600, .04), 2.15, .2)                                   # Visto
mx.place(sfx.whoosh(.7), 3.75, .25)
mx.place(soft_hit(), 4.05, .45)
mx.place(sfx.pop(800, 1300), 5.0, .3)
mx.place(hiss(), 5.55, .14)
mx.place(sfx.tick(900, .08), 5.55, .3)
# transições
push(12.75)
push(30.75)
for w in (6.0, 17.45, 24.25, 38.7, 47.45):
    wipe(w)
# 2 · o celular acende e os foguinhos chegam
mx.place(sfx.tick(2200, .05), 7.5, .3)
NT, tt, g = [7.6], 8.65, .34
for i in range(19):
    NT.append(tt)
    tt += g
    g = max(.055, g * .83)
for i, t0 in enumerate(NT):
    gain = .42 if i < 6 else max(.12, .42 - .025 * i)
    mx.place(ding(1568 if i % 2 == 0 else 1480), t0, gain, pan=rng.uniform(-.35, .35))
    mx.place(buzz(), t0, .18)
for k in range(6):
    mx.place(sfx.whoosh(.25), 11.15 + k * .045, .08)
mx.place(sfx.tick(900, .08), 11.8, .35)
# 3 · nada pra responder
mx.place(sfx.pop(600, 1000), 13.25, .35)
mx.place(zip_(.45), 15.25, .12, pan=-.3)
mx.place(zip_(.45), 16.45, .12, pan=.3)
mx.place(sfx.pop(700, 1100), 15.45, .22)
mx.place(sfx.pop(800, 1200), 16.7, .22)
# 4 · o filtro
mx.place(scan(), 19.2, .35)
mx.place(sfx.pop(900, 1400), 20.95, .18)
mx.place(sfx.pop(900, 1400), 21.07, .18)
mx.place(sfx.tick(3000, .04), 22.62, .45)
mx.place(sfx.pop(1000, 1600), 22.64, .3)
for k in range(12):
    mx.place(sfx.tick(2600 + 90 * k, .03), 22.95 + (k % 5) * .07, .1, pan=rng.uniform(-.4, .4))
mx.place(sweep_down(), 23.75, .4)
# 5 · a iniciativa
mx.place(sfx.whoosh(.45), 25.3, .2)
for t0 in (26.6, 28.25):
    mx.place(sfx.pop(900, 1500), t0 + .05, .26)
mx.place(sfx.plim(1760), 29.8, .25)
# 6 · o exemplo
mx.place(sfx.whoosh(.5), 32.6, .22)
RT = 'Ele acabou com o sofá inteiro ou sobrou alguma almofada?'
for i in range(len(RT)):
    if i % 2 == 0:
        mx.place(sfx.key(), 33.1 + i * .041, .18, pan=rng.uniform(-.2, .2))
mx.place(sfx.plim(1760), 35.95, .3)
mx.place(sfx.whoosh(.55), 36.4, .26)
mx.place(ding(1320), 36.85, .32)
for k in range(3):
    mx.place(sfx.tick(1500, .03), 38.0 + k * .12, .08)
# 7 · quando parar
mx.place(sfx.pop(700, 1100), 39.5, .22)                                  # a mensagem boa, no vácuo
mx.place(sfx.tick(2600, .04), 40.3, .2)                                   # Visto há 2 dias
mx.place(sfx.whoosh(.45), 41.0, .2)
mx.place(soft_hit(), 41.75, .4)
mx.place(sfx.whoosh(.5), 41.15, .18)
mx.place(sfx.tick(2400, .06), 43.0, .32)
for t0 in (44.2, 45.2):
    mx.place(zip_(.25, 800, 3000), t0, .16)
    mx.place(sfx.tick(700, .08), t0 - .1, .25)
# 8 · desafio
mx.place(sfx.whoosh(.45), 48.6, .22)
mx.place(sfx.pop(800, 1300), 51.35, .26)
for i in range(13):
    mx.place(sfx.key(), 51.9 + i * .05, .13)
mx.place(sfx.pop(1000, 1600), 53.6, .3)
mx.place(sfx.plim(1760), 53.75, .22)
mx.place(sfx.pop(800, 1300), 53.0, .26)
mx.place(sfx.tick(2800, .04), 54.6, .4)                                   # toque no Seguir
mx.place(sfx.pop(1000, 1500), 54.72, .28)
mx.place(chime((587.33, 880.0, 1174.66), 2.4), 54.6, .14)

mx.render(sys.argv[3], sys.argv[2], ducks=[(8.6, 11.0, .5)], music_gain=.34)
print('ok', sys.argv[3])
