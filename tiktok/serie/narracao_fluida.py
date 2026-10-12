"""Narração corrida: cada bloco é falado de uma vez (sem emendar pedaços), e o vídeo segue a fala.

Uso: python3 narracao_fluida.py "<comando de síntese com {text} {out}>" <pasta_saida>
Saídas: narracao.wav, timeline.json e timeline.js (window.WARP), como em narracao.py.

Dentro de cada bloco, as âncoras das frases são estimadas pela proporção de caracteres
e encaixadas na micropausa mais próxima da própria fala.
"""
import json
import os
import shlex
import subprocess
import sys

import numpy as np
import soundfile as sf

from narracao import SR, OLD_END, load48, finish

# (id, [(trecho, âncora no tempo original), ...], pausa depois do bloco)
BLOCKS = [
    ('b01', [('Todo homem já perdeu uma mulher que queria', 1.0), ('por causa de um vacilo.', 3.4)], 0.35),
    ('b02', [('Às vezes foi por mensagem:', 5.0), ('ela respondeu cá cá cá,', 6.9), ('e você não soube o que mandar.', 8.9)], 0.35),
    ('b03', [('Às vezes foi no encontro:', 11.1), ('o assunto acabou, e bateu o silêncio,', 13.6),
             ('e vocês ficaram um olhando pra cara do outro.', 15.6)], 0.35),
    ('b04', [('E quase nunca foi falta de assunto.', 18.1), ('A conversa virou entrevista:', 19.2),
             ('pergunta, resposta, pergunta, resposta.', 21.8)], 0.3),
    ('b05', [('Ninguém se apaixona numa entrevista.', 25.05)], 0.6),
    ('b06', [('Nos próximos cinco dias, eu vou te mostrar como puxar assunto sem travar,', 28.9),
             ('como fazer uma conversa puxar a outra,', 32.6), ('e o que fazer quando bate o silêncio.', 34.4)], 0.35),
    ('b07', [('Pra você nunca mais deixar o clima morrer.', 38.7)], 0.4),
    ('b08', [('E tudo começa aqui: entender por que você trava.', 41.8)], 0.6),
    ('b09', [('Você digita, apaga, digita de novo,', 46.2), ('e não manda nada.', 48.1)], 0.3),
    ('b10', [('Isso não é timidez.', 49.9), ('Você tá tentando achar a frase perfeita do nada.', 51.0)], 0.25),
    ('b11', [('Ao vivo é igual: você procura algo genial pra dizer,', 52.8), ('o momento passa, e ela vai embora.', 54.5)], 0.4),
    ('b12', [('Puxar assunto fica fácil quando você tem um motivo.', 58.6),
             ('E o motivo tá sempre na sua frente: o que ela postou, o que ela tá fazendo, o lugar onde vocês estão.', 61.0)], 0.4),
    ('b13', [('Antes de chamar, responde uma pergunta: o que eu reparei nela?', 68.4),
             ('Se tem resposta, manda. Se não tem, espera o próximo stóri.', 72.1)], 0.3),
    ('b14', [('Ao vivo, repara no momento: a música que ela colocou, o amigo que vocês têm em comum, o que tá acontecendo ao redor.', 75.9)], 0.4),
    ('b15', [('Missão de hoje: olha três stóris e anota o detalhe que você comentaria em cada um.', 80.8),
             ('Não precisa mandar ainda. Amanhã eu te mostro o que escrever.', 85.4)], 0.0),
]
LEAD_IN = 0.6
MIN_RATIO = 0.5   # entre blocos, a animação pode acelerar até 2x para acompanhar a fala
TAIL = 2.0


def onsets(clip, segs):
    """Instantes (s) em que cada trecho começa dentro do áudio do bloco."""
    hop = int(0.01 * SR)
    rms = np.sqrt(np.convolve(clip ** 2, np.ones(hop * 3) / (hop * 3), mode='same')[::hop] + 1e-12)
    db = 20 * np.log10(rms / (rms.max() + 1e-12))
    total_chars = sum(len(t) for t, _ in segs)
    dur = len(clip) / SR
    out, acc = [0.0], 0
    for t, _ in segs[:-1]:
        acc += len(t)
        est = acc / total_chars * dur
        lo, hi = int(max(0, est - 0.45) / 0.01), int(min(dur, est + 0.25) / 0.01)
        if hi <= lo:
            out.append(est)
            continue
        k = lo + int(np.argmin(db[lo:hi]))          # fundo da micropausa
        while k < len(db) - 1 and db[k] < -32:       # avança até a fala recomeçar
            k += 1
        out.append(max(out[-1] + 0.2, k * 0.01))
    return out


def main():
    cmd_tpl, outdir = sys.argv[1], sys.argv[2]
    os.makedirs(os.path.join(outdir, 'blocos'), exist_ok=True)
    clips, inner = [], []
    for bid, segs, _ in BLOCKS:
        text = ' '.join(t for t, _ in segs)
        raw = os.path.join(outdir, 'blocos', bid + '.wav')
        cmd = cmd_tpl.replace('{text}', shlex.quote(text)).replace('{out}', shlex.quote(raw))
        subprocess.run(cmd, shell=True, check=True, stdout=subprocess.DEVNULL)
        c = load48(raw)
        clips.append(c)
        inner.append(onsets(c, segs))

    warp, starts, phrases = [[0.0, 0.0]], [], []
    t = LEAD_IN
    for i, (bid, segs, pause) in enumerate(BLOCKS):
        starts.append(t)
        for (txt, old), off in zip(segs, inner[i]):
            warp.append([round(t + off, 3), old])
            phrases.append({'id': bid, 'text': txt, 'old': old, 'start': round(t + off, 3)})
        if i + 1 < len(BLOCKS):
            last_new, last_old = warp[-1]
            nxt_old = BLOCKS[i + 1][1][0][1]
            t = max(t + len(clips[i]) / SR + pause, last_new + MIN_RATIO * (nxt_old - last_old))
    end = starts[-1] + len(clips[-1]) / SR + TAIL
    warp.append([round(end, 3), OLD_END])
    for a, b in zip(warp, warp[1:]):
        assert b[0] > a[0] and b[1] > a[1], (a, b)

    voice = np.zeros(int(end * SR) + SR)
    for s, c in zip(starts, clips):
        i = int(s * SR)
        voice[i:i + len(c)] += c
    finish(voice[: int(end * SR)], outdir)
    info = {'duration': round(end, 3), 'warp': warp, 'phrases': phrases,
            'blocks': [{'id': b[0], 'start': round(s, 3), 'dur': round(len(c) / SR, 3)} for b, s, c in zip(BLOCKS, starts, clips)]}
    with open(os.path.join(outdir, 'timeline.json'), 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=1)
    with open(os.path.join(outdir, 'timeline.js'), 'w', encoding='utf-8') as f:
        f.write('window.WARP=' + json.dumps(warp) + ';\nwindow.DURATION=' + str(round(end, 3)) + ';\n')
    print(json.dumps({'duration': info['duration'], 'blocks': len(clips)}))


if __name__ == '__main__':
    main()
