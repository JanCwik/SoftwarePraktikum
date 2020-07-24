from .Mapper import Mapper


class MitgliedschaftMapper(Mapper):

    def __init__(self):
        super().__init__()

    def deleteByAnwenderverbund(self, anwenderverbund):
        """ Mapper-Methode zum löschen eines Anwenderverbunds aus der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches die Tabelle mitgliedschaft bereinigt, indem alle Einträge gelöscht
        werden, in den der Anwenderverbund vorhanden ist."""
        cursor = self._cnx.cursor()

        mitgliedschaftloeschen = "DELETE FROM mitgliedschaft WHERE anwenderverbund_id={}".format(anwenderverbund.
                                                                                                 get_id())
        cursor.execute(mitgliedschaftloeschen)

        self._cnx.commit()
        cursor.close()

    def benutzer_hinzufuegen(self, anwenderverbund, benutzer):
        """ Mapper-Methode zum hinzufügen eines Benutzers in eine Mitgliedschaft.

        Beim Aufrufen der Methode wird eine Instanz der Klasse "Anwenderverbund()" und "Benutzer()" übergeben.
        Dann wird ein entsprechender Eintrag in der Tabelle Mitgliedschaft hinzugefügt."""
        cursor = self._cnx.cursor()

        statement = "INSERT INTO mitgliedschaft (anwenderverbund_id, benutzer_id) VALUES (%s,%s)"
        werte = (anwenderverbund.get_id(), benutzer.get_id())
        cursor.execute(statement, werte)

        self._cnx.commit()
        cursor.close()

    def benutzer_loeschen(self, anwenderverbund, benutzer):
        """ Mapper-Methode zum löschen eines Benutzers aus einer Mitgliedschaft.

        Beim Aufrufen der Methode wird eine Instanz der Klasse "Anwenderverbund()" und "Benutzer()" übergeben.
        Dann wird der entsprechende Eintrag in der Tabelle Mitgliedschaft gelöscht."""
        cursor = self._cnx.cursor()

        template = "DELETE FROM mitgliedschaft " + "WHERE anwenderverbund_id=%s AND benutzer_id=%s"
        vals = (anwenderverbund.get_id(), benutzer.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return benutzer

    def alle_benutzer_ausgeben(self, anwenderverbund):
        """Mapper-Methode zum ausgeben aller Benutzer die zu einem bestimmten Anwenderverbund gehören."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT benutzer_id FROM mitgliedschaft WHERE anwenderverbund_id={}".format(anwenderverbund.get_id()))
        res = cursor.fetchall()

        for i in res:
            for k in i:
                result.append(k)
        self._cnx.commit()
        cursor.close()

        return result

    def deleteByBenutzer(self, benutzer):
        """Mapper-Methode zum löschen einer Mitgliedschaft eines Benutzers."""
        cursor = self._cnx.cursor()

        mitgliedschaftloeschen = "DELETE FROM mitgliedschaft WHERE benutzer_id={}".format(benutzer.get_id())
        cursor.execute(mitgliedschaftloeschen)

        self._cnx.commit()
        cursor.close()

    def alle_anwenderverbunde_ausgeben(self, benutzer):
        """Mapper-Methode zum ausgeben aller Anwenderverbunde bei denen der Benutzer ein Mitglied ist.

        Hier werden via SQL-Abfrage alle Anwenderverbunde in denen ein Benutzer ein Mitglied ist aus der Tabelle
        Mitgliedschaft ausgegeben.
        Anschließend werden aus den Zeilen der Datenbank (welche ein Objekt mit dessen Attributen darstellen)
        mit der fetchall-Methode Tupel erstellt.
        Mittels For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz übergeben
        und dann zurückgegeben."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute(
            "SELECT anwenderverbund_id FROM mitgliedschaft WHERE benutzer_id={}".format(benutzer.get_id()))
        res = cursor.fetchall()

        for i in res:
            for x in i:
                result.append(x)

        self._cnx.commit()
        cursor.close()

        return result
