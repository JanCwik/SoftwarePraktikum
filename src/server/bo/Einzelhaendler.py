from server.bo.NamedBO import NamedBO


class Einzelhaendler(NamedBO):
    def __init__(self):
        super().__init__()
        self._einzelhaendler_id = None

    def set_einzelhaendlerId(self, einzelhaendlerID):
        """Setzen der einzelhaendler_id"""
        self._einzelhaendler_id = einzelhaendlerID

    def get_einzelhaendlerId(self):
        """Auslesen der einzelhaendler_id"""
        return self._einzelhaendler_id

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Einzelhaendler: {}, {}, {}".format(self.get_id(), self.get_name(), self.get_erstellungs_zeitpunkt(), einzelhaendler_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Einzelhaendler() umwandeln."""
        obj = Einzelhaendler()
        obj.set_id(dictionary["id"])
        obj.set_name(dictionary["name"])
        obj.set_erstellungs_zeitpunkt(dictionary["erstellungs_zeitpunkt"])
        obj.set_einzelhaendlerId(dictionary["einzelhaendler_id"])
        return obj