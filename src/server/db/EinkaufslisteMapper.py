from server.db.Mapper import Mapper
from server.bo.Einkaufsliste import Einkaufsliste
import datetime


class EinkaufslistenMapper(Mapper):

    def __init__(self):
        super().__init__()

    def insert(self, einkaufsliste):
        """ Mapper-Methode zum speichern einer neuen Einkaufsliste in der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Einkaufsliste()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "einkaufsliste" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank
        gespeichert werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM einkaufsliste ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:
                einkaufsliste.set_id(maxid[0] + 1)
            else:
                einkaufsliste.set_id(1)

        template = "INSERT INTO einkaufsliste (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, " \
                   "anwenderverbund_id) VALUES (%s,%s,%s,%s,%s)"
        vals = (einkaufsliste.get_id(), einkaufsliste.get_name(), einkaufsliste.get_erstellungs_zeitpunkt(),
                einkaufsliste.get_aenderungs_zeitpunkt(), einkaufsliste.get_anwenderId())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return einkaufsliste

    def find_all_einkaufslisten(self):
        """ Mapper-Methode zum ausgeben aller Einkaufslisten aus der Datenbank.

        Hier werden via SQL-Abfrage alle Einkaufslisten aus der Datenbank ausgegeben.
        Anschließend werden aus den Zeilen der Datenbank (welche ein Objekt mit dessen Attributen darstellen)
        mit der fetchall-Methode Tupel erstellt.

        Mittels For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
        Klasse "Einkaufsliste()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
        Das Array mit allen Instanzen wird schließlich zurückgegeben."""

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id "
                       "FROM einkaufsliste ")
        res = cursor.fetchall()

        for (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) in res:
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_aenderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result.append(einkaufsliste)

        self._cnx.commit()
        cursor.close()

        return result

    def update(self, einkaufsliste):
        """ Mapper-Methode zum aktualisieren (des Namens) einer Einkaufsliste in der Datenbank.

        Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Einkaufsliste()" übergeben.
        Zuerst wird der Zeitpunkt festgehalten, wann das Update erfolgt ist.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        aenderungs_zeitpunkt = datetime.datetime.now()

        cursor = self._cnx.cursor()

        template = "UPDATE einkaufsliste " + "SET name=%s, aenderungs_zeitpunkt=%s WHERE id=%s"
        vals = (einkaufsliste.get_name(), aenderungs_zeitpunkt, einkaufsliste.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        """ Mapper-Methode zum ausgeben einer Einkaufslsite anhand deren ID.

        Beim Aufruf der Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement
        übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue
        Artikel-Instanz via den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des
        IndexErrors steht --> None. Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id " \
                  "FROM einkaufsliste WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) = tuples[0]
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_aenderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result = einkaufsliste
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """ Mapper-Methode zum ausgeben einer Einkaufsliste anhand deren Name.

        Beim Aufruf der Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das
        SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue
        Artikel-Instanz via den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des
        IndexErrors steht --> None. Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id " \
                  "FROM einkaufsliste WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) = tuples[0]
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_aenderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result = einkaufsliste
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def delete(self, einkaufsliste):
        """ Mapper-Methode zum löschen einer Einkaufsliste aus der Datenbank.

        Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Einkaufsliste()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde,
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        template = "DELETE FROM einkaufsliste WHERE id={}".format(einkaufsliste.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    def GetEinkaufslistenByAnwendeverbund(self, anwenderverbund):
        """ Mapper-Methode zum ausgeben aller Einkaufslisten, die zu einem Anwenderverbund gehören"""
        cursor = self._cnx.cursor()

        listenauslesen = "SELECT id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id " \
                         "FROM einkaufsliste WHERE anwenderverbund_id={}".format(anwenderverbund.get_id())
        cursor.execute(listenauslesen)
        listen = cursor.fetchall()
        result = []

        for (id, name, erstellungs_zeitpunkt, aenderungs_zeitpunkt, anwenderverbund_id) in listen:
            einkaufsliste = Einkaufsliste()
            einkaufsliste.set_id(id)
            einkaufsliste.set_name(name)
            einkaufsliste.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einkaufsliste.set_aenderungs_zeitpunkt(aenderungs_zeitpunkt)
            einkaufsliste.set_anwenderId(anwenderverbund_id)
            result.append(einkaufsliste)

        self._cnx.commit()
        cursor.close()

        return result

    def DeleteEinkaufslistenByAnwendeverbund(self, anwenderverbund):
        """ Mapper-Methode zum löschen von Einkaufslisten anhand des Anwenderverbundes"""
        cursor = self._cnx.cursor()

        listenloeschen = "DELETE FROM einkaufsliste WHERE anwenderverbund_id={}".format(anwenderverbund.get_id())
        cursor.execute(listenloeschen)

        self._cnx.commit()
        cursor.close()
