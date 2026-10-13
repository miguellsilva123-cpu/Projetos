"""Sons sintetizados da série (efeitos, trilha e mixagem com o locutor).

Uso como biblioteca: cada vídeo monta a lista de eventos no tempo original da animação
e chama mix(...) com a linha do tempo da narração (WARP), que leva tudo para o tempo final.
"""
import json
import wave

import numpy as np

SR = 48000
_rng = np.random.default_rng(7)


def tt(d):
    return np.arange(int(d * SR)) / SR


def bandnoise(d, lo, hi):
    n = _rng.standard_normal(int(d * SR))
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


def whoosh(d=0.9):
    t = tt(d)
    mix = bandnoise(d, 200, 7000) * (t / d) + bandnoise(d, 150, 900) * (1 - t / d)
    return mix * np.sin(np.pi * np.clip(t / d, 0, 1)) ** 2


def boom(d=1.4, f0=58, f1=34):
    t = tt(d)
    f = f1 + (f0 - f1) * np.exp(-t * 6)
    s = np.tanh(1.6 * np.sin(2 * np.pi * np.cumsum(f) / SR)) * np.exp(-t * 3.2)
    click = bandnoise(0.03, 80, 1500) * np.exp(-tt(0.03) * 120)
    s[: len(click)] += click * 0.4
    return s


def key():
    d = 0.035
    t = tt(d)
    return (bandnoise(d, 2500, 9000) * 0.6 + np.sin(2 * np.pi * 1900 * t) * 0.3) * np.exp(-t * 180)


def pop(f0=900, f1=1600):
    d = 0.12
    t = tt(d)
    f = f0 + (f1 - f0) * (t / d)
    return np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t * 30)


def plim(f=1320):
    """notificação curta de dois tons"""
    d = 0.32
    t = tt(d)
    a = np.sin(2 * np.pi * f * t) * np.exp(-t * 14) * (t < 0.11)
    b = np.sin(2 * np.pi * f * 1.5 * t) * np.exp(-np.clip(t - 0.09, 0, None) * 12) * (t >= 0.09)
    return (a + b) * 0.8


def tick(f=3200, d=0.05):
    t = tt(d)
    return np.sin(2 * np.pi * f * t) * np.exp(-t * 90)


def swell(freqs, d=3.0):
    t = tt(d)
    env = np.clip(t / 1.4, 0, 1) ** 2 * np.exp(-np.clip(t - 1.6, 0, None) * 1.6)
    s = sum(np.sin(2 * np.pi * f * t) + 0.3 * np.sin(4 * np.pi * f * t) for f in freqs)
    return s / len(freqs) * env


def murmur(d, seed):
    g = np.random.default_rng(seed)
    n = bandnoise(d, 180, 1400)
    t = tt(d)
    am = (0.55 + 0.45 * np.sin(2 * np.pi * (0.7 + 0.5 * g.random()) * t + g.random() * 6)) * (0.6 + 0.4 * np.sin(2 * np.pi * 1.9 * t + 1.3))
    return n * am


def rewind(d=0.9):
    """fita rebobinando: chiado agudo com modulação rápida que desce de tom"""
    t = tt(d)
    f = 1800 - 1300 * (t / d) + 220 * np.sin(2 * np.pi * 31 * t)
    tone = np.sign(np.sin(2 * np.pi * np.cumsum(f) / SR)) * 0.25
    chop = 0.6 + 0.4 * np.sign(np.sin(2 * np.pi * 14 * t))
    s = (tone + bandnoise(d, 2000, 9000) * 0.5) * chop
    return s * np.clip(t / 0.05, 0, 1) * np.clip((d - t) / 0.08, 0, 1)


