from BusinessLogic import namedBO


class Artikel (namedBO):
    def __init__(self):
        super().__init__()
        self._first_name = ""  # Der Vorname des Kunden.
        self._last_name = ""  # Der Nachname des Kunden.

    def get_first_name(self):
        """Auslesen des Vornamens."""
        return self._first_name

    def set_first_name(self, value):
        """Setzen des Vornamens."""
        self._first_name = value