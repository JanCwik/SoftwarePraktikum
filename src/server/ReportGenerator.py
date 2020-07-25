from server.bo.Statistik import Statistik
from server.bo.StatistikHaendler import StatistikHaendler
from server.bo.StatistikZeitraum import StatistikZeitraum
from server.bo.StatistikHuZ import StatistikHuZ
from server.db.ListeneintragMapper import ListeneintragMapper
import collections


class ReportGenerator(object):

    def top_artikel(self, benutzer):
        """ Methode um alle Artikel zu einem bestimmten Benutzer heraus zubekommen und dann die 5 Artikeln die die
        größte Anzahl haben zurückzugeben

        in Zeile 26 wird die Häufigkeit der Artikel gezählt und nach dem folgenden Schema in ein Dictionary gespeichert.
        z.B.  1 : 3   Artikel mit der ID 1 wurde 3 mal gekauft. Daraus werden StatistikBO Instanzen gebildet.
        Anschließend wird die Liste der Instanzen mit bubblesort sortiert und nur die 5 am häufigsten gekauften
        Artikel werden zurückgegeben
        """
        artikel = []
        instanzen = []
        with ListeneintragMapper() as mapper:
            tupel = mapper.get_all_listeneintraege_by_benutzer(benutzer)

            for i in tupel:
                for k in i:
                    artikel.append(k)

        dictionary = collections.Counter(artikel)

        for i in dictionary:
            instanz = Statistik()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(dictionary.get(i))

            instanzen.append(instanz)

        result = []

        if len(instanzen) != 0:               # Bubblesort
            n = len(instanzen)
            for passes_left in range(n - 1, 0, -1):
                for i in range(passes_left):
                    if instanzen[i].get_anzahl() < instanzen[i + 1].get_anzahl():
                        instanzen[i], instanzen[i + 1] = instanzen[i + 1], instanzen[i]


        for i in range(len(instanzen)):
            if i < 5:
                result.append(instanzen[i])             # nur die ersten 5 elemente
                i += 1

        return result



    def top_artikel_by_einzelhaendler(self, benutzer, einzelhaendler):
        """ Methode um alle Artikel zu einem bestimmten Benutzer und einem bestimmten Einzelhändler heraus zubekommen
            und dann die 5 Artikeln die die größte Anzahl haben zurückzugeben

           in Zeile 76 wird die Häufigkeit der Artikel gezählt und nach dem folgenden Schema in ein Dictionary gespeichert.
           z.B.  1 : 3   Artikel mit der ID 1 wurde 3 mal gekauft. Daraus werden StatistikBO Instanzen gebildet.
           Anschließend wird die Liste der Instanzen mit bubblesort sortiert und nur die 5 am häufigsten gekauften
           Artikel werden zurückgegeben
           """
        artikel = []
        instanzen = []
        with ListeneintragMapper() as mapper:
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

        if len(instanzen) != 0:  # Bubblesort
            n = len(instanzen)
            for passes_left in range(n - 1, 0, -1):
                for i in range(passes_left):
                    if instanzen[i].get_anzahl() < instanzen[i + 1].get_anzahl():
                        instanzen[i], instanzen[i + 1] = instanzen[i + 1], instanzen[i]

        for i in range(len(instanzen)):
            if i < 5:
                result.append(instanzen[i])                 #nur die ersten 5 elemente
                i += 1

        return result

    def top_artikel_by_zeitraum(self, benutzer, startzeitpunkt, endzeitpunkt):
        """  Methode um alle Artikel zu einem bestimmten Benutzer und einem bestimmten Zeitraum heraus zubekommen
            und dann die 5 Artikeln die die größte Anzahl haben zurückzugeben

           Zuerst werden die Listeneintraege herausgefiltert die in dem gegebenen Zeitraum abgehakt wurden.
           In Zeile 128 wird die Häufigkeit der Artikel gezählt und nach dem folgenden Schema in ein Dictionary gespeichert.
           z.B.  1 : 3   Artikel mit der ID 1 wurde 3 mal gekauft. Daraus werden StatistikBO Instanzen gebildet.
           Anschließend wird die Liste der Instanzen mit bubblesort sortiert und nur die 5 am häufigsten gekauften
           Artikel werden zurückgegeben """
        instanzen = []
        alle = []
        result = []

        with ListeneintragMapper() as mapper:
            tupel = mapper.get_all_listeneintraege_by_Datum(benutzer)

        for i in tupel:
            zeitpunkt = i.get_zeitpunkt()
            zeitpunkt = zeitpunkt.strftime("%Y-%m-%d")
            if startzeitpunkt <= zeitpunkt <= endzeitpunkt:
                alle.append(i.get_ArtikelID())

        a = collections.Counter(alle)

        for i in a:
            instanz = StatistikZeitraum()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))
            instanzen.append(instanz)

        if len(instanzen) != 0:                             # Bubblesort
            n = len(instanzen)
            for passes_left in range(n - 1, 0, -1):
                for i in range(passes_left):
                    if instanzen[i].get_anzahl() < instanzen[i + 1].get_anzahl():
                        instanzen[i], instanzen[i + 1] = instanzen[i + 1], instanzen[i]

        for i in range(len(instanzen)):
            if i < 5:
                result.append(instanzen[i])               # nur die ersten 5 elemente
                i += 1
        return result

    def top_artikel_by_Einzelhaendler_zeitraum(self, benutzer, einzelhaendler, startzeitpunkt, endzeitpunkt):
        """  Methode um alle Artikel zu einem bestimmten Benutzer und einem bestimmten Zeitraum heraus zubekommen
            und dann die 5 Artikeln die die größte Anzahl haben zurückzugeben

           Zuerst werden die Listeneintraege herausgefiltert die in dem gegebenen Zeitraum abgehakt wurden.
           In Zeile 164 wird die Häufigkeit der Artikel gezählt und nach dem folgenden Schema in ein Dictionary gespeichert.
           z.B.  1 : 3   Artikel mit der ID 1 wurde 3 mal gekauft. Daraus werden StatistikBO Instanzen gebildet.
           Anschließend wird die Liste der Instanzen mit bubblesort sortiert und nur die 5 am häufigsten gekauften
           Artikel werden zurückgegeben"""
        instanzen = []
        alle = []
        result = []

        with ListeneintragMapper() as mapper:
            tupel = mapper.get_all_listeneintraege_by_Einzelhaendler_Datum(benutzer, einzelhaendler)

        for i in tupel:
            zeitpunkt = i.get_zeitpunkt()
            zeitpunkt = zeitpunkt.strftime("%Y-%m-%d")
            if startzeitpunkt <= zeitpunkt <= endzeitpunkt:
                alle.append(i.get_ArtikelID())

        a = collections.Counter(alle)

        for i in a:
            instanz = StatistikHuZ()
            instanz.set_ArtikelID(i)
            instanz.set_anzahl(a.get(i))
            instanzen.append(instanz)

        if len(instanzen) != 0:                    # Bubblesort
            n = len(instanzen)
            for passes_left in range(n - 1, 0, -1):
                for i in range(passes_left):
                    if instanzen[i].get_anzahl() < instanzen[i + 1].get_anzahl():
                        instanzen[i], instanzen[i + 1] = instanzen[i + 1], instanzen[i]

        for i in range(len(instanzen)):
            if i < 5:
                result.append(instanzen[i])         # nur die ersten 5 elemente
                i += 1
        return result
