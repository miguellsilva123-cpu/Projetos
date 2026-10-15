"""Áudio do reel "Desiste dela": a narração por cima de uma trilha baixa e discreta.

Uso: python3 trilha.py timeline.json narracao.wav saida.wav
"""
import os
import sys

sys.path.insert(0, os.path.join(os.path.dirname(os.path.abspath(__file__)), '..', 'serie'))
import sfx  # noqa: E402

mx = sfx.Mix(sys.argv[1])
mx.render(sys.argv[3], sys.argv[2], music_gain=.2, voice_gain=.66)
print('ok', sys.argv[3])
