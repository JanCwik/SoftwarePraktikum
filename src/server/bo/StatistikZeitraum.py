from src.server.bo.Statistik import Statistik


class StatistikZeitraum(Statistik):

    def __init__(self):
        super().__init__()
        self._startzeitpunkt = ""
        self._endzeitpunkt = ""
        self._zeitpunkt = ""

    def set_startzeitpunkt(self, _startzeitpunkt):
        """Setzen des Beginnzeitpunkts"""
        self._startzeitpunkt = _startzeitpunkt

    def get_startzeitpunkt(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._startzeitpunkt

    def set_endzeitpunkt(self, _endzeitpunkt):
        """Setzen des Beginnzeitpunkts"""
        self._endzeitpunkt = _endzeitpunkt

    def get_endzeitpunkt(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._endzeitpunkt

    def set_zeitpunkt(self, _zeitpunkt):
        """Setzen des Beginnzeitpunkts"""
        self._zeitpunkt = _zeitpunkt

    def get_zeitpunkt(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._zeitpunkt

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Artikel: {}, {}, {}, {}".format(self.get_ArtikelID(), self.get_ArtikelName(), self.get_anzahl(), self._zeitpunkt)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in ein StatistikZeitraumBO umwandeln."""
        obj = StatistikZeitraum()
        obj.set_startzeitpunkt(dictionary["startzeitpunkt"])
        obj.set_endzeitpunkt(dictionary["endzeitpunkt"])
        obj.set_zeitpunkt(dictionary["zeitpunkt"])
        obj.set_anzahl(dictionary["anzahl"])
        obj.set_ArtikelName(dictionary["artikelname"])

        return obj