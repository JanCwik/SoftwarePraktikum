from src.server.bo.Statistik import Statistik


class StatistikHuZ(Statistik):

    def __init__(self):
        super().__init__()
        self._startzeitpunkt = ""
        self._endzeitpunkt = ""
        self._Einzelhaendler_name = ""
        self._Einzelhaendler_id = 0

    def set_Einzelhaendler_name(self, Einzelhaendler_name):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_name = Einzelhaendler_name

    def get_Einzelhaendler_name(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_name

    def set_Einzelhaendler_id(self, _Einzelhaendler_id):
        """Setzen des Namens eines Einzelhaendlers"""
        self._Einzelhaendler_id = _Einzelhaendler_id

    def get_Einzelhaendler_ide(self):
        """Auslesen des Namens eines Einzelhaendlers"""
        return self._Einzelhaendler_id

    def set_startzeitpunkt(self, _startzeitpunkt):
        """Setzen des Beginnzeitpunkts"""
        self._startzeitpunkt = _startzeitpunkt

    def get_startzeitpunkt(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._startzeitpunkt

    def set_endzeitpunkt(self, _endzeitpunkt):
        """Setzen des Beginnzeitpunkts"""
        self._endzeitpunkt = _endzeitpunkt

    def get_endzeitpunkt(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._endzeitpunkt

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in ein StatistikZeitraumBO umwandeln."""
        obj = StatistikHuZ()
        obj.set_startzeitpunkt(dictionary["startzeitpunkt"])
        obj.set_endzeitpunkt(dictionary["endzeitpunkt"])
        obj.set_Einzelhaendler_name(dictionary["Einzelhaendler_name"])

        return obj