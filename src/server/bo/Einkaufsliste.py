from src.server.bo.NamedBO import NamedBO


class Einkaufsliste(NamedBO):
    def __init__(self):
        super().__init__()


    def __str__(self):
        return "Einkaufsliste: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt())

    @staticmethod
    def from_dict(dictionary=dict()):
        obj = Einkaufsliste()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        return obj