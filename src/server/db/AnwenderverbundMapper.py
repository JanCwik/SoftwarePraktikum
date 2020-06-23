from src.server.db.Mapper import Mapper
from src.server.bo.Anwenderverbund import Anwenderverbund


class AnwenderverbundMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM anwenderverbund")
        res = cursor.fetchall()

        for(id, name, erstellungs_zeitpunkt) in res:

            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result.append(anwenderverbund)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, anwenderverbund):
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM anwenderverbund ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                anwenderverbund.set_id(maxid[0] + 1)
            else:

                anwenderverbund.set_id(1)

        template = "INSERT INTO anwenderverbund (id, name, erstellungs_zeitpunkt) VALUES (%s,%s,%s)"
        vals = (anwenderverbund.get_id(), anwenderverbund.get_name(), anwenderverbund.get_erstellungs_zeitpunkt())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return anwenderverbund

    def update(self, anwenderverbund):
        cursor = self._cnx.cursor()

        template = "UPDATE anwenderverbund " + "SET name=%s WHERE id=%s"
        vals = (anwenderverbund.get_name(), anwenderverbund.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()


    def delete(self, anwenderverbund):
        cursor = self._cnx.cursor()

        template = "DELETE FROM anwenderverbund WHERE id={}".format(anwenderverbund.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt FROM anwenderverbund WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt) = tuples[0]
            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result = anwenderverbund
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
        command = "SELECT id, name, erstellungs_zeitpunkt FROM anwenderverbund WHERE name LIKE '{}' ORDER BY name".format(
            name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt) = tuples[0]
            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result = anwenderverbund
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result