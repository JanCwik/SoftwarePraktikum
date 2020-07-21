from .bo.Statistik import Statistik
from .bo.StatistikHändler import StatistikHaendler
from .bo.StatistikZeitraum import StatistikZeitraum
from .bo.StatistikHuZ import StatistikHuZ
from .bo.Benutzer import Benutzer
from .db.StatistikMapper import StatistikMapper
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

    def top_artikel_by_zeitraum(self, benutzer, startzeitpunkt, endzeitpunkt):
        artikel = []
        instanzen = []
        alle = []
        result = []
        x = 0

        with StatistikMapper() as mapper:
            tupel = mapper.get_all_listeneintraege_by_Datum(benutzer)

        for i in tupel:
            zeitpunkt = i.get_zeitpunkt()
            #print(zeitpunkt)
            zeitpunkt = zeitpunkt.strftime("%Y-%m-%d")
            if zeitpunkt >= startzeitpunkt and zeitpunkt <= endzeitpunkt:
                alle.append(i.get_ArtikelID())
        #return instanzen

        a = collections.Counter(alle)

        for i in a:
            instanz = StatistikZeitraum()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))

            instanzen.append(instanz)

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

    def top_artikel_by_Einzelhaendler_zeitraum(self, benutzer, einzelhaendler, startzeitpunkt, endzeitpunkt):
        artikel = []
        instanzen = []
        alle = []
        result = []
        x = 0

        with StatistikMapper() as mapper:
            tupel = mapper.get_all_listeneintraege_by_Einzelhaendler_Datum(benutzer, einzelhaendler)

        for i in tupel:
            zeitpunkt = i.get_zeitpunkt()
            #print(zeitpunkt)
            zeitpunkt = zeitpunkt.strftime("%Y-%m-%d")
            if zeitpunkt >= startzeitpunkt and zeitpunkt <= endzeitpunkt:
                alle.append(i.get_ArtikelID())
        #return instanzen

        a = collections.Counter(alle)

        for i in a:
            instanz = StatistikZeitraum()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))

            instanzen.append(instanz)

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