from server.db.Mapper import Mapper
from server.bo.Einzelhaendler import Einzelhaendler


class EinzelhaendlerMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self, benutzer):
        """Mapper-Methode zum ausgeben aller Einzelhändler eines Benutzers aus der Datenbank

        Hier werden via SQL-Abfrage alle Einzelhändler aus der Datenbank ausgegeben.
        Die Einzelhändler-Objekte werden anschließend von der fetchall()-Methode als Tupel zurückgegeben.
        Mittels einer For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
        Klasse "Einzelhaendler()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
        Das Array mit allen Instanzen wird schließlich zurückgegeben."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, erstellungs_zeitpunkt, benutzer_id FROM einzelhaendler WHERE benutzer_id={}"
                       .format(benutzer.get_id()))
        res = cursor.fetchall()

        for (id, name, erstellungs_zeitpunkt, benutzer_id) in res:

            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_benutzer_id(benutzer_id)
            result.append(einzelhaendler)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, einzelhaendler):
        """Mapper-Methode zum speichern eines neuen Einzelhändlers in der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Einzelhaendler()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "einzelhaendler" ausgegeben.
        Die ID wird anschließend von der fetchall()-Methode als Tupel zurückgegeben.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank
        gespeichert werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM einzelhaendler ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:
                einzelhaendler.set_id(maxid[0] + 1)
            else:
                einzelhaendler.set_id(1)

        template = "INSERT INTO einzelhaendler (id, name, erstellungs_zeitpunkt, benutzer_id) VALUES (%s,%s,%s,%s)"
        vals = (einzelhaendler.get_id(), einzelhaendler.get_name(), einzelhaendler.get_erstellungs_zeitpunkt(),
                einzelhaendler.get_benutzer_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return einzelhaendler

    def update(self, einzelhaendler):
        """Mapper-Methode zum aktualisieren eines Einzelhändlers in der Datenbank

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Einzelhaendler()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        template = "UPDATE einzelhaendler " + "SET name=%s WHERE id=%s"
        vals = (einzelhaendler.get_name(), einzelhaendler.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def delete(self, einzelhaendler):
        """Mapper-Methode zum löschen eines Einzelhändlers aus der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Einzelhaendler()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde,
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        template = "DELETE FROM einzelhaendler WHERE id={}".format(einzelhaendler.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        """Mapper-Methode zum ausgeben eines Einzelhändlers anhand dessen ID.

        Beim Aufruf der Methode wird eine ID welche in der Variablen "id" gespeichert ist übergeben und anschließend
        sucht das SQL-Statement das entsprechende Objekt aus der Datenbank.
        Das Objekt wird anschließend von der fetchall()-Methode als Tupel zurückgegeben.

        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue
        Einzelhändler-Instanz via den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des
        IndexErrors steht --> None. Die Variable "result" wird schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, benutzer_id FROM einzelhaendler WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, benutzer_id) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_benutzer_id(benutzer_id)
            result = einzelhaendler
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """Mapper-Methode zum ausgeben eines Einzelhändlers anhand dessen Name.

        Beim Aufruf der Methode wird ein Name welche in der Variablen "name" gespeichert ist übergeben und
        anschließend sucht das SQL-Statement das entsprechende Objekt aus der Datenbank.
        Das Objekt wird anschließend von der fetchall()-Methode als Tupel zurückgegeben.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue
        Einzelhändler-Instanz via den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des
        IndexErrors steht --> None. Die Variable "result" wird schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, benutzer_id FROM einzelhaendler WHERE name LIKE '{}' " \
                  "ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, benutzer_id) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_benutzer_id(benutzer_id)
            result = einzelhaendler
        except IndexError:
            result = []

        self._cnx.commit()
        cursor.close()

        return result

    def get_einzelhaendlername_for_listeneintrag(self, eintraege):
        """Mapper-Methode zum ausgeben des Namen eines Einzelhaendlers aus der Datenbank anhand eines ListeneintragBOs


        fetchall() gibt das Ergebnis in einem Tuple in einer Liste zurück z.B. deshalb wird zwei mal der Wert an der
        ersten Stelle der Liste bzw. des tubles in einer neuen variable gespeichert und weitergegeben, bis schließlich
        nur noch der gesuchte Wert übergeben werden kann"""
        cursor = self._cnx.cursor()

        cursor.execute("SELECT name FROM einzelhaendler WHERE id={}".format(eintraege.get_einzelhaendlerId()))
        einzelhaendlername_tuple = cursor.fetchall()[0]
        name_string = einzelhaendlername_tuple[0]

        self._cnx.commit()
        cursor.close()

        return name_string
