from abc import ABC


class BusinessObject(ABC):
    """Gemeinsame Basisklasse aller Klassen in bo.
    Dadurch besitzt jedes BusinessObject eine ID."""
    def __init__(self):
        self.__id = 0

    def set_id(self,id):
        """Auslesen der ID."""
        self.__id = id

    def get_id(self):
        """Setzen der ID."""
        return self.__id
