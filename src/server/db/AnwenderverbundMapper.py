from src.server.db.Mapper import Mapper
from src.server.bo.Anwenderverbund import Anwenderverbund
from src.server.bo.Einkaufsliste import Einkaufsliste


class AnwenderverbundMapper(Mapper):

    def __init__(self):
        super().__init__()

    """ Mapper-Methode zum ausgeben aller Anwenderverbunde aus der Datenbank"""

    """Hier werden via SQL-Abfrage alle Anwenderverbunde aus der Datenbank ausgegeben.
       Anschließend werden aus den Zeilen der Datenbank (welche ein Objekt mit dessen Attributen darstellen) 
       mit der fetchall-Methode Tupel erstellt. 

       Mittels For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
       Klasse "Anwenderverbund()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
       Das Array mit allen Instanzen wird schließlich zurückgegeben."""

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

    """ Mapper-Methode zum speichern eines neuen Anwenderverbunds in der Datenbank"""

    """ Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "anwenderverbund" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben.
        """

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

    """ Mapper-Methode zum aktualisieren (der Attribute) eines Anwenderverbunds in der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben."""

    def update(self, anwenderverbund):
        cursor = self._cnx.cursor()

        template = "UPDATE anwenderverbund " + "SET name=%s WHERE id=%s"
        vals = (anwenderverbund.get_name(), anwenderverbund.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    """ Mapper-Methode zum löschen eines Anwenderverbunds aus der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde, 
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben.."""

    def delete(self, anwenderverbund):
        cursor = self._cnx.cursor()

        template = "DELETE FROM anwenderverbund WHERE id={}".format(anwenderverbund.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    """ Mapper-Methode zum ausgeben eines Anwenderverbunds anhand dessen ID"""

    """ Beim Aufruf Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Anwenderverbund-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""

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

    """ Mapper-Methode zum ausgeben eines Anwenderverbunds anhand dessen Name"""

    """ Beim Aufruf Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Anwenderverbund-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben.
        """

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


    def find_all_einkaufslisten(self, anwenderverbund):
        id = anwenderverbund.get_id()
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM einkaufsliste WHERE anwenderverbund_id={}".format(id))
        res = cursor.fetchall()

        for(id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) in res:

            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_änderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result.append(einkaufsliste)

        self._cnx.commit()
        cursor.close()

        return result