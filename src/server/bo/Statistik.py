class Statistik():

    def __init__(self):
        _gesamtzahl = 0
        _ArtikelID = 0


    def set_gesamtzahl(self, gesamtzahl):
        """Setzen der Anzahl"""
        self._gesamtzahl = gesamtzahl

    def get_gesamtzahl(self):
        """Auslesen der Anzahl"""
        return self._gesamtzahl

    def set_ArtikelID(self, ArtikelID):
        """Setzen der Anzahl"""
        self._ArtikelID = ArtikelID

    def get_ArtikelID(self):
        """Auslesen der Anzahl"""
        return self._ArtikelID

    def filter_zeitraum(self, anfangszeitpunkt, endzeitpunkt):
        pass

    def filter_einzelhändler(self, Einzelhändler):
        pass

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Artikel: {}, {},".format(self.get_ArtikelID(), self.get_gesamtzahl())