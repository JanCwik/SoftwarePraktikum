import mysql.connector
from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self._cnx =None

    def __enter__(self):

        self._cnx= mysql.connector.connect(user='root', password='Passwort479',host='127.0.0.1', database='shoppinglist')

        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()
