"""Narração do reel da caixinha — "Ela sempre fala 'bora marcar', mas nunca marca".

Mesma estrutura do reel de referência (gancho, outro lado da tela, princípio, virada, quadro maior),
com tema e texto próprios.
Uso: python3 narracao.py "<comando de síntese com {text} {out}>" <pasta_saida>
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
from narracao_fluida import build  # noqa: E402

OLD_END = 88.0

BLOCKS = [
    # 1 · gancho
    ('b01', [('Ela sempre fala: bora marcar! Mas nunca marca. Insisto ou desisto?', 0.4)], 0.5),
    ('b02', [('Para de insistir, cara.', 4.2), ('E aproveita e para de convidar desse jeito.', 5.4),
             ('Porque assim, não vai sair nunca.', 7.2)], 0.6),
    # 2 · o outro lado da tela
    ('b03', [('Deixa eu te mostrar o outro lado da tela.', 9.0),
             ('Essa semana ela ouviu bora marcar de três caras diferentes.', 10.8),
             ('A gente tem que se ver. Bora tomar algo qualquer dia.', 13.4), ('É tudo igual.', 16.0)], 0.5),
    ('b04', [('Pensa comigo: por que ela sairia com você, se o seu convite é igualzinho ao de todo mundo?', 17.6)], 0.7),
    # 3 · o princípio
    ('b05', [('Bora marcar algum dia é convite de quem não pensou nem dez segundos.', 22.4),
             ('Não tem dia. Não tem lugar. Não tem plano.', 25.2)], 0.4),
    ('b06', [('É você querendo que ela organize um encontro que nem você organizou.', 28.4),
             ('E ela não tem obrigação nenhuma de transformar o seu algum dia numa data.', 31.6)], 0.4),
    ('b07', [('Ela entende na hora: esse convite serviria pra qualquer uma.', 35.4)], 0.8),
    # 4 · a virada
    ('b08', [('Agora vem a virada.', 39.2), ('Não é que ela não sai com ninguém.', 40.4),
             ('Ela sai com quem chega com o convite pronto: dia, lugar, e um motivo que tem a ver com ela.', 42.2)], 0.5),
    ('b09', [('Você falou que ama café coado.', 47.0), ('Tem um lugar perto do seu trampo que é absurdo.', 48.6),
             ('Quinta, sete da noite?', 50.8), ('E se não der, me fala um dia bom pra você.', 52.2)], 0.5),
    ('b10', [('Um convite assim vale mais que cem bora marcar.', 55.0)], 0.6),
    ('b11', [('Se ela topa, ou sugere outro dia: tem interesse.', 57.8),
             ('Se ela foge de um convite concreto e não propõe nada: essa é a resposta.', 60.4),
             ('Você não insiste, e nem some com raiva.', 64.0)], 0.7),
    # 5 · o quadro maior
    ('b12', [('E o principal: o convite é só a porta.', 67.2),
             ('Quem segura o encontro é a sua vida:', 69.2),
             ('os lugares que você conhece, o que você gosta de fazer, a conversa que você tem.', 70.8)], 0.5),
    ('b13', [('Constrói isso, e chamar pra sair vira detalhe.', 75.2),
             ('Tenha uma vida que dá vontade de fazer parte, e convida ela pra um pedaço dela.', 77.6)], 0.6),
    # CTA
    ('b14', [('Manda a sua pergunta nos comentários, que eu respondo no próximo vídeo.', 82.0)], 0.0),
]

if __name__ == '__main__':
    build(BLOCKS, OLD_END, sys.argv[1], sys.argv[2])
