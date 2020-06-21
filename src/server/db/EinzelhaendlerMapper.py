from src.server.db.Mapper import Mapper
from src.server.bo.Einzelhaendler import Einzelhaendler




class EinzelhaendlerMapper(Mapper):

    def __init__(self):
        super().__init__()


    """ Mapper-Methode zum ausgeben aller Einzelhändler aus der Datenbank"""

    """Hier werden via SQL-Abfrage alle Einzelhändler aus der Datenbank ausgegeben.
       Anschließend werden aus den Zeilen der Datenbank (welche ein Objekt mit dessen Attributen darstellen) 
       mit der fetchall-Methode Tupel erstellt. 
       
       !!!NOCHMAL NACHSCHAUEN WAS DIE FETCHALL TECHNISCH GENAU MACHT!!!
       
       Mittels For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
       Klasse "Einzelhaendler" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
       Das Array mit allen Instanzen wird schließlich zurückgegeben."""

    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM einzelhaendler")
        res= cursor.fetchall()


        for (id, name, erstellungs_zeitpunkt, adresse) in res:

            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result.append(einzelhaendler)


        self._cnx.commit()
        cursor.close()

        return result


    """ Mapper-Methode zum speichern eines neuen Einzelhändlers in der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Einzelhaendler" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "einzelhaendler" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.
        
        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben
        
        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben.
        
        !!! WIESO KOMMT AM ENDE NOCHMALS EIN RETURN EINZELHAENDLER ? !!!
        """
    def insert(self, einzelhaendler):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM einzelhaendler ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                einzelhaendler.set_id(maxid[0] + 1)
            else:

                einzelhaendler.set_id(1)

        template = "INSERT INTO einzelhaendler (id, name, erstellungs_zeitpunkt, adresse) VALUES (%s,%s,%s,%s)"
        vals = (einzelhaendler.get_id(), einzelhaendler.get_name(), einzelhaendler.get_erstellungs_zeitpunkt(), einzelhaendler.get_adresse())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return einzelhaendler


    """ Mapper-Methode zum aktualisieren (der Attribute) eines Einzelhändlers in der Datenbank"""

    """ Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Einzelhaendler" übergeben
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden, 
        werden die Attribute der Instanz an das SQL-Statement übergeben."""

    def update(self, einzelhaendler):


        cursor = self._cnx.cursor()

        template = "UPDATE einzelhaendler " + "SET name=%s, adresse=%s WHERE id=%s"
        vals = (einzelhaendler.get_name(), einzelhaendler.get_adresse(), einzelhaendler.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()


    def delete(self, einzelhaendler):

        cursor = self._cnx.cursor()

        template = "DELETE FROM einzelhaendler WHERE id={}".format(einzelhaendler.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()


    def find_by_id(self, id):


        result = None

        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, adresse FROM einzelhaendler WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, adresse) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result = einzelhaendler
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
        command = "SELECT id, name, erstellungs_zeitpunkt, adresse FROM einzelhaendler WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, adresse) = tuples[0]
            einzelhaendler = Einzelhaendler()
            einzelhaendler.set_id(id)
            einzelhaendler.set_name(name)
            einzelhaendler.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            einzelhaendler.set_adresse(adresse)
            result = einzelhaendler
        except IndexError:
            """Der IndexError wird oben beim Zugriff auf tuples[0] auftreten, wenn der vorherige SELECT-Aufruf
            keine Tupel liefert, sondern tuples = cursor.fetchall() eine leere Sequenz zurück gibt."""
            result = None

        self._cnx.commit()
        cursor.close()

        return result