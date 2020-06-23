from src.server.bo.Artikel import Artikel
from src.server.bo.Einzelhaendler import Einzelhaendler
from src.server.bo.Benutzer import Benutzer
from src.server.bo.Anwenderverbund import Anwenderverbund
from src.server.db.ArtikelMapper import ArtikelMapper
from src.server.db.EinzelhaendlerMapper import EinzelhaendlerMapper
from src.server.db.BenutzerMapper import BenutzerMapper
from src.server.db.AnwenderverbundMapper import AnwenderverbundMapper

//2ws

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
    def einzelhaendler_anlegen(self, name):
        einzelhaendler = Einzelhaendler()
        einzelhaendler.set_name(name)



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

    """ Methode zum aktualisieren eines Benutzers in der Datenbank (Attribute ändern)"""

    def update_benutzer(self, benutzer):
        with BenutzerMapper() as mapper:
            mapper.update(benutzer)






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













