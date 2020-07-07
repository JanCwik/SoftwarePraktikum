from src.server.db.Mapper import Mapper
from src.server.bo.Benutzer import Benutzer
from src.server.bo.Listeneintrag import Listeneintrag


class BenutzerMapper(Mapper):

    def __init__(self):
        super().__init__()

    """ Mapper-Methode zum ausgeben aller Benutzer aus der Datenbank"""

    """Hier werden via SQL-Abfrage alle Benutzer aus der Datenbank ausgegeben.
       Anschließend werden aus den Zeilen der Datenbank (welche ein Objekt mit dessen Attributen darstellen) 
       mit der fetchall-Methode Tupel erstellt. 

       Mittels For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
       Klasse "Benutzer()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
       Das Array mit allen Instanzen wird schließlich zurückgegeben."""

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM benutzer")
        res = cursor.fetchall()

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

    """ Mapper-Methode zum speichern eines neuen Benutzers in der Datenbank"""

    """ Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Benutzer()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "benutzer" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben.
        """

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

    """ Mapper-Methode zum aktualisieren (der Attribute) eines Benutzers in der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Benutzer()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben."""

    def update(self, benutzer):

        cursor = self._cnx.cursor()

        template = "UPDATE benutzer " + "SET name=%s, email=%s, google_id=%s WHERE id=%s"
        vals = (benutzer.get_name(), benutzer.get_email(), benutzer.get_google_id(), benutzer.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    """ Mapper-Methode zum löschen eines Benutzers aus der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Benutzer()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde, 
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben.."""

    def delete(self, benutzer):

        cursor = self._cnx.cursor()

        mitgliedschaftloeschen = "DELETE FROM mitgliedschaft WHERE benutzer_id={}".format(benutzer.get_id())
        cursor.execute(mitgliedschaftloeschen)

        template = "DELETE FROM benutzer WHERE id={}".format(benutzer.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    """ Mapper-Methode zum ausgeben eines Benutzers anhand dessen ID"""

    """ Beim Aufruf Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Benutzer-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""

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

    """ Mapper-Methode zum ausgeben eines Benutzers anhand dessen Name"""

    """ Beim Aufruf Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Benutzer-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben.
        """

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


    def find_by_email(self, email):
        """Mapper-Methode zum ausgeben eines Benutzers anhand dessen Email

        Beim Aufruf Methode wird ein Email in der Variablen "email" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Benutzer-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der Email kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, email, google_id FROM benutzer WHERE email LIKE '{}' ORDER BY email".format(email)
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



    def find_by_google_user_id(self, google_Benutzer_id):
        """Suchen eines Benutzers mit vorgegebener Google ID. Da diese eindeutig ist,
        wird genau ein Objekt zurückgegeben.

        :param google_user_id die Google ID des gesuchten Users.
        :return User-Objekt, das die übergebene Google ID besitzt,
            None bei nicht vorhandenem DB-Tupel.
        """
        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, email, google_Benutzer_id FROM benutzer WHERE google_Benutzer_id='{}'".format(google_Benutzer_id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, email, google_Benutzer_id) = tuples[0]
            b = Benutzer()
            b.set_id(id)
            b.set_name(name)
            b.set_email(email)
            b.set_google_id(google_Benutzer_id)
            result = b
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_listeneintraege(self, id):
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM listeneintrag WHERE benutzer_id={}".format(id))
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