"""Gera a narração frase por frase e a linha do tempo que sincroniza o vídeo com a voz.

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
     python3 narracao.py --remix <pasta_saida>   (remonta o áudio sem mudar a linha do tempo)
Saídas na pasta: narracao.wav (48 kHz mono), timeline.json e timeline.js (window.WARP).

Cada frase tem uma âncora no tempo original da animação (serie.html). O vídeo é
esticado/comprimido entre âncoras para que cada cena entre junto com a frase dela.
"""
import json
import os
import shlex
import subprocess
import sys

import numpy as np
import soundfile as sf

SR = 48000
OLD_END = 88.0

# (id, texto falado, âncora no tempo original, pausa depois)
PHRASES = [
    ('p01', 'Todo homem já perdeu uma mulher que queria...', 1.0, 0.25),
    ('p02', 'por causa de um vacilo.', 3.3, 0.7),
    ('p03', 'Às vezes, foi por mensagem.', 5.0, 0.3),
    ('p04a', 'Ela respondeu: cá cá cá...', 6.9, 0.35),
    ('p04b', 'e você não soube o que mandar.', 8.9, 0.6),
    ('p05', 'Às vezes, foi no encontro.', 11.1, 0.3),
    ('p06', 'O assunto acabou... e bateu o silêncio.', 13.6, 0.9),
    ('p07', 'e vocês ficaram um olhando pra cara do outro.', 15.6, 0.6),
    ('p08', 'E quase nunca foi falta de assunto.', 18.1, 0.3),
    ('p09', 'A conversa virou entrevista.', 19.2, 0.4),
    ('p10', 'Pergunta, resposta. Pergunta, resposta.', 21.8, 0.6),
    ('p11', 'Ninguém se apaixona numa entrevista.', 25.05, 0.8),
    ('p12', 'Nos próximos cinco dias, eu vou te mostrar como puxar assunto sem travar,', 28.9, 0.25),
    ('p13', 'como fazer uma conversa puxar a outra,', 32.6, 0.25),
    ('p14', 'e o que fazer quando bate o silêncio.', 34.4, 0.6),
    ('p15', 'Pra você nunca mais deixar o clima morrer.', 38.7, 0.7),
    ('p16', 'E tudo começa aqui: entender por que você trava.', 41.8, 0.9),
    ('p17', 'Você digita, apaga, digita de novo...', 46.2, 0.3),
    ('p18', 'e não manda nada.', 48.1, 0.6),
    ('p19', 'Isso não é timidez.', 49.9, 0.4),
    ('p20', 'Você tá tentando achar a frase perfeita do nada.', 51.0, 0.4),
    ('p21a', 'Ao vivo, é igual: você procura algo genial pra dizer...', 52.8, 0.3),
    ('p21b', 'o momento passa... e ela vai embora.', 54.5, 0.7),
    ('p22', 'Puxar assunto fica fácil quando você tem um motivo.', 58.6, 0.35),
    ('p23', 'E o motivo está sempre na sua frente: o que ela postou, o que ela tá fazendo, o lugar onde vocês estão.', 61.0, 0.7),
    ('p24', 'Antes de chamar, responde uma pergunta: o que eu reparei nela?', 68.4, 0.45),
    ('p25', 'Se tem resposta, manda. Se não tem, espera o próximo stóri.', 72.1, 0.5),
    ('p26', 'Ao vivo, repara no momento: a música que ela colocou, o amigo que vocês têm em comum, o que tá acontecendo ao redor.', 75.9, 0.7),
    ('p27', 'Missão de hoje: olha três stóris e anota o detalhe que você comentaria em cada um.', 80.8, 0.45),
    ('p28', 'Não precisa mandar ainda. Amanhã, eu te mostro o que escrever.', 85.4, 0.0),
]
LEAD_IN = 0.9      # silêncio antes da primeira frase
MIN_RATIO = 0.7    # a animação nunca acelera mais que isso entre âncoras
TAIL = 2.2         # respiro depois da última frase


def synth(cmd_tpl, text, out):
    cmd = cmd_tpl.replace('{text}', shlex.quote(text)).replace('{out}', shlex.quote(out))
    subprocess.run(cmd, shell=True, check=True, stdout=subprocess.DEVNULL)


