from src.server.db.Mapper import Mapper
from src.server.bo.Einkaufsliste import Einkaufsliste
import datetime


class EinkaufslistenMapper(Mapper):

    def __init__(self):
        super().__init__()

    """ Mapper-Methode zum speichern einer neuen Einkaufsliste in der Datenbank"""

    """ Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Einkaufsliste()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "artikel" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben.
        """
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

    """ Mapper-Methode zum aktualisieren (des Namens) einer Einkaufsliste in der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Einkaufsliste()" übergeben.
        Zuerst wird der Zeitpunkt festgehalten, wann das Update erfolgt ist.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben."""

    def update(self, einkaufsliste):
        aenderungs_zeitpunkt = datetime.datetime.now()

        cursor = self._cnx.cursor()

        template = "UPDATE einkaufsliste " + "SET name=%s, aenderungs_zeitpunkt=%s WHERE id=%s"
        vals = (einkaufsliste.get_name(), aenderungs_zeitpunkt, einkaufsliste.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    """ Mapper-Methode zum ausgeben einer Einkaufslsite anhand deren ID"""

    """ Beim Aufruf der Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Artikel-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""

    def find_by_id(self, id):


        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id FROM einkaufsliste WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) = tuples[0]
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_änderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result = einkaufsliste
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    """ Mapper-Methode zum ausgeben einer Einkaufsliste anhand deren Name"""

    """ Beim Aufruf der Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Artikel-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben.
        """

    def find_by_name(self, name):

        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id FROM einkaufsliste WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) = tuples[0]
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_änderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result = einkaufsliste
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result
