from src.server.db.Mapper import Mapper
#from src_2.server.bo.Artikel import Artikel


class Artikel():
    def __init__(self):
        self._einheit = ""
        self._standardartikel = False
        self._id = 0  # Die eindeutige Identifikationsnummer einer Instanz dieser Klasse.

        self._erstellungs_zeitpunkt = ""
        self._name = ""

    def set_erstellungs_zeitpunkt(self, erstellungs_zeitraum):
        self._erstellungs_zeitpunkt = erstellungs_zeitraum

    def get_erstellungs_zeitpunkt(self):
        return self._erstellungs_zeitpunkt

    def set_name(self, name):
        self._name = name

    def get_name(self):
        return self._name

    def set_id(self, id):
        """Setzen der ID."""
        self._id = id

    def get_id(self):
        """Auslesen der ID."""
        return self._id

    def set_einheit(self, einheit):
        self._einheit = einheit

    def get_einheit(self):
        return self._einheit

    def set_standardartikel(self):
        self._standardartikel = True

    def get_standardartikel(self):
        return self._standardartikel


bier= Artikel()
bier.set_standardartikel()
bier.set_einheit("liter")
bier.set_name("Bier")
bier.set_erstellungs_zeitpunkt("2020-05-16 15:15:15")


class ArtikelMapper(Mapper):

    def __init__(self):
        super().__init__()


    def find_all(self):

        result = []
        cursor = self._cnx.cursor()
        cursor.execute("SELECT * FROM artikel")
        res= cursor.fetchall()


    #   for (id, owner) in res:

    #       artikel = Artikel()
     #       account.set_id(id)
      #      account.set_owner(owner)
       #     result.append(account)



        print(res)




        self._cnx.commit()
        cursor.close()
        return result

    def insert(self, artikel):

        cursor = self._cnx.cursor()
        cursor.execute("SELECT MAX(id) AS maxid FROM artikel ")
        ins = cursor.fetchall()

        for (maxid) in ins:
            if maxid[0] is not None:

                artikel.set_id(maxid[0] + 1)
            else:

                artikel.set_id(1)

        template = "INSERT INTO artikel (id, name, erstellungs_zeitpunkt, einheit, standardartikel) VALUES (%s,%s,%s,%s,%s)"
        vals = (artikel.get_id(), artikel.get_name(), artikel.get_erstellungs_zeitpunkt(), artikel.get_einheit(), artikel.get_standardartikel())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

        return artikel

    def update(self, artikel):

        cursor = self._cnx.cursor()

        template = "UPDATE artikel " + "SET name=%s, einheit=%s, standardartikel=%s WHERE id=%s"
        vals = (artikel.get_name(), artikel.get_einheit(), artikel.get_standardartikel, artikel.get_id())
        cursor.execute(template, vals)

        self._cnx.commit()
        cursor.close()

    def delete(self, artikel):

        cursor = self._cnx.cursor()

        template = "DELETE FROM artikel WHERE id={}".format(artikel.get_id())
        cursor.execute(template)

        self._cnx.commit()
        cursor.close()








with ArtikelMapper() as mapper:
    mapper.insert(bier)
    mapper.find_all()





