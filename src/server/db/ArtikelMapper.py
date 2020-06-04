from src.server.db.Mapper import Mapper
#from src_2.server.bo.Artikel import Artikel

class ArtikelMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):


        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM artikel")
        res= cursor.fetchall()


        print(res)


        self._cnx.commit()
        cursor.close()







with ArtikelMapper() as mapper:
    mapper.find_all()