def music(dur, bpm=90):
    """trilha escura e minimalista"""
    n = int(dur * SR)
    beat = 60 / bpm
    bar = beat * 4
    out = np.zeros(n)
    chords = [(110.0, 130.81, 164.81), (87.31, 110.0, 130.81), (130.81, 164.81, 196.0), (98.0, 123.47, 146.83)]
    for b in range(int(dur / bar) + 1):
        c = chords[(b // 2) % 4]
        i0 = int(b * bar * SR)
        if i0 >= n:
            break
        i1 = min(n, int((b + 1) * bar * SR) + int(0.4 * SR))
        tl = np.arange(i1 - i0) / SR
        env = np.clip(tl / 0.8, 0, 1) * np.clip((bar + 0.4 - tl) / 0.5, 0, 1)
        pad = sum(np.sin(2 * np.pi * f * tl) + 0.5 * np.sin(2 * np.pi * f * 1.004 * tl) + 0.15 * np.sin(4 * np.pi * f * tl) for f in c)
        out[i0:i1] += pad / 6 * env * 0.5
    kick = boom(0.5, 75, 42) * 0.9
    hat = bandnoise(0.04, 6000, 14000) * np.exp(-tt(0.04) * 120)
    for k in range(int(dur / beat)):
        tk = k * beat
        if tk < bar * 2:
            continue
        for sig, at, g in ((kick, tk, 0.55 if k % 2 == 0 else 0), (hat, tk + beat / 2, 0.06)):
            i = int(at * SR)
            if g and i < n:
                seg = sig[: n - i]
                out[i:i + len(seg)] += seg * g
    return onepole_lp(out, 2600)


class Mix:
    """Mixer estéreo: eventos no tempo original, convertidos pela dobra de tempo da narração."""

    def __init__(self, timeline_path):
        tl = json.load(open(timeline_path, encoding='utf-8'))
        self.warp, self.dur = tl['warp'], tl['duration']
        self.n = int(self.dur * SR)
        self.L, self.R = np.zeros(self.n), np.zeros(self.n)

    def nt(self, old):
        for (a0, b0), (a1, b1) in zip(self.warp, self.warp[1:]):
            if old <= b1:
                return a0 + (a1 - a0) * (old - b0) / (b1 - b0) if b1 > b0 else a0
        a, b = self.warp[-1]
        return a + (old - b)

    def place(self, sig, t_old, gain=1.0, pan=0.0):
        i = int(self.nt(t_old) * SR)
        if i >= self.n:
            return
        sig = sig[: self.n - i]
        self.L[i:i + len(sig)] += sig * np.cos((pan + 1) * np.pi / 4) * gain
        self.R[i:i + len(sig)] += sig * np.sin((pan + 1) * np.pi / 4) * gain

    def span(self, old_a, old_b):
        """duração no tempo final de um trecho do tempo original"""
        return self.nt(old_b) - self.nt(old_a)

    def render(self, out, voice_path, ducks=(), music_gain=0.32, voice_gain=0.62):
        m = music(self.dur)
        duck = np.ones(self.n)
        for a, b, lvl in ducks:
            i0, i1 = int(self.nt(a) * SR), int(self.nt(b) * SR)
            duck[i0:i1] = np.minimum(duck[i0:i1], lvl)
        m *= onepole_lp(duck, 6)
        import soundfile as sf
        voice, vsr = sf.read(voice_path)
        assert vsr == SR
        voice = np.pad(voice, (0, max(0, self.n - len(voice))))[: self.n]
        venv = onepole_lp(np.abs(voice), 8)
        venv /= venv.max() + 1e-9
        m *= onepole_lp(1 - 0.55 * np.clip(venv * 6, 0, 1), 3)
        L = self.L + m * music_gain + voice * voice_gain
        R = self.R + m * music_gain + voice * voice_gain
        mix = np.tanh(np.stack([L, R], axis=1) * 1.1)
        mix = mix / (np.abs(mix).max() + 1e-9) * 0.89
        with wave.open(out, 'wb') as w:
            w.setnchannels(2)
            w.setsampwidth(2)
            w.setframerate(SR)
            w.writeframes((mix * 32767).astype(np.int16).tobytes())
