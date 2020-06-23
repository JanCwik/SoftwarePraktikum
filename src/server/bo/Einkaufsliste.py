from src.server.bo.NamedBO import NamedBO
import datetime


class Einkaufsliste(NamedBO):
    def __init__(self):
        super().__init__()
        self._änderungs_zeitpunkt = datetime.datetime.now()

    def eintrag_hinzufügen(self):
        pass

    def eintrag_löschen(self):
        pass

    def set_änderungs_zeitpunkt(self, erstellungs_zeitpunkt):
        self._änderungs_zeitpunkt = erstellungs_zeitpunkt

    def get_änderungs_zeitpunkt(self):
        return self._änderungs_zeitpunkt

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Einkaufsliste: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Eines Python dict() in einer Einkaufsleiste() umwandeln."""
        obj = Einkaufsliste()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj