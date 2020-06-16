from src.server.db.Mapper import Mapper
from src.server.bo.Einzelhaendler import Einzelhaendler """bo Klasse muss gleich genannt werden"""




class EinzelhaendlerMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM einzelhaendler")
        res= cursor.fetchall()


        for (id, name, erstellungs_zeitpunkt, adresse) in res:

            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result.append(einzelhaendler)


        self._cnx.commit()
        cursor.close()

        return result


    def insert(self, einzelhaendler):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM einzelhaendler ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                einzelhaendler.set_id(maxid[0] + 1)
            else:

                einzelhaendler.set_id(1)

        template = "INSERT INTO einzelhaendler (id, name, erstellungs_zeitpunkt, adresse) VALUES (%s,%s,%s,%s)"
        vals = (einzelhaendler.get_id(), einzelhaendler.get_name(), einzelhaendler.get_erstellungs_zeitpunkt(), einzelhaendler.get_adresse())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return einzelhaendler


    def update(self, einzelhaendler):


        cursor = self._cnx.cursor()

        template = "UPDATE einzelhaendler " + "SET name=%s, adresse=%s WHERE id=%s"
        vals = (einzelhaendler.get_name(), einzelhaendler.get_adresse(), einzelhaendler.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()


    def delete(self, einzelhaendler):

        cursor = self._cnx.cursor()

        template = "DELETE FROM einzelhaendler WHERE id={}".format(einzelhaendler.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()


    def find_by_id(self, id):


        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, adresse FROM einzelhaendler WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, adresse) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result = einzelhaendler
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result


    def find_by_name(self, name):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, adresse FROM einzelhaendler WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, adresse) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result = einzelhaendler
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result