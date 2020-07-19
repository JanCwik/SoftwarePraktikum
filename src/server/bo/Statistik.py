class Statistik():

    def __init__(self):
        self._anzahl = 0
        self._ArtikelID = 0
        self._EinzelhaendlerID = 0
        self._ArtikelName =""

    def set_ArtikelName(self, artikelname):
        """Setzen der Anzahl"""
        self._ArtikelName = artikelname

    def get_ArtikelName(self):
        """Auslesen der Anzahl"""
        return self._ArtikelName

    def set_anzahl(self, anzahl):
        """Setzen der Anzahl"""
        self._anzahl = anzahl

    def get_anzahl(self):
        """Auslesen der Anzahl"""
        return self._anzahl

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
            return "Artikel: {}, {}, {}".format(self._ArtikelID, self._anzahl, self._ArtikelName)
        else:
            return "Einzelhändler: {}, {}".format(self._EinzelhaendlerID, self._anzahl)