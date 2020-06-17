from src.server.bo.NamedBO import NamedBO


class Benutzer(NamedBO):
    def __init__(self):
        super().__init__()
        self._email = ""

    def get_email(self):
        return self._email

    def set_email(self, value):
        self._email = value

    def __str__(self):
        return "Benutzer: {}, {}, {}, {}".format(self.get_id(), self.get_name(), self._email, self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Benutzer()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_email(dictionary["email"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj