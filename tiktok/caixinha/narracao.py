"""Narração do reel da caixinha — "Ela sempre fala 'bora marcar', mas nunca marca".

Segue a estrutura do reel de referência (gancho, o lado dela, o princípio, o que funciona, o quadro
maior), com tema e texto próprios.
Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import narracao_fluida  # noqa: E402

narracao_fluida.LEAD_IN = 0.25   # a pergunta começa já no primeiro quarto de segundo
OLD_END = 88.0

BLOCKS = [
    # 1 · gancho
    ('b01', [('Ela sempre fala: bora marcar sim! Mas nunca marca. Insisto ou desisto?', 0.4)], 0.15),
    ('b02', [('Nenhum dos dois.', 4.2), ('Para de repetir o convite, e muda o convite.', 5.2),
             ('Do jeito que tá, não sai nunca.', 7.3)], 0.6),
    # 2 · o lado dela
    ('b03', [('Agora olha do lado dela.', 9.0),
             ('Essa semana, três caras diferentes já mandaram bora marcar.', 10.6),
             ('A gente tem que se ver. Bora tomar algo qualquer dia.', 13.4), ('É tudo igual.', 16.0)], 0.5),
    ('b04', [('Pensa: o que no seu convite faria ela lembrar de você,', 17.6), ('e não dos outros dois?', 19.7)], 0.7),
    # 3 · o princípio
    ('b05', [('Bora marcar algum dia não é convite.', 22.4),
             ('É uma ideia solta. E ideia solta, ninguém precisa recusar.', 23.9),
             ('Não tem dia. Não tem lugar. Não tem plano.', 26.6)], 0.4),
    ('b06', [('Você joga a ideia, e espera que ela monte o encontro sozinha.', 29.6),
             ('E montar a sua agenda não é tarefa dela.', 32.6)], 0.4),
    ('b07', [('E fica claro pra ela:', 35.0), ('esse convite serviria pra qualquer uma.', 36.0)], 0.8),
    # 4 · o que funciona
    ('b08', [('Só que repara: ela sai, sim.', 39.2), ('Só não sai com convite vago.', 40.6),
             ('Ela topa quando o convite chega pronto:', 42.0), ('um motivo, um lugar e um dia.', 44.0)], 0.5),
    ('b09', [('Você falou que ama café coado.', 47.0), ('Tem um lugar perto do seu trampo que é absurdo.', 48.6),
             ('Quinta, sete da noite?', 50.8), ('E se não der, me fala um dia bom pra você.', 52.2)], 0.5),
    ('b10', [('Uma mensagem dessas resolve o que três meses de bora marcar não resolveram.', 55.0)], 0.8),
    ('b11', [('Se ela topa ou sugere outro dia: tem interesse.', 58.4),
             ('Se ela foge de um convite concreto e não propõe nada: essa é a resposta.', 61.0),
             ('Aí você não insiste, nem some com raiva. Só segue.', 64.6)], 0.8),
    # 5 · o quadro maior
    ('b12', [('E tem mais: convite bom não salva uma vida sem graça.', 68.2),
             ('Os lugares que você conhece, o que você faz no fim de semana, a conversa que você tem.', 71.0)], 0.5),
    ('b13', [('Cuida disso, e chamar pra sair vira detalhe.', 75.6),
             ('Tenha uma vida que dá vontade de dividir,', 77.8), ('e chama ela pra viver um pedaço disso com você.', 79.6)], 0.6),
    # CTA
    ('b14', [('Manda a sua pergunta nos comentários, que eu respondo no próximo vídeo.', 82.0)], 0.0),
]

if __name__ == '__main__':
    narracao_fluida.build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2])
