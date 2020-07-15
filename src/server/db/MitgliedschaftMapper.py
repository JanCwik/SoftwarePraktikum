from src.server.db.Mapper import Mapper
from src.server.bo.Anwenderverbund import Anwenderverbund
from src.server.bo.Einkaufsliste import Einkaufsliste
from src.server.bo.Benutzer import Benutzer


class MitgliedschaftMapper(Mapper):

    def __init__(self):
        super().__init__()

    def deleteByAnwenderverbund(self, anwenderverbund):
        """ Mapper-Methode zum löschen eines Anwenderverbunds aus der Datenbank.

        Beim Aufruf der Methode wird eine zuvor erstellte Instanz der Klasse "Anwenderverbund()" übergeben.
        Dann erfolgt ein SQL-Statement welches das Objekt aus der Datenbank löscht.
        Mittels der getter-Methode, welche zuvor in der entsprechenden Business-Object-Klasse definierten wurde,
        wird die entsprechende ID der Instanz an das SQL-Statement übergeben."""
        cursor = self._cnx.cursor()

        mitgliedschaftloeschen = "DELETE FROM mitgliedschaft WHERE anwenderverbund_id={}".format(
            anwenderverbund.get_id())
        cursor.execute(mitgliedschaftloeschen)

        self._cnx.commit()
        cursor.close()