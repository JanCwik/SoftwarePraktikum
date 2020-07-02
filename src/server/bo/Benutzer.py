from src.server.bo.NamedBO import NamedBO


class Benutzer(NamedBO):
    def __init__(self):
        super().__init__()
        self._email = ""
        self._google_id = 0

    def get_email(self):
        """Auslesen der E-Mail Adresse"""
        return self._email

    def set_email(self, value):
        """Setzen der E-Mail Adresse"""
        self._email = value

    def get_google_id(self):
        """Auslesen der externen Google ID)."""
        return self._google_id

    def set_google_id(self, value):
        """Setzen der externen Google ID."""
        self._google_id = value

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Benutzer: {}, {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._email, self.get_erstellungs_zeitpunkt(), self._google_id)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Benutzer() umwandeln."""
        obj = Benutzer()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_google_id(dictionary["google_id"])
        return obj