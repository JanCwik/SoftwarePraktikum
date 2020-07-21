class Statistik():

    def __init__(self):
        self._GesamtAnzahl = 0
        self._ArtikelID = 0
        self._ArtikelName =""

    def set_ArtikelName(self, artikelname):
        """Setzen der Anzahl"""
        self._ArtikelName = artikelname

    def get_ArtikelName(self):
        """Auslesen der Anzahl"""
        return self._ArtikelName

    def set_GesamtAnzahl(self, anzahl):
        """Setzen der Anzahl"""
        self._anzahl = anzahl

    def get_GesamtAnzahl(self):
        """Auslesen der Anzahl"""
        return self._GesamtAnzahl

    def set_ArtikelID(self, ArtikelID):
        """Setzen der Anzahl"""
        self._ArtikelID = ArtikelID

    def get_ArtikelID(self):
        """Auslesen der Anzahl"""
        return self._ArtikelID



    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        if self._ArtikelID != 0:
            return "Artikel: {}, {}, {}".format(self._ArtikelID, self._anzahl, self._ArtikelName)
        else:
            return "Einzelhändler: {}, {}".format(self._EinzelhaendlerID, self._anzahl)

