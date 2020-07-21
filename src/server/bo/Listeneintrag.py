from .BusinessObject import BusinessObject
import datetime


class Listeneintrag(BusinessObject):
    def __init__(self):
        super().__init__()
        self._anzahl = None
        self._erledigt = False
        self._aenderungs_zeitpunkt = datetime.datetime.now()
        self._einkaufsliste_id = None
        self._einzelhaendler_id = None
        self._einzelhaendler_name = None
        self._artikel_id = None
        self._artikel_name = None
        self._artikel_einheit = None
        self._benutzer_id = None
        self._benutzer_name = None
        self._zuletzt_geaendert= False

    def set_zuletzt_geaendert(self, zuletzt_geaendert):
        """Setzen des zuletztgeaendert Datums"""
        self._zuletzt_geaendert = zuletzt_geaendert

    def get_zuletzt_geaendert(self):
        """Auslesen des zuletztgeaendert Datums"""
        return self._zuletzt_geaendert

    def set_anzahl(self, anzahl):
        """Setzen der Anzahl"""
        self._anzahl = anzahl

    def get_anzahl(self):
        """Auslesen der Anzahl"""
        return self._anzahl

    def set_erledigt(self, status):
        """Setzen des Status erledigt"""
        self._erledigt = status

    def get_erledigt(self):
        """Auslesen von dem Status erledigt"""
        return self._erledigt

    def set_aenderungs_zeitpunkt(self, aenderungs_zeitpunkt):
        """Setzen des Aenderungszeitpunkt"""
        self._aenderungs_zeitpunkt = aenderungs_zeitpunkt

    def get_aenderungs_zeitpunkt(self):
        """Auslesen des Aenderungszeitpunkt"""
        return self._aenderungs_zeitpunkt

    def set_aenderungs_zeitpunkt_now(self):
        """Setzen des Änderungszeitpunkt"""
        self._aenderungs_zeitpunkt = datetime.datetime.now()

    def set_einkaufslisteId(self, einkaufslisteID):
        """Setzen der einkaufsliste_id"""
        self._einkaufsliste_id = einkaufslisteID

    def get_einkaufslisteId(self):
        """Auslesen der einkaufsliste_id"""
        return self._einkaufsliste_id

    def set_einzelhaendlerId(self, einzelhaendlerId):
        """Setzen der einzelhaendler_id"""
        self._einzelhaendler_id = einzelhaendlerId

    def get_einzelhaendlerId(self):
        """Auslesen der einzelhaendler_id"""
        return self._einzelhaendler_id

    def set_einzelhaendler_name(self, name):
        """Setzen des Einzelhaendlernames"""
        self._einzelhaendler_name = name

    def get_einzelhaendler_name(self):
        """Auslesen des Einzelhaendlernames"""
        return self._einzelhaendler_name

    def set_artikelId(self, artikelId):
        """Setzen der artikel_id"""
        self._artikel_id = artikelId

    def get_artikelId(self):
        """Auslesen der artikel_id"""
        return self._artikel_id

    def set_artikel_name(self, name):
        """Setzen des Artikelnamens"""
        self._artikel_name = name

    def get_artikel_name(self):
        """Auslesen des Artikelnamens"""
        return self._artikel_name

    def set_artikel_einheit(self, einheit):
        """Setzen der Artikel_einheit"""
        self._artikel_einheit = einheit

    def get_artikel_einheit(self):
        """Auslesen der Artikel_einheit"""
        return self._artikel_einheit

    def set_benutzerId(self, benutzerId):
        """Setzen der benutzer_id"""
        self._benutzer_id = benutzerId

    def get_benutzerId(self):
        """Auslesen der benutzer_id"""
        return self._benutzer_id

    def set_benutzer_name(self, name):
        """Setzen des Benutzernamens"""
        self._benutzer_name = name

    def get_benutzer_name(self):
        """Auslesen des Benutzernamens"""
        return self._benutzer_name

    def __str__(self):
        """Erzeugen einer einfachen textuellen Darstellung der jeweiligen Instanz."""
        return "Listeneintrag: {}, {}, {}, {}, {}, {}, {}, {},{}, {}, {}, {},{}".format(self.get_id(), self._anzahl,
                                                                                        self._erledigt,
                                                                                        self._aenderungs_zeitpunkt,
                                                                                        self._einkaufsliste_id,
                                                                                        self._einzelhaendler_id,
                                                                                        self._artikel_id,
                                                                                        self._benutzer_id,
                                                                                        self._artikel_name,
                                                                                        self._einzelhaendler_name,
                                                                                        self._artikel_einheit,
                                                                                        self._benutzer_name,
                                                                                        self._zuletzt_geaendert)

    @staticmethod
    def from_dict(dictionary=dict()):
        """Einen Python dict() in einen Listeneintrag() umwandeln."""
        obj = Listeneintrag()
        obj.set_id(dictionary["id"])
        obj.set_anzahl(dictionary["menge"])
        obj.set_erledigt(dictionary["erledigt"])
        obj.set_einkaufslisteId(dictionary["einkaufsliste_id"])
        obj.set_einzelhaendlerId(dictionary["einzelhaendler_id"])
        obj.set_einzelhaendler_name(dictionary["einzelhaendler_name"])
        obj.set_artikelId(dictionary["artikel_id"])
        obj.set_artikel_name(dictionary["artikel_name"])
        obj.set_artikel_einheit(dictionary["artikel_einheit"])
        obj.set_benutzerId(dictionary["benutzer_id"])
        obj.set_benutzer_name(dictionary["benutzer_name"])
        obj.set_zuletzt_geaendert(dictionary["zuletzt_geaendert"])
        return obj
