from src.server.db.Mapper import Mapper
from src.server.bo.Einkaufsliste import Einkaufsliste


class EinkaufslistenMapper(Mapper):

    def __init__(self):
        super().__init__()


    def insert(self, einkaufsliste):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM einkaufsliste ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                einkaufsliste.set_id(maxid[0] + 1)
            else:

                einkaufsliste.set_id(1)

        template = "INSERT INTO einkaufsliste (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) VALUES (%s,%s,%s,%s,%s)"
        vals = (einkaufsliste.get_id(), einkaufsliste.get_name(), einkaufsliste.get_erstellungs_zeitpunkt(), einkaufsliste.get_änderungs_zeitpunkt(), einkaufsliste.get_anwenderId())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return einkaufsliste