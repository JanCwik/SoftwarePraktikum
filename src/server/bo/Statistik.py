from src.server.bo.BusinessObject import BusinessObject


class Statistik(BusinessObject):

    def __init__(self):
        super().__init__()
        self._häufige_artikel = []
        self._nach_einzelhaendler = ""
        self._nach_zeitraum = ""

    def set_häufige_artikel(self, häufige_artikel):
        """Setzen der häufig gekauften Artikeln"""
        self._häufige_artikel = häufige_artikel

    def get_häufige_artikel(self):
        """Auslesen der häufig gekauften Artikeln"""
        return self._häufige_artikel

    def set_nach_einzelhändler(self, nach_einzelhaendler):
        """Setzen des Einzelhändlers"""
        self._nach_einzelhaendler = nach_einzelhaendler

    def get_nach_einzelhaendler(self):
        """Auslesen des Einzelhändlers"""
        return self._nach_einzelhaendler

    def set_nach_zeitraum(self, nach_zeitraum):
        """Setzen des Zeitraums"""
        self._nach_zeitraum = nach_zeitraum

    def get_nach_zeitraum(self):
        """Auslesen des Zeitraums"""
        return self._nach_zeitraum
