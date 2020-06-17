from src.server.bo.NamedBO import NamedBO


class Einzelhaendler(NamedBO):
    def __init__(self):
        super().__init__()
        self._adresse = ""

    def set_adresse(self, adresse):
        self._adresse = adresse

    def get_adresse(self):
        return self._adresse

    def __str__(self):
        return "Einzelhaendler: {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._adresse, self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Einzelhaendler()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_adresse(dictionary["adresse"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj