from src.server.bo.NamedBO import NamedBO


class Anwenderverbund(NamedBO):
    def __init__(self):
        super().__init__()
        self._einkauflisten = []

    def benutzer_hinzufügen(self, Benutzer):
        """Kann laut Thies gelöscht werden, in den BO-Klassen werden nur getter und setter-Methoden benötigt"""
        pass

    def benutzer_löschen(self):
        """Kann laut Thies gelöscht werden, in den BO-Klassen werden nur getter und setter-Methoden benötigt"""
        pass

    def einkaufliste_hinzufügen(self, einkaufsliste):
        """Kann laut Thies gelöscht werden, in den BO-Klassen werden nur getter und setter-Methoden benötigt"""
        self._einkauflisten.append(einkaufsliste)

    def einkaufsliste_löschen(self):
        """Kann laut Thies gelöscht werden, in den BO-Klassen werden nur getter und setter-Methoden benötigt"""


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