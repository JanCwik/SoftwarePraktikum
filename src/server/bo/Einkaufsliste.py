from .NamedBO import NamedBO
import datetime


class Einkaufsliste(NamedBO):
    def __init__(self):
        super().__init__()
        self._aenderungs_zeitpunkt = datetime.datetime.now()
        self._anwenderverbund_id = None

    def set_aenderungs_zeitpunkt(self, aenderungs_zeitpunkt):
        """Setzen des Aenderungszeitpunkts"""
        self._aenderungs_zeitpunkt = aenderungs_zeitpunkt

    def get_aenderungs_zeitpunkt(self):
        """Auslesen des Aenderungszeitpunkts"""
        return self._aenderungs_zeitpunkt

    def set_anwenderId(self, anwender_id):
        """Setzen der Anwenderverbund_id"""
        self._anwenderverbund_id = anwender_id

    def get_anwenderId(self):
        """Auslesen der Anwenderverbund_id"""
        return self._anwenderverbund_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Einkaufsliste: {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(),
                                                          self.get_erstellungs_zeitpunkt(), self._aenderungs_zeitpunkt,
                                                          self._anwenderverbund_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in eine Einkaufsleiste() umwandeln."""
        obj = Einkaufsliste()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_anwenderId(dictionary["anwenderverbund_id"])
        return obj
