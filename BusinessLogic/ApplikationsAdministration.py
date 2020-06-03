from BusinessLogic.Artikel import Artikel


class ApplikationsAdministration(object):

    def __init__(self):
        pass

    def artikel_anlegen(self,name,einheit,standardartikel):
        artikel = Artikel()
        Artikel.NamedBO.set_name(name)
        artikel.set_einheit(einheit)
        artikel.set_standardartikel(standardartikel)

    def artikel_löschen(self):
        pass

    def artikel_speichern(self):
        pass

    def get_artikel_by_name(self):
        pass

    def get_artikel_by_id(self):
        pass

    def get_all_artikel(self):