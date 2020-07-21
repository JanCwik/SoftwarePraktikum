from .NamedBO import NamedBO


class Einzelhaendler(NamedBO):
    def __init__(self):
        super().__init__()
        self._benutzer_id = 0

    def set_benutzer_id(self, benutzer_id):
        """Setzen der benutzer_id"""
        self._benutzer_id = benutzer_id

    def get_benutzer_id(self):
        """Auslesen der benutzer_id"""
        return self._benutzer_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Einzelhaendler: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt(), self.get_benutzer_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Einzelhaendler() umwandeln."""
        obj = Einzelhaendler()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_benutzer_id(dictionary["benutzer_id"])
        return obj