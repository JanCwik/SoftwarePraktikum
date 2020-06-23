from src.server.db.Mapper import Mapper
from src.server.bo.Benutzer import Benutzer




class BenutzerMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM benutzer")
        res= cursor.fetchall()


        for (id, name, erstellungs_zeitpunkt, email, google_id) in res:

            benutzer = Benutzer()
            benutzer.set_id(id)
            benutzer.set_name(name)
            benutzer.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            benutzer.set_email(email)
            benutzer.set_google_id(google_id)

            result.append(benutzer)


        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, benutzer):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM benutzer ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                benutzer.set_id(maxid[0] + 1)
            else:

                benutzer.set_id(1)

        template = "INSERT INTO benutzer (id, name, erstellungs_zeitpunkt, email, google_id) VALUES (%s,%s,%s,%s,%s)"
        vals = (benutzer.get_id(), benutzer.get_name(), benutzer.get_erstellungs_zeitpunkt(), benutzer.get_email(), benutzer.get_google_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return benutzer

    def update(self, benutzer):


        cursor = self._cnx.cursor()

        template = "UPDATE benutzer " + "SET name=%s, email=%s, google_id=%s WHERE id=%s"
        vals = (benutzer.get_name(), benutzer.get_email(), benutzer.get_google_id(), benutzer.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def delete(self, benutzer):

        cursor = self._cnx.cursor()

        template = "DELETE FROM benutzer WHERE id={}".format(benutzer.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()


    def find_by_id(self, id):


        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, email, google_id FROM benutzer WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, email, google_id) = tuples[0]
            benutzer = Benutzer()
            benutzer.set_id(id)
            benutzer.set_name(name)
            benutzer.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            benutzer.set_email(email)
            benutzer.set_google_id(google_id)
            result = benutzer
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
        command = "SELECT id, name, erstellungs_zeitpunkt, email, google_id FROM benutzer WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, email, google_id) = tuples[0]
            benutzer = Benutzer()
            benutzer.set_id(id)
            benutzer.set_name(name)
            benutzer.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            benutzer.set_email(email)
            benutzer.set_google_id(google_id)
            result = benutzer
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
