from src.server.db.Mapper import Mapper
from src.server.bo.Statistik import Statistik
from src.server.bo.Listeneintrag import Listeneintrag



class StatistikMapper(Mapper):

    def __init__(self):
        super().__init__()


    def get_top_Artikel (self):
        zaehler = 0
        gesamt = 0
        geamtalle = []

        cursor = self._cnx.cursor()
        command = "SELECT id FROM listeneintrag"
        cursor.execute(command)
        listeneintraege = cursor.fetchall()

        cursor.execute("SELECT MAX(artikel_id) FROM listeneintrag ")
        maxID = cursor.fetchall()

        for i in maxID:
            for i in i:
                maxIDINT = i



        for a in listeneintraege:
            zaehler += 1

            if maxIDINT >= zaehler:

                command = "SELECT id, anzahl, artikel_id FROM listeneintrag WHERE artikel_id={}".format(zaehler)
                cursor.execute(command)
                allePostioneneinesArtikels = cursor.fetchall()


                for i in allePostioneneinesArtikels:
                    for (id, anzahl, artikel_id) in allePostioneneinesArtikels:
                        listeneintrag = Listeneintrag()
                        listeneintrag.set_id(id)
                        listeneintrag.set_anzahl(anzahl)
                        listeneintrag.set_artikelId(artikel_id)
                        gesamt += listeneintrag.get_anzahl()
                    geamtalle.append(gesamt)


        self._cnx.commit()
        cursor.close()
        return geamtalle

