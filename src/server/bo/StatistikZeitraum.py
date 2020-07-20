from src.server.bo.Statistik import Statistik


class StatistikZeitraum(Statistik):

    def __init__(self):
        super().__init__()
        self._startzeitpunkt = ""
        self._endzeitpunkt = ""

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
        obj = StatistikZeitraum()
        obj.set_startzeitpunkt(dictionary["startzeitpunkt"])
        obj.set_endzeitpunkt(dictionary["endzeitpunkt"])

        return obj