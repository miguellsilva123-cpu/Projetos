"""Gera legendas.js: cada trecho do roteiro com o início e o fim da fala (tempo real).

Uso: python3 legendas.py   (lê timeline.json e legendas.json desta pasta)
"""
import json
import os

here = os.path.dirname(os.path.abspath(__file__))
tl = json.load(open(os.path.join(here, 'timeline.json'), encoding='utf-8'))
leg = json.load(open(os.path.join(here, 'legendas.json'), encoding='utf-8'))
ph, blocks = tl['phrases'], {b['id']: b for b in tl['blocks']}
assert len(ph) == len(leg)
segs = []
for i, (p, txt) in enumerate(zip(ph, leg)):
    nxt = ph[i + 1] if i + 1 < len(ph) else None
    if nxt and nxt['id'] == p['id']:
        end = nxt['start']
    else:
        b = blocks[p['id']]
        end = b['start'] + b['dur']
    segs.append({'text': txt, 'start': p['start'], 'end': round(end, 3)})
with open(os.path.join(here, 'legendas.js'), 'w', encoding='utf-8') as f:
    f.write('window.SEGS=' + json.dumps(segs, ensure_ascii=False) + ';\n')
print(len(segs), 'trechos;', tl['duration'], 's')
