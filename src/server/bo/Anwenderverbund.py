from src.server.bo.NamedBO import NamedBO


class Anwenderverbund(NamedBO):
    def __init__(self):
        super().__init__()
        self._einkauflisten = []

    def benutzer_hinzufügen(self, Benutzer):
        """Dem Anwenderverbund einen Benutzer hinzufügen"""
        pass

    def benutzer_löschen(self):
        """Einen Benutzer aus dem Anwenderverbund löschen"""
        pass

    def einkaufliste_hinzufügen(self, einkaufsliste):
        """Einen Einkaufsliste hinzufügen
            BRAUCHEN WIR DIE METHODE????"""
        self._einkauflisten.append(einkaufsliste)

    def einkaufsliste_löschen(self):
        """BRAUCHEN WIR DIE METHODE????"""


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Anwenderverbund: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Anwenderverbund() umwandeln."""
        obj = Anwenderverbund()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj