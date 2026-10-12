"""Trilha e efeitos sonoros sintetizados para o vídeo Dia 0 + Dia 1.

Uso: python3 audio.py saida.wav
Os tempos dos eventos seguem a linha do tempo de serie.html.
"""
import sys
import wave
import numpy as np

SR = 48000
DUR = 88.0
N = int(SR * DUR)
rng = np.random.default_rng(7)
L = np.zeros(N)
R = np.zeros(N)


def place(sig, t, gain=1.0, pan=0.0):
    i = int(t * SR)
    if i >= N:
        return
    sig = sig[: N - i]
    lg = np.cos((pan + 1) * np.pi / 4) * gain
    rg = np.sin((pan + 1) * np.pi / 4) * gain
    L[i:i + len(sig)] += sig * lg
    R[i:i + len(sig)] += sig * rg


def tt(d):
    return np.arange(int(d * SR)) / SR


def bandnoise(d, lo, hi):
    n = rng.standard_normal(int(d * SR))
    f = np.fft.rfft(n)
    fr = np.fft.rfftfreq(len(n), 1 / SR)
    f[(fr < lo) | (fr > hi)] = 0
    out = np.fft.irfft(f, len(n))
    return out / (np.abs(out).max() + 1e-9)


def onepole_lp(x, fc):
    a = np.exp(-2 * np.pi * fc / SR)
    y = np.empty_like(x)
    acc = 0.0
    for i, v in enumerate(x):
        acc = (1 - a) * v + a * acc
        y[i] = acc
    return y


# ---------- efeitos ----------
def whoosh(d=0.9):
    t = tt(d)
    n = bandnoise(d, 200, 7000)
    # varredura: mistura de grave para agudo ao longo do tempo
    lo = bandnoise(d, 150, 900)
    mix = n * (t / d) + lo * (1 - t / d)
    env = np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2
    return mix * env


def boom(d=1.4, f0=58, f1=34):
    t = tt(d)
    f = f1 + (f0 - f1) * np.exp(-t * 6)
    ph = 2 * np.pi * np.cumsum(f) / SR
    s = np.tanh(1.6 * np.sin(ph)) * np.exp(-t * 3.2)
    click = bandnoise(0.03, 80, 1500) * np.exp(-tt(0.03) * 120)
    s[: len(click)] += click * 0.4
    return s


def key():
    d = 0.035
    t = tt(d)
    return (bandnoise(d, 2500, 9000) * 0.6 + np.sin(2 * np.pi * 1900 * t) * 0.3) * np.exp(-t * 180)


def pop():
    d = 0.12
    t = tt(d)
    f = 900 + 700 * (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30)


def tick(f=3200, d=0.05):
    t = tt(d)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 90)


def clack():
    d = 0.06
    t = tt(d)
    return bandnoise(d, 900, 3500) * np.exp(-t * 70)


def toggle():
    d = 0.14
    t = tt(d)
    f = np.where(t < 0.06, 620, 410)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 22) * 0.7


def swell(freqs, d=3.0):
    t = tt(d)
    env = np.clip(t / 1.4, 0, 1) ** 2 * np.exp(-np.clip(t - 1.6, 0, None) * 1.6)
    s = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) for f in freqs)
    return s / len(freqs) * env


def murmur(d, seed):
    g = np.random.default_rng(seed)
    n = bandnoise(d, 180, 1400)
    t = tt(d)
    am = 0.55 + 0.45 * np.sin(2 * np.pi * (0.7 + 0.5 * g.random()) * t + g.random() * 6)
    am *= 0.6 + 0.4 * np.sin(2 * np.pi * 1.9 * t + 1.3)
    return n * am


