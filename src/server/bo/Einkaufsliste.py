from src.server.bo.NamedBO import NamedBO
import datetime


class Einkaufsliste(NamedBO):
    def __init__(self):
        super().__init__()
        self._änderungs_zeitpunkt = datetime.datetime.now()
        self._anwenderverbund_id = None


    def set_änderungs_zeitpunkt(self, aenderungs_zeitpunkt):
        """Setzen des Änderungszeitpunkt"""
        self._änderungs_zeitpunkt = aenderungs_zeitpunkt

    def get_änderungs_zeitpunkt(self):
        """Auslesen des Änderungszeitpunkt"""
        return self._änderungs_zeitpunkt

    def set_anwenderId(self, anwenderID):
        """Setzen der anwenderverbund_id"""
        self._anwenderverbund_id = anwenderID

    def get_anwenderId(self):
        """Auslesen der anwenderverbund_id"""
        return self._anwenderverbund_id


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Einkaufsliste: {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt(), self._änderungs_zeitpunkt, self._anwenderverbund_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einer Einkaufsleiste() umwandeln."""
        obj = Einkaufsliste()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_änderungs_zeitpunkt(dictionary["aenderungs_zeitpunkt"])
        obj.set_anwenderId(dictionary["anwenderverbund_id"])
        return obj