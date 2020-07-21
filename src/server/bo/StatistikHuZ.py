from src.server.bo.Statistik import Statistik


class StatistikHuZ(Statistik):

    def __init__(self):
        super().__init__()
        self._startzeitpunkt = ""
        self._endzeitpunkt = ""
        self._zeitpunkt = ""
        self._Einzelhaendler_name = ""
        self._Einzelhaendler_id = 0

    def set_Einzelhaendler_name(self, Einzelhaendler_name):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_name = Einzelhaendler_name

    def get_Einzelhaendler_name(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_name

    def set_Einzelhaendler_id(self, Einzelhaendler_id):
        """Setzen der ID eines Einzelhaendlers"""
        self._Einzelhaendler_id = Einzelhaendler_id

    def get_Einzelhaendler_ide(self):
        """Auslesen der ID eines Einzelhaendlers"""
        return self._Einzelhaendler_id

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
