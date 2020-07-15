
class StatistikHaendler():

    def __init__(self):
        self._gesamtzahl = 0
        self._Artikel_name = ""

    def set_gesamtzahl(self, gesamtzahl):
        """Setzen der Anzahl"""
        self._gesamtzahl = gesamtzahl

    def get_gesamtzahl(self):
        """Auslesen der Anzahl"""
        return self._gesamtzahl

    def set_Artikel_name(self, Artikel_name):
        """Setzen des Artikelnamens"""
        self._Artikel_name = Artikel_name

    def get_Artikel_name(self):
        """Auslesen des Artikelnamens"""
        return self._Artikel_name