from .Statistik import Statistik


class StatistikHaendler(Statistik):

    def __init__(self):
        super().__init__()
        self._Einzelhaendler_name = ""
        self._Einzelhaendler_id = 0

    def set_Einzelhaendler_name(self, einzelhaendler_name):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_name = einzelhaendler_name

    def get_Einzelhaendler_name(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_name

    def set_Einzelhaendler_id(self, einzelhaendler_id):
        """Setzen der ID eines Einzelhaendlers"""
        self._Einzelhaendler_id = einzelhaendler_id

    def get_Einzelhaendler_id(self):
        """Auslesen der ID eines Einzelhaendlers"""
        return self._Einzelhaendler_id
