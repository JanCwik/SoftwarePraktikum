from BusinessLogic.Artikel import Artikel


class ApplikationsAdministration(object):

    def __init__(self):
        pass

    def artikel_anlegen(self, name, einheit, standardartikel):
        artikel = Artikel()
        artikel.NamedBO.set_name(name)
        artikel.set_einheit(einheit)
        artikel.set_standardartikel(standardartikel)
