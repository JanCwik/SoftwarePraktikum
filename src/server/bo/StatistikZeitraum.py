from src.server.bo.Statistik import Statistik

class StatistikZeitraum(Statistik):

    def __init__(self):
        super().__init__()
        self._von=""
        self._bis=""