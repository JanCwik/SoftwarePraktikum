from server.db.Mapper import Mapper
from server.bo.Statistik import Statistik
from server.bo.StatistikZeitraum import StatistikZeitraum
from server.bo.Listeneintrag import Listeneintrag



class StatistikMapper(Mapper):

    def __init__(self):
        super().__init__()

    def get_all_listeneintraege_by_benutzer(self, benutzer):
        cursor = self._cnx.cursor()

        template = "SELECT artikel_id FROM listeneintrag " + "WHERE benutzer_id=%s AND erledigt=%s"
        vals = (benutzer.get_id(), 1)
        cursor.execute(template, vals)
        artikel = cursor.fetchall()

        self._cnx.commit()
        cursor.close()
        return artikel

    def get_all_listeneintraege_by_Einzelhaendler(self, benutzer, einzelhaendler):
        cursor = self._cnx.cursor()

        template = "SELECT artikel_id FROM listeneintrag " + "WHERE einzelhaendler_id=%s AND benutzer_id=%s AND erledigt=%s"
        vals = (einzelhaendler.get_id(), benutzer.get_id(), 1)
        cursor.execute(template, vals)
        artikel = cursor.fetchall()

        self._cnx.commit()
        cursor.close()
        return artikel

    def get_all_listeneintraege_by_Datum(self, benutzer):
        eintraege = []
        cursor = self._cnx.cursor()

        template = "SELECT artikel_id, aenderungs_zeitpunkt FROM listeneintrag " + "WHERE benutzer_id=%s AND erledigt=%s"

        vals = (benutzer.get_id(), 1)
        cursor.execute(template, vals)
        artikel = cursor.fetchall()

        for (artikel_id, aenderungs_zeitpunkt) in artikel:
            instanz = StatistikZeitraum()
            instanz.set_ArtikelID(artikel_id)
            instanz.set_zeitpunkt(aenderungs_zeitpunkt)
            eintraege.append(instanz)

        self._cnx.commit()
        cursor.close()
        return eintraege

    def get_all_listeneintraege_by_Einzelhaendler_Datum(self, benutzer, einzelhaendler):
        eintraege = []
        cursor = self._cnx.cursor()

        template = "SELECT artikel_id, aenderungs_zeitpunkt FROM listeneintrag " + "WHERE einzelhaendler_id=%s AND benutzer_id=%s AND erledigt=%s"

        vals = (einzelhaendler.get_id(), benutzer.get_id(), 1)
        cursor.execute(template, vals)
        artikel = cursor.fetchall()

        for (artikel_id, aenderungs_zeitpunkt) in artikel:
            instanz = StatistikZeitraum()
            instanz.set_ArtikelID(artikel_id)
            instanz.set_zeitpunkt(aenderungs_zeitpunkt)
            eintraege.append(instanz)

        self._cnx.commit()
        cursor.close()
        return eintraege
