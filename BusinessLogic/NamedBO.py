from BusinessLogic import BusinessObject


class NamedBO(BusinessObject):
    def __init__(self):
        super().__init__()
        self._erstellungs_zeitpunkt = ""
        self._name = ""

    def set_erstellungs_zeitraum(self, erstellungs_zeitraum):
        self._erstellungs_zeitpunkt = erstellungs_zeitraum

    def get_erstellungs_zeitraum(self):
        return self._erstellungs_zeitpunkt

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name