# ---------- trilha (90 BPM, escura e minimalista) ----------
BEAT = 60 / 90
BAR = BEAT * 4
music = np.zeros(N)
chords = [(110.0, 130.81, 164.81), (87.31, 110.0, 130.81), (130.81, 164.81, 196.0), (98.0, 123.47, 146.83)]
t_all = np.arange(N) / SR
for b in range(int(DUR / BAR) + 1):
    c = chords[(b // 2) % 4]
    i0 = int(b * BAR * SR)
    i1 = min(N, int((b + 1) * BAR * SR) + int(0.4 * SR))
    if i0 >= N:
        break
    tl = np.arange(i1 - i0) / SR
    env = np.clip(tl / 0.8, 0, 1) * np.clip((BAR + 0.4 - tl) / 0.5, 0, 1)
    pad = sum(np.sin(2 * np.pi * f * tl) + 0.5 * np.sin(2 * np.pi * f * 1.004 * tl) + 0.15 * np.sin(4 * np.pi * f * tl) for f in c)
    music[i0:i1] += pad / 6 * env * 0.5
kick = boom(0.5, 75, 42) * 0.9
for k in range(int(DUR / BEAT)):
    tk = k * BEAT
    if tk < BAR * 2:
        continue
    if k % 2 == 0:
        i = int(tk * SR)
        seg = kick[: N - i]
        music[i:i + len(seg)] += seg * 0.55
    hat = bandnoise(0.04, 6000, 14000) * np.exp(-tt(0.04) * 120)
    i = int((tk + BEAT / 2) * SR)
    if i < N:
        seg = hat[: N - i]
        music[i:i + len(seg)] += seg * 0.06
music = onepole_lp(music, 2600)

# ducking: silêncio do "silêncio", respiros nas transições
duck = np.ones(N)
for a, b, lvl in [(14.55, 15.9, 0.0), (26.95, 27.6, 0.35), (45.25, 46.0, 0.35), (0, 0.6, 0.0)]:
    i0, i1 = int(a * SR), int(b * SR)
    duck[i0:i1] = np.minimum(duck[i0:i1], lvl)
duck = onepole_lp(duck, 6)
music *= duck
L += music * 0.32
R += music * 0.32

# ---------- eventos ----------
for t0, d, g in [(0.2, 1.3, .25), (4.7, .9, .3), (10.7, .9, .3), (17.7, .9, .3), (27.0, .7, .5), (37.7, .9, .3), (40.7, .9, .3),
                 (45.3, .7, .5), (48.7, .8, .3), (57.7, .8, .3), (67.7, .8, .3), (79.6, .9, .3)]:
    place(whoosh(d), t0, g, pan=-0.3)
    place(whoosh(d), t0 + 0.02, g, pan=0.3)
for t0, g in [(3.9, .9), (9.4, .45), (25.15, .95), (27.45, .7), (45.75, .7), (50.2, .8), (59.0, .45), (72.3, .45), (80.4, .5)]:
    place(boom(), t0, g)

def typing_times(segs):
    out = []
    for s, st, rate, _ in segs:
        out += [st + i * rate for i in range(len(s))]
    return out

for tk in typing_times([('e aí, tudo bem?', 6.3, .08, 't'), ('e aí, tudo bem?', 7.65, .04, 'd'), ('haha', 8.45, .08, 't'), ('haha', 8.95, .04, 'd'),
                        ('oi, tudo bem?', 46.25, .06, 't'), ('oi, tudo bem?', 47.15, .03, 'd'), ('oi linda', 47.75, .06, 't'), ('oi linda', 48.35, .03, 'd')]):
    place(key(), tk, 0.35 + 0.1 * rng.random(), pan=rng.uniform(-.2, .2))
place(pop(), 5.8, 0.5)
for tk in (14.8, 15.3, 15.8):
    place(tick(2600, .07), tk, 0.5)
for tk in (19.35, 20.55, 21.75, 22.95):
    place(clack(), tk, 0.55)
for tk in (20.65, 21.85, 23.05):
    place(toggle(), tk, 0.35)
for i, tk in enumerate((29.3, 31.1, 32.9, 34.7, 36.4)):
    place(tick(2200 + i * 260, .09), tk, 0.4)
place(swell((261.63, 329.63, 392.0, 587.33)), 38.0, 0.6)
for k in range(7):
    place(key(), 43.2 + k * 0.2, 0.18)
for tk in (84.0, 84.6, 85.2):
    place(tick(1800, .08), tk, 0.45)
place(swell((220.0, 277.18, 329.63, 440.0), 2.6), 86.6, 0.4)

# ambiências: bar (some de repente no "silêncio") e festa (some quando ela vai embora)
bar = murmur(3.6, 1)
bar[-int(0.02 * SR):] *= np.linspace(1, 0, int(0.02 * SR))
place(bar * np.clip(tt(3.6) / 0.6, 0, 1), 11.0, 0.22)
party_d = 8.0
party = murmur(party_d, 2)
tp = tt(party_d)
thump = np.zeros_like(tp)
for k in range(int(party_d / 0.5)):
    i = int(k * 0.5 * SR)
    seg = boom(0.3, 90, 50)[: len(tp) - i]
    thump[i:i + len(seg)] += seg
party = party + onepole_lp(thump, 300) * 0.8
fade = np.clip(tp / 0.6, 0, 1) * np.clip((party_d - tp) / 2.5, 0, 1)
place(party * fade, 49.0, 0.2)

# ---------- master ----------
mix = np.stack([L, R], axis=1)
mix = np.tanh(mix * 1.1)
mix /= np.abs(mix).max() + 1e-9
mix *= 0.89
pcm = (mix * 32767).astype(np.int16)
with wave.open(sys.argv[1], 'wb') as w:
    w.setnchannels(2)
    w.setsampwidth(2)
    w.setframerate(SR)
    w.writeframes(pcm.tobytes())
print('ok', sys.argv[1])
