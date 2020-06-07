from src.server.bo.BusinessObject import BusinessObject
from abc import ABC
import datetime


class NamedBO(BusinessObject, ABC):
    def __init__(self):
        super().__init__()
        self._erstellungs_zeitpunkt = datetime.datetime.now()
        self._name = ""

    def set_erstellungs_zeitpunkt(self, erstellungs_zeitpunkt):
        self._erstellungs_zeitpunkt = erstellungs_zeitpunkt

    def get_erstellungs_zeitpunkt(self):
        return self._erstellungs_zeitpunkt

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name
