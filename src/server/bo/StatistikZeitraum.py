from src.server.bo.Statistik import Statistik

class StatistikZeitraum(Statistik):

    def __init__(self):
        super().__init__()
        self._von = ""
        self._bis = ""

    def set_von(self, von):
        """Setzen des Beginnzeitpunkts"""
        self._von = von

    def get_von(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._von

    def set_bis(self, bis):
        """Setzen des Beginnzeitpunkts"""
        self._bis = bis

    def get_bis(self):
        """Auslesen des Beginnzeitpunkts"""
        return self._bis
