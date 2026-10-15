"""Narração do reel "Desiste dela": o roteiro do reel de referência (mesma ordem, mesmos
argumentos e exemplos), dito com outras palavras e com a nossa voz.

Os trechos entre *asteriscos* aparecem em vermelho e negrito na tela; a fala ignora os asteriscos.

Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
"""
import json
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import narracao_fluida  # noqa: E402

narracao_fluida.LEAD_IN = 0.3

# (id, [trechos de legenda], pausa depois do bloco)
ROTEIRO = [
    ('b01', ['Eu mando foguinho no direct dela,', 'e ela não responde.', 'Devo desistir?'], .5),
    ('b02', ['Desiste dela, sim.', 'E aproveita pra desistir', 'de *ser assim*.', 'Porque desse jeito, *não vai rolar*.'], .5),
    ('b03', ['Pode me chamar de antiquado,', 'mas eu não entendo essa moda.', 'Uma mulher bonita e inteligente', '*não responde foguinho*.', 'Nem coraçãozinho.'], .45),
    ('b04', ['Olha o outro lado da tela.', 'Ela abre o direct e encontra', 'um monte de homem comum:', '*vinte foguinhos*,', '*cem corações*,', 'três *oi, gata*,', 'e um *de onde você é?*', 'É tudo *igual*.'], .45),
    ('b05', ['Me responde com sinceridade:', 'por que ela *escolheria você*,', 'se você mesmo se coloca', 'no meio desse monte?'], .5),
    ('b06', ['Foguinho é a mensagem de quem', 'não gastou nem *dez segundos*.', 'E não, isso aqui não é papo de curso.'], .4),
    ('b07', ['O ponto é um só:', '*zero esforço*,', 'esperando *atenção máxima*.', 'O que você tá acrescentando nessa conversa?', '*Nada*.'], .5),
    ('b08', ['Você não tá enxergando a mulher.', 'Mandou foguinho porque gostou', 'da *aparência* dela.', 'E o Instagram é dela:', 'ela posta o que quiser.', 'Ela *não tem obrigação nenhuma*', 'de te responder.'], .45),
    ('b09', ['Não teve esforço.', 'Não teve *iniciativa* da sua parte.', 'Você quer que ela faça tudo,', 'enquanto você só aperta um emoji.', '*Isso não existe*.'], .5),
    ('b10', ['Uma mulher inteligente percebe na hora:', 'esse cara mandou o mesmo foguinho', 'pra *vinte mulheres* hoje.'], .55),
    ('b11', ['E aqui tá a virada.', 'Não é que ela não responde ninguém.', 'Ela responde um *homem diferente*.'], .5),
    ('b12', ['O homem que comentou', 'uma *coisa específica*.', 'Que se esforçou, nem que seja um pouco.', 'Você entende o que é', 'se esforçar por alguém que você quer conhecer?'], .45),
    ('b13', ['Ele *olhou pra ela*.', 'Pra ela, *não pro corpo dela*.', 'E comentou algo que ela postou,', 'que mostrou que ele prestou atenção,', 'que pensou,', 'e que quis *conhecer ela melhor*.'], .45),
    ('b14', ['Uma frase com conteúdo,', 'sobre o que ela gosta,', 'vale mais que *mil foguinhos*.'], .55),
    ('b15', ['E outra coisa, sem papo de guru:', 'o direct é *apenas a porta*.', 'Quem sustenta é a sua *vida real*.'], .45),
    ('b16', ['Sua rotina.', 'Seu trabalho.', 'Seu corpo.', 'Seu caráter.', 'Sua fé.', 'Constrói isso primeiro,', 'que a mensagem *vira detalhe*.'], .45),
    ('b17', ['Transforma o seu Instagram', 'numa vitrine de *quem você é*.', 'Não numa máquina de mandar mensagenzinha', 'pra um monte de mulher.'], .45),
    ('b18', ['Mostra quem você é.', 'E mostra que você se interessa', 'por *quem ela é*.'], 0),
]


def blocks():
    """Converte o roteiro no formato do narracao_fluida (âncoras só para manter a ordem)."""
    out, k = [], 0
    for bid, segs, pause in ROTEIRO:
        lst = []
        for s in segs:
            k += 1
            lst.append((s.replace('*', ''), k * 0.01))
        out.append((bid, lst, pause))
    return out, (k + 1) * 0.01


if __name__ == '__main__':
    B, end = blocks()
    info = narracao_fluida.build(B, end, sys.argv[1], sys.argv[2])
    legendas = [s for _, segs, _ in ROTEIRO for s in segs]
    with open(os.path.join(sys.argv[2], 'legendas.json'), 'w', encoding='utf-8') as f:
        json.dump(legendas, f, ensure_ascii=False, indent=1)
