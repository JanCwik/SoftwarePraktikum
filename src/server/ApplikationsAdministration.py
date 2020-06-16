from src.server.bo.Artikel import Artikel
from src.server.db.ArtikelMapper import ArtikelMapper



class ApplikationsAdministration(object):

    def __init__(self):
        pass

    def artikel_anlegen(self, name, einheit, standardartikel):
        artikel = Artikel()
        artikel.set_name(name)
        artikel.set_einheit(einheit)
        artikel.set_standardartikel(standardartikel)


        with ArtikelMapper() as mapper:
            return mapper.insert(artikel)

    def get_all_artikel(self):
        with ArtikelMapper() as mapper:
            return mapper.find_all()

    def delete_artikel(self,artikel):
        with ArtikelMapper() as mapper:
            mapper.delete(artikel)


    def get_artikel_by_id(self, id):
        with ArtikelMapper() as mapper:
            return mapper.find_by_id(id)

    def get_artikel_by_name(self, name):
        with ArtikelMapper() as mapper:
            return mapper.find_by_name(name)

    def update_artikel(self, artikel):
        with ArtikelMapper() as mapper:
            mapper.update(artikel)




a = ApplikationsAdministration()

b=[]
c = None

c = a.get_artikel_by_name("Pils")
c.set_einheit("keine")
a.update_artikel(c)




print(c)






