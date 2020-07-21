from src.server.bo.Statistik import Statistik


class StatistikHaendler(Statistik):

    def __init__(self):
        super().__init__()
        self._Einzelhaendler_name = ""
        self._Einzelhaendler_id = 0

    def set_Einzelhaendler_name(self, _Einzelhaendler_name):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_name = _Einzelhaendler_name

    def get_Einzelhaendler_name(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_name

    def set_Einzelhaendler_id(self, _Einzelhaendler_id):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_id = _Einzelhaendler_id

    def get_Einzelhaendler_id(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_id

