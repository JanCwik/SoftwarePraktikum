from .Mapper import Mapper
from server.bo.Anwenderverbund import Anwenderverbund


class AnwenderverbundMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Mapper-Methode zum ausgeben aller Anwenderverbunde aus der Datenbank

        Hier werden via SQL-Abfrage alle Anwenderverbunde aus der Datenbank ausgegeben.
        Die Anwenderverbund-Objekte werden anschließend von der fetchall()-Methode als Tupel zurückgegeben.
        Mittels einer For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
        Klasse "Anwenderverbund()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
        Das Array mit allen Instanzen wird schließlich zurückgegeben."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, erstellungs_zeitpunkt FROM anwenderverbund")
        verbunde = cursor.fetchall()

        for (id, name, erstellungs_zeitpunkt) in verbunde:
            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result.append(anwenderverbund)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, anwenderverbund):
        """ Mapper-Methode zum speichern eines neuen Anwenderverbunds in der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "anwenderverbund" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben.

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) FROM anwenderverbund ")
        maxid = cursor.fetchall()

        for i in maxid:
            if i[0] is not None:
                anwenderverbund.set_id(i[0] + 1)
            else:
                anwenderverbund.set_id(1)

        statement = "INSERT INTO anwenderverbund (id, name, erstellungs_zeitpunkt) VALUES (%s,%s,%s)"
        werte = (anwenderverbund.get_id(), anwenderverbund.get_name(), anwenderverbund.get_erstellungs_zeitpunkt())
        cursor.execute(statement, werte)

        self._cnx.commit()
        cursor.close()

        return anwenderverbund

    def update(self, anwenderverbund):
        """ Mapper-Methode zum aktualisieren eines Anwenderverbunds in der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        statement = "UPDATE anwenderverbund " + "SET name=%s WHERE id=%s"
        werte = (anwenderverbund.get_name(), anwenderverbund.get_id())
        cursor.execute(statement, werte)

        self._cnx.commit()
        cursor.close()

    def delete(self, anwenderverbund):
        """ Mapper-Methode zum löschen eines Anwenderverbunds aus der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde,
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        statement = "DELETE FROM anwenderverbund WHERE id={}".format(anwenderverbund.get_id())
        cursor.execute(statement)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        """ Mapper-Methode zum ausgeben eines Anwenderverbunds anhand dessen ID.

        Beim Aufruf der Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Anwenderverbund-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        statement = "SELECT id, name, erstellungs_zeitpunkt FROM anwenderverbund WHERE id={}".format(id)
        cursor.execute(statement)
        verbund = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt) = verbund[0]
            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result = anwenderverbund
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """ Mapper-Methode zum ausgeben eines Anwenderverbunds anhand dessen Name.

        Beim Aufruf der Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Anwenderverbund-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        statement = "SELECT id, name, erstellungs_zeitpunkt FROM anwenderverbund WHERE name LIKE '{}' ORDER BY name".format(
            name)
        cursor.execute(statement)
        verbund = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt) = verbund[0]
            anwenderverbund = Anwenderverbund()
            anwenderverbund.set_id(id)
            anwenderverbund.set_name(name)
            anwenderverbund.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            result = anwenderverbund
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result
