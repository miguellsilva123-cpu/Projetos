"""Gera amp.js: envelope da voz a 100 quadros/s (0 a 1), para a boca do personagem.

Uso: python3 amplitude.py narracao.wav amp.js
"""
import json
import sys

import numpy as np
import soundfile as sf

x, sr = sf.read(sys.argv[1], always_2d=True)
x = x.mean(1)
hop = sr // 100
n = len(x) // hop
rms = np.array([np.sqrt(np.mean(x[i * hop:(i + 2) * hop] ** 2)) for i in range(n)])
ref = np.percentile(rms[rms > 1e-4], 95)
v = np.clip(rms / ref, 0, 1.2)
out, acc = [], 0.0
for s in v:  # ataque rápido, soltura um pouco mais lenta
    acc = acc + (s - acc) * (0.65 if s > acc else 0.35)
    out.append(round(float(acc), 3))
with open(sys.argv[2], 'w') as f:
    f.write('window.AMP=' + json.dumps(out, separators=(',', ':')) + ';\n')
print(len(out), 'amostras')
