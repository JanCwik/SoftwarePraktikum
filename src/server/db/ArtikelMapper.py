from server.db.Mapper import Mapper
from server.bo.Artikel import Artikel


class ArtikelMapper(Mapper):

    def __init__(self):
        super().__init__()

    def find_all(self):
        """Mapper-Methode zum ausgeben aller Artikel aus der Datenbank

        Hier werden via SQL-Abfrage alle Anwenderverbunde aus der Datenbank ausgegeben.
        Die Anwenderverbund-Objekte werden anschließend von der fetchall()-Methode als Tupel zurückgegeben.
        Mittels einer For-Schleife werden die einzelnen Attribute aus einem Tupel gezogen und einer neuen Instanz der
        Klasse "Anwenderverbund()" übergeben. Die einzelnen Instanzen werden in einem Array gespeichert.
        Das Array mit allen Instanzen wird schließlich zurückgegeben."""
        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id FROM artikel")
        res = cursor.fetchall()

        for (id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id) in res:
            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_standardartikel(standardartikel)
            artikel.set_einheit(einheit)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            artikel.set_benutzer_id(benutzer_id)
            result.append(artikel)

        self._cnx.commit()
        cursor.close()

        return result

    def insert(self, artikel):
        """ Mapper-Methode zum speichern eines neuen Artikels in der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Artikel()" übergeben.
        Anschließend wird via SQL-Abfrage die höchste ID aus der Tabelle "artikel" ausgegeben und dann
        mit der fetchall-Methode in einem Tupel gespeichert.

        Mit einer for-schleife wird anschließend geschaut ob bereits eine ID in der Tabelle vorhanden ist.
        Falls ja, wird diese genommen und um +1 hochgezählt und anschließend der Instanz, welche in der Datenbank gespeichert
        werden soll übergeben.
        Falls noch keine ID in der Tabelle vorhanden sein sollte, wird die Zahl 1 an die Instanz weitergegeben

        Dann erfolgt erneut ein SQL-Statement welches die Instanz in der Datenbank speichert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM artikel ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:
                artikel.set_id(maxid[0] + 1)
            else:
                artikel.set_id(1)

        template = "INSERT INTO artikel (id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id) VALUES (%s,%s,%s,%s,%s,%s)"
        vals = (artikel.get_id(), artikel.get_name(), artikel.get_erstellungs_zeitpunkt(), artikel.get_einheit(), artikel.get_standardartikel(), artikel.get_benutzer_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return artikel

    def update(self, artikel):
        """ Mapper-Methode zum aktualisieren (der Attribute) eines Artikels in der Datenbank.

        Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Artikel()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt in der Datenbank aktualisiert.
        Mittels der getter-Methoden, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurden,
        werden die Attribute der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        template = "UPDATE artikel " + "SET name=%s, einheit=%s, standardartikel=%s WHERE id=%s"
        vals = (artikel.get_name(), artikel.get_einheit(), artikel.get_standardartikel(), artikel.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def delete(self, artikel):
        """ Mapper-Methode zum löschen eines Artikels aus der Datenbank.

        Beim Aufruf Methode wird eine zuvor erstellte Instanz der Klasse "Artikel()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde,
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben.."""
        cursor = self._cnx.cursor()

        template = "DELETE FROM artikel WHERE id={}".format(artikel.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()

    def find_by_id(self, id):
        """ Mapper-Methode zum ausgeben eines Artikels anhand dessen ID.

        Beim Aufruf Methode wird eine ID in der Variablen "id" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Artikel-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand der ID kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id FROM artikel WHERE id={}".format(id)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id) = tuples[0]
            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            artikel.set_einheit(einheit)
            artikel.set_standardartikel(standardartikel)
            artikel.set_benutzer_id(benutzer_id)
            result = artikel
        except IndexError:
            result = None

        self._cnx.commit()
        cursor.close()

        return result

    def find_by_name(self, name):
        """ Mapper-Methode zum ausgeben eines Artikels anhand dessen Name.

        Beim Aufruf Methode wird ein Name in der Variablen "name" gespeichert, welche schließlich an das SQL-Statement übergeben wird.
        Das entsprechende Objekt, welches aus der Datenbank ausgegeben wird, wird in einem Tupel gespeichert.
        Anschließend werden die einzelnen Attribute aus dem Tupel an der Stelle 0 genommen und an eine neue Artikel-Instanz via
        den Setter-Methoden übergeben.
        Sollte die Datenbank anhand des Namens kein Objekt zurückliefern, wird ausgegeben was innerhalb des IndexErrors steht --> None
        Das Ergebnis wir schließlich von der Mehtode zurückgegeben."""
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id FROM artikel WHERE name LIKE '{}' ORDER BY name".format(name)
        cursor.execute(command)
        tuples = cursor.fetchall()

        try:
            (id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id) = tuples[0]
            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            artikel.set_einheit(einheit)
            artikel.set_standardartikel(standardartikel)
            artikel.set_benutzer_id(benutzer_id)
            result = artikel
        except IndexError:
            result = []

        self._cnx.commit()
        cursor.close()

        return result

    def find_all_artikel_of_benutzer(self, benutzer):
        """Mapper-Methode zum ausgeben aller Artikel aus der Datenbank welche zu einem bestimmten Benutzer gehören"""
        result = []
        cursor = self._cnx.cursor()
        command = "SELECT id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id FROM artikel WHERE benutzer_id={}".format(benutzer.get_id())
        cursor.execute(command)
        res = cursor.fetchall()

        for (id, name, erstellungs_zeitpunkt, einheit, standardartikel, benutzer_id) in res:
            artikel = Artikel()
            artikel.set_id(id)
            artikel.set_name(name)
            artikel.set_standardartikel(standardartikel)
            artikel.set_einheit(einheit)
            artikel.set_erstellungs_zeitpunkt(erstellungs_zeitpunkt)
            artikel.set_benutzer_id(benutzer_id)
            result.append(artikel)

        self._cnx.commit()
        cursor.close()

        return result


    def get_id_from_standardartikel(self):
        id_standard = True

        cursor = self._cnx.cursor()
        command = "SELECT id FROM artikel WHERE standardartikel={}".format(id_standard)
        cursor.execute(command)
        tuples = cursor.fetchall()

        return tuples

    def get_artikelname_for_listeneintrag(self, eintraege):
        cursor = self._cnx.cursor()

        cursor.execute("SELECT name FROM artikel WHERE id={}".format(eintraege.get_artikelId()))
        artikelname_tuple = cursor.fetchall()[0]
        name_string = artikelname_tuple[0]
        eintraege.set_artikel_name(name_string)

        self._cnx.commit()
        cursor.close()


    def get_artikeleinheit_for_listeneintrag(self, eintraege):
        cursor = self._cnx.cursor()

        cursor.execute("SELECT einheit FROM artikel WHERE id={}".format(eintraege.get_artikelId()))
        einheitname_tuple = cursor.fetchall()[0]
        name_string = einheitname_tuple[0]
        eintraege.set_artikel_einheit(name_string)

        self._cnx.commit()
        cursor.close()