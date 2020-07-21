from src.server.bo.Statistik import Statistik


class StatistikZeitraum(Statistik):

    def __init__(self):
        super().__init__()
        self._startzeitpunkt = ""
        self._endzeitpunkt = ""
        self._zeitpunkt = ""

    def set_startzeitpunkt(self, startzeitpunkt):
        """Setzen des Startzeitpunkts"""
        self._startzeitpunkt = startzeitpunkt

    def get_startzeitpunkt(self):
        """Auslesen des Startzeitpunkts"""
        return self._startzeitpunkt

    def set_endzeitpunkt(self, endzeitpunkt):
        """Setzen des Endzeitpunkts"""
        self._endzeitpunkt = endzeitpunkt

    def get_endzeitpunkt(self):
        """Auslesen des Endzeitpunkts"""
        return self._endzeitpunkt

    def set_zeitpunkt(self, zeitpunkt):
        """Setzen des Zeitpunkts"""
        self._zeitpunkt = zeitpunkt

    def get_zeitpunkt(self):
        """Auslesen des Zeitpunkts"""
        return self._zeitpunkt

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Artikel: {}, {}, {}, {}".format(self.get_ArtikelID(), self.get_ArtikelName(), self.get_anzahl(),
                                                self._zeitpunkt)
