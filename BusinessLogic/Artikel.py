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

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "User: {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._einheit, self._standardartikel)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Umwandeln eines Python dict() in einen User()."""
        obj = Artikel()
        obj.set_id(dictionary["id"])  # eigentlich Teil von BusinessObject !
        obj.set_name(dictionary["name"])
        obj.set_einheit(dictionary["einheit"])
        obj.set_standardartikel(dictionary["standardartikel"])
        return obj