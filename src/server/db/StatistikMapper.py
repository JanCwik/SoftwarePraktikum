from src.server.db.Mapper import Mapper
from src.server.bo.Statistik import Statistik



class StatistikMapper(Mapper):

    def __init__(self):
        super().__init__()


    def get_top_Artikel (self):
        ArtikelIDsInt = []
        top = []

        cursor = self._cnx.cursor()

        command = "SELECT artikel_id FROM listeneintrag"
        cursor.execute(command)
        ArtikelIDs = cursor.fetchall()

        for i in ArtikelIDs:
            for i in i:
                ArtikelIDsInt.append(i)

        ArtikelIDsInt = list(set(ArtikelIDsInt))


        for k in ArtikelIDsInt:
            cursor.execute("SELECT SUM(anzahl) FROM listeneintrag where artikel_id={}".format(k))
            gesamtZahl = cursor.fetchall()

            for i in gesamtZahl:
                for i in i:
                    statistik = Statistik()
                    statistik.set_ArtikelID(k)
                    statistik.set_gesamtzahl(i)
                    top.append(statistik)

        self._cnx.commit()
        cursor.close()
        return top
