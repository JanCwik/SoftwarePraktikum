import mysql.connector as connector
import os
from abc import ABC, abstractmethod
from contextlib import AbstractContextManager

class Mapper (AbstractContextManager, ABC):

    def __init__(self):
        self._cnx = None

    def __enter__(self):

        if os.getenv('GAE_ENV', '').startswith('standard'):
            """Landen wir in diesem Zweig, so haben wir festgestellt, dass der Code in der Cloud abläuft.
            Die App befindet sich somit im **Production Mode** und zwar im *Standard Environment*.
            Hierbei handelt es sich also um die Verbindung zwischen Google App Engine und Cloud SQL."""

            self._cnx = connector.connect(user='maik', password='maik',
                                          unix_socket='/cloudsql/shoppinglist2020:europe-west3:shoppinglist2020',
                                          database='shoppinglist')
        else:
            """Wenn wir hier ankommen, dann handelt sich offenbar um die Ausführung des Codes in einer lokalen Umgebung,
            also auf einem Local Development Server. Hierbei stellen wir eine einfache Verbindung zu einer lokal
            installierten mySQL-Datenbank her."""

            self._cnx = connector.connect(user='root', password='1234',
                                  host='127.0.0.1',
                                  database='shoppinglist')


        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        self._cnx.close()