def load48(path):
    tmp = path + '.48k.wav'
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', path, '-ac', '1', '-ar', str(SR), tmp], check=True)
    x, _ = sf.read(tmp)
    # apara silêncio das pontas (limiar relativo)
    env = np.abs(x)
    thr = max(1e-4, env.max() * 0.02)
    idx = np.where(env > thr)[0]
    if len(idx):
        x = x[max(0, idx[0] - int(0.02 * SR)): idx[-1] + int(0.06 * SR)]
    return x


def remix(outdir):
    """Remonta narracao.wav a partir de frases/*.wav usando o timeline.json existente."""
    info = json.load(open(os.path.join(outdir, 'timeline.json'), encoding='utf-8'))
    voice = np.zeros(int(info['duration'] * SR) + SR)
    for ph in info['phrases']:
        c = load48(os.path.join(outdir, 'frases', ph['id'] + '.wav'))
        i = int(ph['start'] * SR)
        voice[i:i + len(c)] += c
    voice = voice[: int(info['duration'] * SR)]
    finish(voice, outdir)


def finish(voice, outdir):
    sf.write(os.path.join(outdir, 'narracao_bruta.wav'), voice, SR)
    # cadeia de voz: limpeza de grave, compressão suave, presença e loudness de narração
    subprocess.run(['ffmpeg', '-loglevel', 'error', '-y', '-i', os.path.join(outdir, 'narracao_bruta.wav'), '-af',
                    'highpass=f=70,acompressor=threshold=-20dB:ratio=3:attack=8:release=120:makeup=2,'
                    'equalizer=f=180:t=q:w=1.2:g=2,equalizer=f=3200:t=q:w=1.5:g=2.5,loudnorm=I=-16:TP=-1.5:LRA=8',
                    '-ar', str(SR), os.path.join(outdir, 'narracao.wav')], check=True)


def main():
    if sys.argv[1] == '--remix':
        remix(sys.argv[2])
        return
    cmd_tpl, outdir = sys.argv[1], sys.argv[2]
    os.makedirs(os.path.join(outdir, 'frases'), exist_ok=True)
    clips = []
    for pid, text, old, pause in PHRASES:
        raw = os.path.join(outdir, 'frases', pid + '.wav')
        synth(cmd_tpl, text, raw)
        clips.append(load48(raw))

    starts = []
    t = LEAD_IN
    for i, (pid, text, old, pause) in enumerate(PHRASES):
        starts.append(t)
        if i + 1 < len(PHRASES):
            old_gap = PHRASES[i + 1][2] - old
            t = max(t + len(clips[i]) / SR + pause, t + MIN_RATIO * old_gap)
    end = starts[-1] + len(clips[-1]) / SR + TAIL

    warp = [[0.0, 0.0]] + [[round(s, 3), old] for s, (_, _, old, _) in zip(starts, PHRASES)] + [[round(end, 3), OLD_END]]
    # a primeira âncora mapeia LEAD_IN -> 1.0s: mantém o início da animação proporcional
    voice = np.zeros(int(end * SR) + SR)
    for s, c in zip(starts, clips):
        i = int(s * SR)
        voice[i:i + len(c)] += c
    voice = voice[: int(end * SR)]
    finish(voice, outdir)
    info = {
        'duration': round(end, 3),
        'warp': warp,
        'phrases': [{'id': p[0], 'text': p[1], 'old': p[2], 'start': round(s, 3), 'dur': round(len(c) / SR, 3)}
                    for p, s, c in zip(PHRASES, starts, clips)],
    }
    with open(os.path.join(outdir, 'timeline.json'), 'w', encoding='utf-8') as f:
        json.dump(info, f, ensure_ascii=False, indent=1)
    with open(os.path.join(outdir, 'timeline.js'), 'w', encoding='utf-8') as f:
        f.write('window.WARP=' + json.dumps(warp) + ';\nwindow.DURATION=' + str(round(end, 3)) + ';\n')
    print(json.dumps({'duration': info['duration'], 'n': len(clips)}))


if __name__ == '__main__':
    main()
