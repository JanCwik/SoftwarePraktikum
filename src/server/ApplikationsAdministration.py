from src.server.bo.Artikel import Artikel
from src.server.bo.Einzelhaendler import Einzelhaendler
from src.server.bo.Benutzer import Benutzer
from src.server.bo.Anwenderverbund import Anwenderverbund
from src.server.bo.Einkaufsliste import Einkaufsliste
from src.server.bo.Listeneintrag import Listeneintrag
from src.server.db.ArtikelMapper import ArtikelMapper
from src.server.db.EinzelhaendlerMapper import EinzelhaendlerMapper
from src.server.db.BenutzerMapper import BenutzerMapper
from src.server.db.AnwenderverbundMapper import AnwenderverbundMapper
from src.server.db.EinkaufslisteMapper import EinkaufslistenMapper
from src.server.db.ListeneintragMapper import ListeneintragMapper
from src.server.db.StatistikMapper import StatistikMapper


class ApplikationsAdministration(object):

    def __init__(self):
        pass

    def artikel_anlegen(self, name, einheit, standardartikel):
        """Methode zum Anlegen eines neuen Artikels in der Datenbank"""
        artikel = Artikel()
        artikel.set_name(name)
        artikel.set_einheit(einheit)
        artikel.set_standardartikel(standardartikel)

        with ArtikelMapper() as mapper:
            return mapper.insert(artikel)

    def get_all_artikel(self):
        """Methode zum ausgeben aller Artikel aus der Datenbank"""
        with ArtikelMapper() as mapper:
            return mapper.find_all()

    def delete_artikel(self, artikel):
        """Methode zum löschen eines Artikels aus der Datenbank"""
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

    def einzelhaendler_anlegen(self, name, id):
        """Methode zum Anlegen eines neuen Einzelhändlers in der Datenbank"""
        einzelhaendler = Einzelhaendler()
        einzelhaendler.set_name(name)
        einzelhaendler.set_id(id)
        #Änderung: Hier wird auch id übergeben, da sie als response zu sehen sein soll

        with EinzelhaendlerMapper() as mapper:
            return mapper.insert(einzelhaendler)

    def get_all_einzelhaendler(self):
        """Methode zum ausgeben aller Einzelhändler aus der Datenbank"""
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_all()

    def delete_einzelhaendler(self,einzelhaendler):
        """Methode zum löschen eines Einzelhändlers aus der Datenbank"""
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
        """Methode zum Anlegen eines neuen Benutzers in der Datenbank"""
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
        """Methode zum ausgeben eines Benutzers anhand seiner Google ID"""
        with BenutzerMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    def get_all_listeneintraege_of_benutzer(self, benutzer): #Name geändert!
        """Methode zum ausgeben aller Listeneinträge für die der Benutzer verantwortlich ist"""
        with BenutzerMapper() as mapper:
            return mapper.find_all_listeneintraege(benutzer)
        #Änderung: Hier wird ganze Instanz übergeben, statt nur ID

    #Neu!
    def get_anwenderverbuende_by_benutzer_email(self, benutzer):
        with BenutzerMapper() as mapper:
            return mapper.alle_anwenderverbunde_ausgeben(benutzer)

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
        """Methode zum löschen eines Anwenderverbunds aus der Datenbank"""
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

    def get_all_einkaufslisten(self, anwenderverbund):
        """Methode zum ausgeben aller Einkaufslisten die zum jeweiligen Anwenderverbund gehören"""
        with AnwenderverbundMapper() as mapper:
            return mapper.find_all_einkaufslisten(anwenderverbund)
        #Änderung: Hier wird ganze Instanz übergeben statt nur id

    def mitglieder_hinzufuegen(self, anwenderverbund, benutzer):
        """Methode um Mitglieder einem Anwenderverbund hinzuzufügen"""
        with AnwenderverbundMapper() as mapper:
            return mapper.benutzer_hinzufuegen(anwenderverbund, benutzer)

    def mitglieder_ausgeben(self, anwenderverbund):
        """Methode zum ausgeben aller Mitglieder eines Anwenderverbunds"""
        with AnwenderverbundMapper() as mapper:
            return mapper.alle_benutzer_ausgeben(anwenderverbund)

    def mitglieder_entfernen(self, anwenderverbund, benutzer):#Name der Methode geändert, Maik
        """Methode zum entfernen einzelner Mitglieder aus einem Anwenderverbund"""
        with AnwenderverbundMapper() as mapper:
            return mapper.benutzer_loeschen(anwenderverbund, benutzer)


    """ METHODEN ZUR VERWALTUNG VON EINKAUFSLISTEN IN DER DATENBANK"""

    """______________________________________________________"""

    """ Methode zum ausgeben aller Einkaufslisten aus der Datenbank"""

    def get_all_all_einkaufslisten(self):
        with EinkaufslistenMapper() as mapper:
            return mapper.find_all_all_einkaufslisten()

    """ Methode zum Anlegen einer neuen Einkaufsliste in der Datenbank"""

    def einkaufsliste_anlegen(self, name, anwenderverbund):
        """Methode zum Anlegen einer neuen Einkaufsliste in der Datenbank"""
        einkaufsliste = Einkaufsliste()
        einkaufsliste.set_name(name)
        einkaufsliste.set_anwenderId(anwenderverbund)
        #Änderung: hier wird ganze Instanz übergeben statt nur id

        with EinkaufslistenMapper() as mapper:
            return mapper.insert(einkaufsliste)

    def get_einkaufsliste_by_id(self, id):
        """Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren ID"""
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_id(id)

    def get_einkaufsliste_by_name(self, name): #evtl. unnötig, da name nicht eindeutig ist
        """Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren Name """
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_name(name)

    def update_einkaufsliste(self, einkaufsliste):
        """Methode zum aktualisieren einer Einkaufsliste in der Datenbank"""
        with EinkaufslistenMapper() as mapper:
            mapper.update(einkaufsliste)

    def delete_einkaufsliste(self, einkaufsliste):
        """ Methode zum löschen einer Einkaufsliste aus der Datenbank"""
        with EinkaufslistenMapper() as mapper:
            mapper.delete(einkaufsliste)

    def get_all_listeneintraege_of_einkaufslisten(self, einkaufsliste):  #Änderung: statt id wird nun ganzes Objekt übergeben
        """ Methode zum ausgeben aller Listeneinträge die zur jeweiligen Einkaufsliste gehören"""
        with EinkaufslistenMapper() as mapper:
            return mapper.find_all_listeneintraege(einkaufsliste)

    """ 
    def listeneintrag_anlegen(self, anzahl, einkaufsliste, einzelhaendler, artikel, benutzer, erledigt):
        # Methode zum Anlegen eines neuen Listeneintrags in der Datenbank
        listeneintrag = Listeneintrag()
        listeneintrag.set_anzahl(anzahl)
        listeneintrag.set_einkaufslisteId(einkaufsliste.get_id())
        listeneintrag.set_einzelhaendlerId(einzelhaendler.get_id())
        listeneintrag.set_artikelId(artikel.get_id())
        listeneintrag.set_benutzerId(benutzer.get_id())
        listeneintrag.set_erledigt(erledigt)
        #Änderung: Jetzt werden komplette Objekte übergeben

        with ListeneintragMapper() as mapper:
            return mapper.insert(listeneintrag)
            """
    #es geht doch auch einfach so: oder? Das listeneintragObjkt wird doch schon durch die from_dict methode in der main angelegt
    #Also ich habs getestet es geht, und Thies is ja so au zufrieden oder?

    def listeneintrag_anlegen(self, listeneintrag):
         # Methode zum Anlegen eines neuen Listeneintrags in der Datenbank

        with ListeneintragMapper() as mapper:
            return mapper.insert(listeneintrag)


    def update_listeneintrag(self, listeneintrag):
        """Methode zum aktualisieren eines Listeneintrags in der Datenbank"""
        with ListeneintragMapper() as mapper:
            mapper.update(listeneintrag)

    def get_listeneintrag_by_id(self, id):
        """ Methode zum ausgeben eines Listeneintrags aus der Datenbank anhand dessen ID"""
        with ListeneintragMapper() as mapper:
            return mapper.find_by_id(id)

    def delete_listeneintrag(self, listeneintrag):
        """ Methode zum löschen eines Listeneintrags aus der Datenbank"""
        with ListeneintragMapper() as mapper:
            mapper.delete(listeneintrag)

    def statistik(self):
        with StatistikMapper() as mapper:
            return mapper.get_top_Artikel()

    def statistikEinzelhaendler(self):
        with StatistikMapper() as mapper:
            return mapper.get_top_Einzelhaendler()

    def statistik_pro_monat(self):
        with StatistikMapper() as mapper:
            return mapper.get_top_proMonat()

a = ApplikationsAdministration()
b = []
b = a.statistikEinzelhaendler()
for i in b:
    print(i)