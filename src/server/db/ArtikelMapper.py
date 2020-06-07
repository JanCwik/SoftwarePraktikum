from src.server.db.Mapper import Mapper
from src.server.bo.Artikel import Artikel




class ArtikelMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM artikel")
        res= cursor.fetchall()


        for (id, name, erstellungs_zeitpunkt, einheit, standardartikel) in res:

            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_standardartikel(standardartikel)
            artikel.set_einheit(einheit)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result.append(artikel)


        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, artikel):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM artikel ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                artikel.set_id(maxid[0] + 1)
            else:

                artikel.set_id(1)

        template = "INSERT INTO artikel (id, name, erstellungs_zeitpunkt, einheit, standardartikel) VALUES (%s,%s,%s,%s,%s)"
        vals = (artikel.get_id(), artikel.get_name(), artikel.get_erstellungs_zeitpunkt(), artikel.get_einheit(), artikel.get_standardartikel())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return artikel

    def update(self, artikel):

        cursor = self._cnx.cursor()

        template = "UPDATE artikel " + "SET name=%s, einheit=%s, standardartikel=%s WHERE id=%s"
        vals = (artikel.get_name(), artikel.get_einheit(), artikel.get_standardartikel, artikel.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def delete(self, artikel):

        cursor = self._cnx.cursor()

        template = "DELETE FROM artikel WHERE id={}".format(artikel.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()


    def find_by_id(self, id):


        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, einheit, standardartikel FROM artikel WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, einheit, standardartikel) = tuples[0]
            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            artikel.set_einheit(einheit)
            artikel.set_standardartikel(standardartikel)
            result = artikel
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result











