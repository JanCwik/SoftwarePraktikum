from server.db.Mapper import Mapper
from server.bo.Listeneintrag import Listeneintrag
import datetime


class ListeneintragMapper(Mapper):

    def __init__(self):
        super().__init__()

    def GetListeneintraegeByEinkaufsliste(self, id):
        """ Mapper-Methode zum ausgeben aller Listeneinträge, die zu einer Einkaufsliste gehören"""
        cursor = self._cnx.cursor()

        eintraegeauslesen = "SELECT id FROM listeneintrag WHERE einkaufsliste_id={}".format(id)
        cursor.execute(eintraegeauslesen)
        eintraege = cursor.fetchall()

        self._cnx.commit()
        cursor.close()

        return eintraege

    def insert(self, listeneintrag):
        """Mapper-Methode zum speichern eines neuen Listeneintrags in der Datenbank

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Listeneintrag()" übergeben.
        Anschließend wird der Änderungszeitpunkt mittels der set_änderungs_zeitpunkt-Methode bei der Instanz gesetzt.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "listeneintrag" ausgegeben.
        Die ID wird anschließend von der fetchall()-Methode als Tupel zurückgegeben.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        listeneintrag.set_änderungs_zeitpunkt(datetime.datetime.now())

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM listeneintrag ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                listeneintrag.set_id(maxid[0] + 1)
            else:

                listeneintrag.set_id(1)

        template = "INSERT INTO listeneintrag (id, anzahl, aenderungs_zeitpunkt, einkaufsliste_id, einzelhaendler_id, artikel_id, benutzer_id, erledigt) VALUES (%s,%s,%s,%s,%s,%s,%s,%s)"
        vals = (listeneintrag.get_id(), listeneintrag.get_anzahl(), listeneintrag.get_änderungs_zeitpunkt(), listeneintrag.get_einkaufslisteId(), listeneintrag.get_einzelhaendlerId(), listeneintrag.get_artikelId(), listeneintrag.get_benutzerId(), listeneintrag.get_erledigt())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return listeneintrag

    def update(self, listeneintrag):
        """Mapper-Methode zum aktualisieren eines Listeneintrags in der Datenbank

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Listeneintrag()" übergeben.
        Zuerst wird der Zeitpunkt festgehalten, wann das Update erfolgt ist.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        listeneintrag.set_änderungs_zeitpunkt(datetime.datetime.now())

        cursor = self._cnx.cursor()

        template = "UPDATE listeneintrag " + "SET anzahl=%s, aenderungs_zeitpunkt=%s, einzelhaendler_id=%s, artikel_id=%s, benutzer_id=%s, erledigt=%s WHERE id=%s"
        vals = (listeneintrag.get_anzahl(), listeneintrag.get_änderungs_zeitpunkt(), listeneintrag.get_einzelhaendlerId(), listeneintrag.get_artikelId(), listeneintrag.get_benutzerId(), listeneintrag.get_erledigt(), listeneintrag.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        """Mapper-Methode zum ausgeben eines Listeneintrags anhand dessen ID

        Beim Aufruf der Methode wird eine ID welche in der Variablen "id" gespeichert ist übergeben und anschließend sucht
        das SQL-Statement das entsprechende Objekt aus der Datenbank.
        Das Objekt wird anschließend von der fetchall()-Methode als Tupel zurückgegeben.

        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Listeneintrag-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Die Variable "result" wird schließlich von der Mehtode zurückgegeben."""

        cursor = self._cnx.cursor()
        command = "SELECT id, anzahl, aenderungs_zeitpunkt, einkaufsliste_id, einzelhaendler_id, artikel_id, benutzer_id, erledigt FROM listeneintrag WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, anzahl, aenderungs_zeitpunkt, einkaufsliste_id, einzelhaendler_id, artikel_id, benutzer_id, erledigt) = tuples[0]
            listeneintrag = Listeneintrag()
            listeneintrag.set_id(id)
            listeneintrag.set_anzahl(anzahl)
            listeneintrag.set_änderungs_zeitpunkt(aenderungs_zeitpunkt)
            listeneintrag.set_einkaufslisteId(einkaufsliste_id)
            listeneintrag.set_einzelhaendlerId(einzelhaendler_id)
            listeneintrag.set_artikelId(artikel_id)
            listeneintrag.set_benutzerId(benutzer_id)
            listeneintrag.set_erledigt(erledigt)
            result = listeneintrag
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def delete(self, listeneintrag):
        """Mapper-Methode zum löschen eines Listeneintrags aus der Datenbank anhand dessen ID"""

        cursor = self._cnx.cursor()

        statement = "DELETE FROM listeneintrag WHERE id={}".format(listeneintrag.get_id())
        cursor.execute(statement)

        self._cnx.commit()
        cursor.close()

        return listeneintrag

    def find_all_listeneintraege(self, benutzer):
        """Mapper-Methode zum ausgeben aller Listeneinträge zu einem Benutzer."""
        id = benutzer.get_id()
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, anzahl, aenderungs_zeitpunkt, einkaufsliste_id, einzelhaendler_id, artikel_id, benutzer_id, erledigt FROM listeneintrag WHERE benutzer_id={}".format(id))
        res = cursor.fetchall()

        for(id, anzahl, aenderungs_zeitpunkt, einkaufsliste_id, einzelhaendler_id, artikel_id, benutzer_id, erledigt) in res:

            listeneintrag = Listeneintrag()
            listeneintrag.set_id(id)
            listeneintrag.set_anzahl(anzahl)
            listeneintrag.set_änderungs_zeitpunkt(aenderungs_zeitpunkt)
            listeneintrag.set_einkaufslisteId(einkaufsliste_id)
            listeneintrag.set_einzelhaendlerId(einzelhaendler_id)
            listeneintrag.set_artikelId(artikel_id)
            listeneintrag.set_benutzerId(benutzer_id)
            listeneintrag.set_erledigt(erledigt)
            result.append(listeneintrag)

        self._cnx.commit()
        cursor.close()

        return result