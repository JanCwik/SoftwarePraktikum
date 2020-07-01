from src.server.bo.BusinessObject import BusinessObject
from abc import ABC
import datetime


class NamedBO(BusinessObject, ABC):
    """Gemeinsame Basisklasse aller Klassen in bo.
    Dadurch besitzt jedes BusinessObject außer Listeneintrag
    einen Namen und einen Erstellungszeitpunkt."""
    def __init__(self):
        super().__init__()
        self.__erstellungs_zeitpunkt = datetime.datetime.now()
        self.__name = ""

    def set_erstellungs_zeitpunkt(self, erstellungs_zeitpunkt):
        """Setzen des Erstellungszeitpunkt"""
        self.__erstellungs_zeitpunkt = erstellungs_zeitpunkt

    def get_erstellungs_zeitpunkt(self):
        """Auslesen des Erstellungszeitpunkt"""
        return self.__erstellungs_zeitpunkt

    def set_name(self, name):
        """Setzen des Namens"""
        self.__name = name

    def get_name(self):
        """Auslesen des Namens"""
        return self.__name
