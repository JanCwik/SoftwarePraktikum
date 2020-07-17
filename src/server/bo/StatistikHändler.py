from server.bo.Statistik import Statistik


class StatistikHaendler(Statistik):

    def __init__(self):
        super().__init__()
        self._Einzelhaendler_name = ""

    def set_Einzelhaendler_name(self, Einzelhaendler_name):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_name = Einzelhaendler_name

    def get_Einzelhaendler_name(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_name
