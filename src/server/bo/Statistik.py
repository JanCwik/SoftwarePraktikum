class Statistik():

    def __init__(self):
        self._gesamtzahl = 0
        self._ArtikelID = 0
        self._EinzelhaendlerID = 0

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

    def set_EinzelhaendlerID(self, EinzelhaendlerID):
        """Setzen der Anzahl"""
        self._EinzelhaendlerID = EinzelhaendlerID

    def get_EinzelhaendlerID(self):
        """Auslesen der Anzahl"""
        return self._EinzelhaendlerID

    def filter_zeitraum(self, anfangszeitpunkt, endzeitpunkt):
        pass

    def filter_einzelhändler(self, Einzelhändler):
        pass

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        if self._ArtikelID != 0:
            return "Artikel: {}, {}".format(self._ArtikelID, self._gesamtzahl)
        else:
            return "Einzelhändler: {}, {}".format(self._EinzelhaendlerID, self._gesamtzahl)