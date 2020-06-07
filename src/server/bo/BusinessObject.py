from abc import ABC


class BusinessObject(ABC):
    def __init__(self):
        self._id = 0   # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.

    def set_id(self,id):

        self._id = id

    def get_id(self):

        return self._id
