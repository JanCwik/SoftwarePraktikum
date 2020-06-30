from src.server.bo.NamedBO import NamedBO


class Artikel(NamedBO):
    def __init__(self):
        super().__init__()
        self.__einheit = ""
        self.__standardartikel = False

    def set_einheit(self, einheit):
        """Setzen der Einheit"""
        self.__einheit = einheit

    def get_einheit(self):
        """Auslesen der Einheit"""
        return self.__einheit

    def set_standardartikel(self, wert):
        """Setzen des Standartartikel"""
        self.__standardartikel = wert

    def get_standardartikel(self):
        """Auslesen des Standartartikel"""
        return self.__standardartikel

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Artikel: {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self.__einheit, self.__standardartikel, self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Artikel() umwandeln."""
        obj = Artikel()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_einheit(dictionary["einheit"])
        obj.set_standardartikel(dictionary["standardartikel"])
        return obj

