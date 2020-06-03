from abc import ABC, abstractmethod


class BusinessObject(ABC):
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_id(self,id):
        """Setzen der ID."""
        self._id = id