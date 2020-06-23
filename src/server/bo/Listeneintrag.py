from src.server.bo.BusinessObject import BusinessObject


class Listeneintrag(BusinessObject):
    def __init__(self):
        super().__init__()


    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Listeneintrag: {}, {}, {}".format(self.get_id())

    @staticmethod
    def from_dict(dictionary=dict()):
        """Eines Python dict() in einen Listeneintrag() umwandeln."""
        obj = Listeneintrag()
        obj.set_id(dictionary["id"])
        return obj