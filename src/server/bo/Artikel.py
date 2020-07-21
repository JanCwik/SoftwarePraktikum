from src.server.bo.NamedBO import NamedBO


class Artikel(NamedBO):
    def __init__(self):
        super().__init__()
        self._einheit = ""
        self._standardartikel = False
        self._benutzer_id = 0

    def set_benutzer_id(self, benutzer_id):
        """Setzen der benutzer_id"""
        self._benutzer_id = benutzer_id

    def get_benutzer_id(self):
        """Auslesen der benutzer_id"""
        return self._benutzer_id

    def set_einheit(self, einheit):
        """Setzen der Einheit"""
        self._einheit = einheit

    def get_einheit(self):
        """Auslesen der Einheit"""
        return self._einheit

    def set_standardartikel(self, wert):
        """Setzen des Standartartikel"""
        self._standardartikel = wert

    def get_standardartikel(self):
        """Auslesen des Standartartikel"""
        return self._standardartikel

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Artikel: {}, {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._einheit,
                                                        self._standardartikel, self.get_erstellungs_zeitpunkt(),
                                                        self._benutzer_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Artikel() umwandeln."""
        obj = Artikel()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_einheit(dictionary["einheit"])
        obj.set_standardartikel(dictionary["standardartikel"])
        obj.set_benutzer_id(dictionary["benutzer_id"])
        return obj
