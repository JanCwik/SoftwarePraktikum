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


class ApplikationsAdministration(object):

    def __init__(self):
        pass



    """ METHODEN ZUR VERWALTUNG VON ARTIKELN IN DER DATENBANK"""
    """______________________________________________________"""


    """ Methode zum Anlegen eines neuen Artikels in der Datenbank"""
    def artikel_anlegen(self, name, einheit, standardartikel):
        artikel = Artikel()
        artikel.set_name(name)
        artikel.set_einheit(einheit)
        artikel.set_standardartikel(standardartikel)


        with ArtikelMapper() as mapper:
            return mapper.insert(artikel)


    """ Methode zum ausgeben aller Artikel aus der Datenbank"""
    def get_all_artikel(self):
        with ArtikelMapper() as mapper:
            return mapper.find_all()


    """ Methode zum löschen eines Artikels aus der Datenbank"""
    def delete_artikel(self,artikel):
        with ArtikelMapper() as mapper:
            mapper.delete(artikel)


    """ Methode zum ausgeben eines Artikels aus der Datenbank anhand dessen ID"""
    def get_artikel_by_id(self, id):
        with ArtikelMapper() as mapper:
            return mapper.find_by_id(id)


    """ Methode zum ausgeben eines Artikels aus der Datenbank anhand dessen Name """
    def get_artikel_by_name(self, name):
        with ArtikelMapper() as mapper:
            return mapper.find_by_name(name)


    """ Methode zum aktualisieren eines Artikels in der Datenbank (Attribute ändern)"""
    def update_artikel(self, artikel):
        with ArtikelMapper() as mapper:
            mapper.update(artikel)







    """ METHODEN ZUR VERWALTUNG VON EINZELHÄNDLERN IN DER DATENBANK"""
    """______________________________________________________"""


    """ Methode zum Anlegen eines neuen Einzelhändlers in der Datenbank"""
    """ID wieder entfernt, kann aber auch wieder hinzugefügt werden(Maik)"""
    def einzelhaendler_anlegen(self, name, id):
        einzelhaendler = Einzelhaendler()
        einzelhaendler.set_name(name)
        einzelhaendler.set_id(id)
        #Änderung: Hier wird auch id übergeben, da sie als response zu sehen sein soll



        with EinzelhaendlerMapper() as mapper:
            return mapper.insert(einzelhaendler)


    """ Methode zum ausgeben aller Einzelhändler aus der Datenbank"""
    def get_all_einzelhaendler(self):
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_all()


    """ Methode zum löschen eines Einzelhändlers aus der Datenbank"""
    def delete_einzelhaendler(self,einzelhaendler):
        with EinzelhaendlerMapper() as mapper:
            mapper.delete(einzelhaendler)

    """ Methode zum ausgeben eines Einzelhändlers aus der Datenbank anhand dessen ID"""
    def get_einzelhaendler_by_id(self, id):
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_by_id(id)


    """ Methode zum ausgeben eines Einzelhändlers aus der Datenbank anhand dessen Name """
    def get_einzelhaendler_by_name(self, name):
        with EinzelhaendlerMapper() as mapper:
            return mapper.find_by_name(name)


    """ Methode zum aktualisieren eines Einzelhändlers in der Datenbank (Attribute ändern)"""
    def update_einzelhaendler(self, einzelhaendler):
        with EinzelhaendlerMapper() as mapper:
            mapper.update(einzelhaendler)




    """ METHODEN ZUR VERWALTUNG VON BENUTZERN IN DER DATENBANK"""

    """______________________________________________________"""

    """ Methode zum Anlegen eines neuen Benutzers in der Datenbank"""

    def benutzer_anlegen(self, name, email, google_id):
        benutzer = Benutzer()
        benutzer.set_name(name)
        benutzer.set_email(email)
        benutzer.set_google_id(google_id)

        with BenutzerMapper() as mapper:
            return mapper.insert(benutzer)


    """ Methode zum ausgeben aller Benutzer aus der Datenbank"""

    def get_all_benutzer(self):
        with BenutzerMapper() as mapper:
            return mapper.find_all()


    """ Methode zum löschen eines Benutzers aus der Datenbank"""

    def delete_benutzer(self, benutzer):
        with BenutzerMapper() as mapper:
            mapper.delete(benutzer)


    """ Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen ID"""

    def get_benutzer_by_id(self, id):
        with BenutzerMapper() as mapper:
            return mapper.find_by_id(id)


    """ Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen Name """

    def get_benutzer_by_name(self, name):
        with BenutzerMapper() as mapper:
            return mapper.find_by_name(name)


    """ Methode zum ausgeben eines Benutzers aus der Datenbank anhand dessen Email """

    def get_benutzer_by_email(self, email):
        with BenutzerMapper() as mapper:
            return mapper.find_by_email(email)


    """ Methode zum aktualisieren eines Benutzers in der Datenbank (Attribute ändern)"""

    def update_benutzer(self, benutzer):
        with BenutzerMapper() as mapper:
            mapper.update(benutzer)

    """ Methode zum ausgeben eines Benutzers anhand seiner Google ID"""

    def get_user_by_google_user_id(self, id):
        with BenutzerMapper() as mapper:
            return mapper.find_by_google_user_id(id)

    """ Methode zum ausgeben aller Listeneinträge für die der Benutzer verantwortlich ist"""

    def get_all_listeneintraege_benutzer(self, benutzer):
        with BenutzerMapper() as mapper:
            return mapper.find_all_listeneintraege(benutzer)
        #Änderung: Hier wird ganze Instanz übergeben, statt nur ID

    """ METHODEN ZUR VERWALTUNG VON ANWENDERVERBUNDE IN DER DATENBANK"""

    """______________________________________________________"""

    """ Methode zum Anlegen eines neuen Anwenderverbunds in der Datenbank"""

    def anwenderverbund_anlegen(self, name):
        anwenderverbund = Anwenderverbund()
        anwenderverbund.set_name(name)

        with AnwenderverbundMapper() as mapper:
            return mapper.insert(anwenderverbund)


    """ Methode zum ausgeben aller Anwenderverbunde aus der Datenbank"""

    def get_all_anwenderverbunde(self):
        with AnwenderverbundMapper() as mapper:
            return mapper.find_all()


    """ Methode zum löschen eines Anwenderverbunds aus der Datenbank"""

    def delete_anwenderverbund(self, anwenderverbund):
        with AnwenderverbundMapper() as mapper:
            mapper.delete(anwenderverbund)


    """ Methode zum ausgeben eines Anwenderverbunds aus der Datenbank anhand dessen ID"""

    def get_anwenderverbund_by_id(self, id):
        with AnwenderverbundMapper() as mapper:
            return mapper.find_by_id(id)


    """ Methode zum ausgeben eines Anwenderverbunds aus der Datenbank anhand dessen Name """

    def get_anwenderverbund_by_name(self, name):
        with AnwenderverbundMapper() as mapper:
            return mapper.find_by_name(name)


    """ Methode zum aktualisieren eines Anwenderverbunds in der Datenbank (Attribute ändern)"""

    def update_anwenderverbund(self, anwenderverbund):
        with AnwenderverbundMapper() as mapper:
            mapper.update(anwenderverbund)

    """ Methode zum ausgeben aller Einkaufslisten die zum jeweiligen Anwenderverbund gehören"""

    def get_all_einkaufslisten(self, anwenderverbund):
        with AnwenderverbundMapper() as mapper:
            return mapper.find_all_einkaufslisten(anwenderverbund)
        #Änderung: Hier wird ganze Instanz übergeben statt nur id

    """ Methode zum Mitglieder hinzufügen"""

    def mitglieder_hinzufuegen(self, anwenderverbund, benutzer):
        with AnwenderverbundMapper() as mapper:
            return mapper.benutzer_hinzufuegen(anwenderverbund, benutzer)

    """ Methode zum ausgeben aller Mitglieder"""

    def mitglieder_ausgeben(self, anwenderverbund):
        with AnwenderverbundMapper() as mapper:
            return mapper.alle_benutzer_ausgeben(anwenderverbund)

    """ Methode zum löschen einzelner Mitglieder"""

    def mitglieder_loeschen(self, anwenderverbund, benutzer):
        with AnwenderverbundMapper() as mapper:
            return mapper.benutzer_loeschen(anwenderverbund, benutzer)


    """ METHODEN ZUR VERWALTUNG VON EINKAUFSLISTEN IN DER DATENBANK"""

    """______________________________________________________"""

    """ Methode zum Anlegen einer neuen Einkaufsliste in der Datenbank"""

    def einkaufsliste_anlegen(self, name, anwenderverbund):
        einkaufsliste = Einkaufsliste()
        einkaufsliste.set_name(name)
        einkaufsliste.set_anwenderId(anwenderverbund)
        #Änderung: hier wird ganze Instanz übergeben statt nur id

        with EinkaufslistenMapper() as mapper:
            return mapper.insert(einkaufsliste)

    """ Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren ID"""

    def get_einkaufsliste_by_id(self, id):
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_id(id)

    """ Methode zum ausgeben einer Einkaufsliste aus der Datenbank anhand deren Name """

    def get_einkaufslsite_by_name(self, name):
        with EinkaufslistenMapper() as mapper:
            return mapper.find_by_name(name)

    """ Methode zum aktualisieren einer Einkaufsliste in der Datenbank (Name ändern)"""

    def update_einkaufsliste(self, einkaufsliste):
        with EinkaufslistenMapper() as mapper:
            mapper.update(einkaufsliste)

    """ Methode zum löschen einer Einkaufslite aus der Datenbank"""

    def delete_einkaufsliste(self, einkaufsliste):
        with EinkaufslistenMapper() as mapper:
            mapper.delete(einkaufsliste)

    """ Methode zum ausgeben aller Listeneinträge die zur jeweiligen Einkaufsliste gehören"""

    def get_all_listeneintraege_einkaufslisten(self, id):
        with EinkaufslistenMapper() as mapper:
            return mapper.find_all_listeneintraege(id)

    """ METHODEN ZUR VERWALTUNG VON Listeneinträgen IN DER DATENBANK"""

    """______________________________________________________"""

    """ Methode zum Anlegen eines neuen Listeneintrags in der Datenbank"""

    def listeneintrag_anlegen(self, anzahl, einkaufsliste, einzelhaendler, artikel, benutzer, erledigt):
        listeneintrag = Listeneintrag()
        listeneintrag.set_anzahl(anzahl)
        listeneintrag.set_einkaufslisteId(einkaufsliste)
        listeneintrag.set_einzelhaendlerId(einzelhaendler)
        listeneintrag.set_artikelId(artikel)
        listeneintrag.set_benutzerId(benutzer)
        listeneintrag.set_erledigt(erledigt)
        #Änderung: die ...Id-Setter übergeben nun die ganze Instanz, nichtmehr nur die ID durch .get_ID()

        with ListeneintragMapper() as mapper:
            return mapper.insert(listeneintrag)

    """ Methode zum aktualisieren eines Listeneintrags in der Datenbank """

    def update_listeneintrag(self, listeneintrag):
        with ListeneintragMapper() as mapper:
            mapper.update(listeneintrag)

    """ Methode zum ausgeben eines Listeneintrags aus der Datenbank anhand dessen ID"""

    def get_listeneintrag_by_id(self, id):
        with ListeneintragMapper() as mapper:
            return mapper.find_by_id(id)

    """ Methode zum löschen eines Listeneintrags aus der Datenbank"""

    def delete_listeneintrag(self, listeneintrag):
        with ListeneintragMapper() as mapper:
            mapper.delete(listeneintrag)