from src.server.bo.NamedBO import NamedBO


class Artikel(NamedBO):
    def __init__(self):
        super().__init__()
        self._einheit = ""
        self._standardartikel = False

    def set_einheit(self, einheit):
        self._einheit = einheit

    def get_einheit(self):
        return self._einheit

    def set_standardartikel(self, wert):
        self._standardartikel = wert

    def get_standardartikel(self):
        return self._standardartikel

    def __str__(self):
        return "Artikel: {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._einheit, self._standardartikel, self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Artikel()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_einheit(dictionary["einheit"])
        obj.set_standardartikel(dictionary["standardartikel"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj

