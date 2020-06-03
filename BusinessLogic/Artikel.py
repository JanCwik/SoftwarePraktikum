from abc import ABC
from BusinessLogic import NamedBO


class Artikel(NamedBO):
    def __init__(self):
        super().__init__()
        self._einheit = ""
        self._standardartikel = False

    def set_einheit(self, einheit):
        self._einheit = einheit

    def get_einheit(self):
        return self._einheit

    def set_standardartikel(self):
        self._standardartikel = True

    def get_standardartikel(self):
        return self._standardartikel