from src.server.bo.Statistik import Statistik
from src.server.bo.StatistikHändler import StatistikHaendler
from src.server.bo.StatistikPosition import StatistikPosition
from src.server.bo.StatistikZeitraum import StatistikZeitraum
from src.server.bo.Benutzer import Benutzer
from src.server.db.StatistikMapper import StatistikMapper
import collections
from datetime import datetime

class ReportGenerator(object):

    def top_artikel(self, benutzer):
        artikel = []
        instanzen = []
        x = 0
        with StatistikMapper() as mapper:
           tupel = mapper.get_all_listeneintraege_by_benutzer(benutzer)

           for i in tupel:
               for k in i:
                   artikel.append(k)

        a = collections.Counter(artikel)

        for i in a:
            instanz = Statistik()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))

            instanzen.append(instanz)

        result = []

        for i in range(len(instanzen)):
            if x < 5:
                highest = instanzen[0]
                for obj in instanzen:
                    if obj.get_anzahl() > highest.get_anzahl():
                        highest = obj

                result.append(highest)
                instanzen.remove(highest)
                x += 1
        return result

    def top_artikel_by_einzelhaendler(self, benutzer, einzelhaendler):
        artikel = []
        instanzen = []
        x = 0
        with StatistikMapper() as mapper:
           tupel = mapper.get_all_listeneintraege_by_Einzelhaendler(benutzer, einzelhaendler)

           for i in tupel:
               for k in i:
                   artikel.append(k)

        a = collections.Counter(artikel)

        for i in a:
            instanz = StatistikHaendler()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))

            instanzen.append(instanz)

        result = []

        for i in range(len(instanzen)):
            if x < 5:
                highest = instanzen[0]
                for obj in instanzen:
                    if obj.get_anzahl() > highest.get_anzahl():
                        highest = obj

                result.append(highest)
                instanzen.remove(highest)
                x += 1
        return result

