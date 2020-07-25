from server.bo.Benutzer import Benutzer
from server.bo.Anwenderverbund import Anwenderverbund
from server.db.ArtikelMapper import ArtikelMapper
from server.db.EinzelhaendlerMapper import EinzelhaendlerMapper
from server.db.BenutzerMapper import BenutzerMapper
from server.db.AnwenderverbundMapper import AnwenderverbundMapper
from server.db.EinkaufslisteMapper import EinkaufslistenMapper
from server.db.ListeneintragMapper import ListeneintragMapper
from server.db.MitgliedschaftMapper import MitgliedschaftMapper
from server.ReportGenerator import ReportGenerator


class ApplikationsAdministration(object):

    def __init__(self):
        pass

    def artikel_anlegen(self, artikel):
        """Methode zum Anlegen von einem neuen Artikels in der Datenbank"""
        with ArtikelMapper() as mapper:
            return mapper.insert(artikel)

    def get_all_artikel(self):
        """Methode zum ausgeben aller Artikel aus der Datenbank"""
        with ArtikelMapper() as mapper:
            return mapper.find_all()

    def delete_artikel(self, artikel):
        """Methode zum löschen eines Artikels aus der Datenbank

            Dabei werden zuerst alle Listeneintraege gelöscht die auf das Artikel Objekt referenzieren
        """

        with ListeneintragMapper() as mapper:
            mapper.delete_by_artikel(artikel)

        with ArtikelMapper() as mapper:
            mapper.delete(artikel)

    def get_artikel_by_id(self, id):
        """Methode zum ausgeben eines Artikels aus der Datenbank anhand dessen ID"""
        with ArtikelMapper() as mapper:
            return mapper.find_by_id(id)

    def get_artikel_by_name(self, name):
        """Methode zum ausgeben eines Artikels aus der Datenbank anhand dessen Name """
        with ArtikelMapper() as mapper:
            return mapper.find_by_name(name)

    def update_artikel(self, artikel):
        """Methode zum aktualisieren eines Artikels in der Datenbank"""
        with ArtikelMapper() as mapper:
            mapper.update(artikel)

    def einzelhaendler_anlegen(self, einzelhaendler):
        """Methode zum Anlegen von einem neuen Einzelhändler in der Datenbank"""
        with EinzelhaendlerMapper() as mapper:
            return mapper.insert(einzelhaendler)

    def get_all_einzelhaendler(self, benutzer):
        """Methode zum ausgeben aller Einzelhändler aus der Datenbank"""
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_all(benutzer)

    def delete_einzelhaendler(self, einzelhaendler):
        """Methode zum löschen eines Einzelhändlers aus der Datenbank

            Dabei werden zuerst alle Listeneintraege gelöscht die auf das Einzelhändler Objekt referenzieren
        """

        with ListeneintragMapper() as mapper:
            mapper.delete_by_einzelhaendler(einzelhaendler)

        with EinzelhaendlerMapper() as mapper:
            mapper.delete(einzelhaendler)

    def get_einzelhaendler_by_id(self, id):
        """Methode zum ausgeben eines Einzelhändlers aus der Datenbank anhand dessen ID"""
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_by_id(id)

    def get_einzelhaendler_by_name(self, name):
        """Methode zum ausgeben eines Einzelhändlers aus der Datenbank anhand dessen Name"""
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_by_name(name)

    def update_einzelhaendler(self, einzelhaendler):
        """Methode zum aktualisieren eines Einzelhändlers in der Datenbank"""
        with EinzelhaendlerMapper() as mapper:
            mapper.update(einzelhaendler)

    def benutzer_anlegen(self, name, email, google_id):
        """Methode zum Anlegen von einem neuen Benutzer in der Datenbank"""
        benutzer = Benutzer()
        benutzer.set_name(name)
        benutzer.set_email(email)
        benutzer.set_google_id(google_id)

        with BenutzerMapper() as mapper:
            return mapper.insert(benutzer)

    def get_all_benutzer(self):
        """Methode zum ausgeben aller Benutzer aus der Datenbank"""
        with BenutzerMapper() as mapper:
            return mapper.find_all()

    def delete_benutzer(self, benutzer):
        """Methode zum löschen eines Benutzers aus der Datenbank"""
        with MitgliedschaftMapper() as mapper:
            mapper.deleteByBenutzer(benutzer)

        with BenutzerMapper() as mapper:
            mapper.delete(benutzer)

    def get_benutzer_by_id(self, id):
        """Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen ID"""
        with BenutzerMapper() as mapper:
            return mapper.find_by_id(id)

    def get_benutzer_by_name(self, name):
        """Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen Name"""
        with BenutzerMapper() as mapper:
            return mapper.find_by_name(name)

    def get_benutzer_by_email(self, email):
        """Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen Email"""
        with BenutzerMapper() as mapper:
            return mapper.find_by_email(email)

    def update_benutzer(self, benutzer):
        """Methode zum aktualisieren eines Benutzers in der Datenbank"""
        with BenutzerMapper() as mapper:
            mapper.update(benutzer)

    def get_user_by_google_user_id(self, id):
        """Methode zum ausgeben eines Benutzers anhand dessen Google ID"""
        with BenutzerMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_listeneintraege_of_benutzer(self, benutzer):
        """Methode zum ausgeben aller Listeneinträge für die der Benutzer verantwortlich ist"""
        with ListeneintragMapper() as mapper:
            return mapper.find_all_listeneintraege_by_benutzer(benutzer)

    def get_anwenderverbuende_by_benutzer_email(self, benutzer):
        """Methode zum ausgeben aller Anwenderverbuende die zu einer Benutzer Email gehören"""
        with MitgliedschaftMapper() as mapper:
            return mapper.alle_anwenderverbunde_ausgeben(benutzer)

    def get_all_artikel_of_benutzer(self, benutzer):
        """Methode zum ausgeben aller Artikel für die der Benutzer verantwortlich ist"""
        with ArtikelMapper() as mapper:
            return mapper.find_all_artikel_of_benutzer(benutzer)

    def anwenderverbund_anlegen(self, name):
        """Methode zum Anlegen eines neuen Anwenderverbunds in der Datenbank"""
        anwenderverbund = Anwenderverbund()
        anwenderverbund.set_name(name)

        with AnwenderverbundMapper() as mapper:
            return mapper.insert(anwenderverbund)

    def get_all_anwenderverbunde(self):
        """Methode zum ausgeben aller Anwenderverbunde aus der Datenbank"""
        with AnwenderverbundMapper() as mapper:
            return mapper.find_all()

    def delete_anwenderverbund(self, anwenderverbund):
        """Methode zum löschen eines Anwenderverbunds aus der Datenbank

            Dabei werden zuerst alle Einkaufslisten des Anwenderverbundes und die dazugehörigen Listeneinträge gesucht.
            Dann werden erst die Listeneinträge, dann Die Einkaufslisten und zuletzt der Anwenderverbund gelöscht
        """
        with MitgliedschaftMapper() as mapper:
            mapper.deleteByAnwenderverbund(anwenderverbund)

        with EinkaufslistenMapper() as mapper:
            listen = mapper.GetEinkaufslistenByAnwendeverbund(anwenderverbund)

        for i in listen:
            with ListeneintragMapper() as mapper:
                eintraege = mapper.GetListeneintraegeByEinkaufsliste(i)

            for i in eintraege:
                with ListeneintragMapper() as mapper:
                    mapper.delete(i)

        with EinkaufslistenMapper() as mapper:
            mapper.DeleteEinkaufslistenByAnwendeverbund(anwenderverbund)

        with AnwenderverbundMapper() as mapper:
            mapper.delete(anwenderverbund)

    def get_anwenderverbund_by_id(self, id):
        """Methode zum ausgeben eines Anwenderverbunds aus der Datenbank anhand dessen ID"""
        with AnwenderverbundMapper() as mapper:
            return mapper.find_by_id(id)

    def get_anwenderverbund_by_name(self, name):
        """Methode zum ausgeben eines Anwenderverbunds aus der Datenbank anhand dessen Name"""
        with AnwenderverbundMapper() as mapper:
            return mapper.find_by_name(name)

    def update_anwenderverbund(self, anwenderverbund):
        """Methode zum aktualisieren eines Anwenderverbunds in der Datenbank"""
        with AnwenderverbundMapper() as mapper:
            mapper.update(anwenderverbund)

    def get_all_einkaufslisten_of_anwenderverbund(self, anwenderverbund):
        """Methode zum ausgeben aller Einkaufslisten die zum einem bestimmten Anwenderverbund gehören"""
        with EinkaufslistenMapper() as mapper:
            return mapper.GetEinkaufslistenByAnwendeverbund(anwenderverbund)

    def mitglieder_zum_anwenderverbund_hinzufuegen(self, anwenderverbund, benutzer):
        """Methode um Mitglieder einem Anwenderverbund hinzuzufügen"""
        with MitgliedschaftMapper() as mapper:
            return mapper.benutzer_hinzufuegen(anwenderverbund, benutzer)

    def mitglieder_zum_anwenderverbund_ausgeben(self, anwenderverbund):
        """Methode zum ausgeben aller Mitglieder eines Anwenderverbunds"""
        with MitgliedschaftMapper() as mapper:
            return mapper.alle_benutzer_ausgeben(anwenderverbund)

    def mitglieder_vom_anwenderverbund_entfernen(self, anwenderverbund, benutzer):
        """Methode zum entfernen einzelner Mitglieder aus einem Anwenderverbund"""
        with MitgliedschaftMapper() as mapper:
            return mapper.benutzer_loeschen(anwenderverbund, benutzer)

    def get_all_einkaufslisten(self):
        """ Methode zum ausgeben aller Einkaufslisten aus der Datenbank"""
        with EinkaufslistenMapper() as mapper:
            return mapper.find_all_einkaufslisten()

    def einkaufsliste_anlegen(self, liste, benutzer):
        """Methode zum Anlegen einer neuen Einkaufsliste in der Datenbank

            Zusätzlich werden Listeneinträge für alle Standardartikel des Benutzers in der Einkaufsliste erstellt
        """
        with EinkaufslistenMapper() as mapper:
            einkaufsliste = mapper.insert(liste)

        with ArtikelMapper() as mapper:
            standardartikel = mapper.get_id_from_standardartikel(benutzer)

        for i in standardartikel:
            for standardartikelID in i:
                with ListeneintragMapper() as mapper:
                    mapper.insert_standardartikel_in_Einkaufsliste(einkaufsliste, standardartikelID)

        return einkaufsliste

    def get_einkaufsliste_by_id(self, id):
        """Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren ID"""
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_id(id)

    def get_einkaufsliste_by_name(self, name):
        """Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren Name """
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_name(name)

    def update_einkaufsliste(self, einkaufsliste):
        """Methode zum aktualisieren einer Einkaufsliste in der Datenbank"""
        with EinkaufslistenMapper() as mapper:
            mapper.update(einkaufsliste)

    def delete_einkaufsliste(self, einkaufsliste):
        """ Methode zum löschen einer Einkaufsliste aus der Datenbank"""
        with ListeneintragMapper() as mapper:
            mapper.delete_by_einkaufsliste(einkaufsliste)

        with EinkaufslistenMapper() as mapper:
            mapper.delete(einkaufsliste)

    def get_all_listeneintraege_of_einkaufslisten(self, einkaufsliste):
        """Methode zum ausgeben aller Listeneinträge die zur jeweiligen Einkaufsliste gehören

           Zuerst werden alle Listeneintraege für die übergebene einkaufsliste aus der Datenbank gezogen.
           Dann wird für jeden Listeneintrag:
                Wenn einzelhaendlerID vorhanden, der entsprechende name des Einzelhaendlers in das Listeneintrag-Objekt
                gespeichert
                Wenn benutzerID vorhanden, der entsprechende name des Benutzers in das Listeneintrag-Objekt gespeichert
                und anhand der ArtikelID werden Artikelname und Einheit gesucht und in das Listeneintrag-Objekt
                gespeichert
           Wenn mehr als ein Listeneintrag in Schritt eins zurückgegeben wurde, wird zunächst der Eintrag markiert,
           welcher zuletzt geändert wurde.
           Anschließend wird die Liste der Einträge in zwei Listen aufgeteilt: Listeneinträge mit EinzelhändlerID und
           Listeneinträge ohne EinzelhändlerID
           Die Liste mit_einzelhaendler wird durch bubblesort nach einzelhaendlerID sortiert. Zuletzt wirden die zwei
           Listen wieder zusammengefügt.
            """
        with ListeneintragMapper() as mapper:
            eintraege = mapper.find_all_listeneintraege_by_einkaufsliste(einkaufsliste)

        if len(eintraege) == 0:
            return []

        for eintrag in eintraege:
            if eintrag.get_einzelhaendlerId() is not None:
                with EinzelhaendlerMapper() as mapper:
                    einzelhaendler_name = mapper.get_einzelhaendlername_for_listeneintrag(eintrag)
                    eintrag.set_einzelhaendler_name(einzelhaendler_name)

            if eintrag.get_benutzerId() is not None:
                with BenutzerMapper() as mapper:
                    benutzer_name = mapper.get_benutzername_for_listeneintrag(eintrag)
                    eintrag.set_benutzer_name(benutzer_name)

            with ArtikelMapper() as mapper:
                artikel_name = mapper.get_artikelname_for_listeneintrag(eintrag)
                eintrag.set_artikel_name(artikel_name)

            with ArtikelMapper() as mapper:
                artikel_einheit = mapper.get_artikeleinheit_for_listeneintrag(eintrag)
                eintrag.set_artikel_einheit(artikel_einheit)

        if len(eintraege) == 1:
            eintraege[0].set_zuletzt_geaendert(True)
            return eintraege

        else:                                                        # findet den zuletzt geänderten Listeneintrag
            latest = eintraege[0]
            for eintrag in eintraege:
                if eintrag.get_aenderungs_zeitpunkt() > latest.get_aenderungs_zeitpunkt():
                    latest = eintrag

            latest.set_zuletzt_geaendert(True)

            ohne_einzelhaendler = []
            mit_einzelhaendler = []
            for eintrag in eintraege:                               # sortiert die Rückgabe nach Einzelhändler, dadurch dann nach Einzelhändler gruppiert
                if eintrag.get_einzelhaendlerId() is None:          # Listeneinträge ohne Einzelhändler werden im vorraus aussortiert
                    ohne_einzelhaendler.append(eintrag)             # am ende hintendran gehängt
                else:
                    mit_einzelhaendler.append(eintrag)

            if len(mit_einzelhaendler) != 0:                            # Bubblesort
                n = len(mit_einzelhaendler)
                for passes_left in range(n-1, 0, -1):
                    for i in range(passes_left):
                        if mit_einzelhaendler[i].get_einzelhaendlerId() > mit_einzelhaendler[i+1].get_einzelhaendlerId():
                            mit_einzelhaendler[i], mit_einzelhaendler[i+1] = mit_einzelhaendler[i+1], mit_einzelhaendler[i]

            res = mit_einzelhaendler + ohne_einzelhaendler
            return res

    def listeneintrag_anlegen(self, listeneintrag):
        """Methode zum Anlegen eines neuen Listeneintrags in der Datenbank"""
        with ListeneintragMapper() as mapper:
            return mapper.insert(listeneintrag)

    def update_listeneintrag(self, listeneintrag):
        """Methode zum aktualisieren eines Listeneintrags in der Datenbank"""
        with ListeneintragMapper() as mapper:
            return mapper.update(listeneintrag)

    def get_listeneintrag_by_id(self, id):
        """ Methode zum ausgeben eines Listeneintrags aus der Datenbank anhand dessen ID"""
        with ListeneintragMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_listeneintrag(self, listeneintrag):
        """ Methode zum löschen eines Listeneintrags aus der Datenbank"""
        with ListeneintragMapper() as mapper:
            mapper.delete(listeneintrag)

    def get_top_artikel_5(self, benutzer):
        """ Methode zum ausgeben der top 5 Artikel die zu einem bestimmten Benutzer gehören"""
        report = ReportGenerator()
        top5 = report.top_artikel(benutzer)
        for i in top5:
            id = i.get_ArtikelID()
            with ArtikelMapper() as mapper:
                ArtikelObjekt = mapper.find_by_id(id)
            i.set_ArtikelName(ArtikelObjekt.get_name())
        return top5

    def get_top_artikel_5_by_einzelhaendler(self, benutzer, einzelhaendler):
        """ Methode zum ausgeben der top 5 Artikel von einem Einzelhaendler, die zu einem bestimmten Benutzer gehören"""
        report = ReportGenerator()
        top5_by_einzelhaendler = report.top_artikel_by_einzelhaendler(benutzer, einzelhaendler)
        for i in top5_by_einzelhaendler:
            id = i.get_ArtikelID()
            with ArtikelMapper() as mapper:
                ArtikelObjekt = mapper.find_by_id(id)
            i.set_ArtikelName(ArtikelObjekt.get_name())
        return top5_by_einzelhaendler

    def get_top_artikel_5_by_datum(self, benutzer, startzeitpunkt, endzeitpunkt):
        """ Methode zum ausgeben der top 5 Artikel von einem Benutzer, die in einem bestimmten Zeitraum liegen"""
        report = ReportGenerator()
        top5_by_zeitraum = report.top_artikel_by_zeitraum(benutzer, startzeitpunkt, endzeitpunkt)
        for i in top5_by_zeitraum:
            id = i.get_ArtikelID()
            with ArtikelMapper() as mapper:
                ArtikelObjekt = mapper.find_by_id(id)
            i.set_ArtikelName(ArtikelObjekt.get_name())
        return top5_by_zeitraum

    def get_top_artikel_5_by_einzelhaendler_datum(self, benutzer, einzelhaendler, startzeitpunkt, endzeitpunkt):
        """Methode zum ausgeben der top 5 Artikel von einem Einzelhaendler, die zu einem bestimmten Benutzer gehören
        und in einem bestimmten Zeitraum liegen"""
        report = ReportGenerator()
        top5_by_einzelhaendler_zeitraum = report.top_artikel_by_Einzelhaendler_zeitraum(benutzer, einzelhaendler,
                                                                                        startzeitpunkt, endzeitpunkt)
        for i in top5_by_einzelhaendler_zeitraum:
            id = i.get_ArtikelID()
            with ArtikelMapper() as mapper:
                ArtikelObjekt = mapper.find_by_id(id)
            i.set_ArtikelName(ArtikelObjekt.get_name())
        return top5_by_einzelhaendler_zeitraum
