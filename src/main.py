from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from src.server.ApplikationsAdministration import ApplikationsAdministration
from src.server.bo.Artikel import Artikel
from src.server.bo.Einzelhaendler import Einzelhaendler
from src.server.bo.Benutzer import Benutzer
from src.server.bo.Einkaufsliste import Einkaufsliste
from src.server.bo.Anwenderverbund import Anwenderverbund
from src.server.bo.Listeneintrag import Listeneintrag
from src.server.bo.Statistik import Statistik

from src.SecurityDecorator import secured

"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

app = Flask(__name__)

CORS(app)  # als zweiter parameter könnte man auch noch folgendes hinzufügen:
# , resources=r'/shopping/*'      oder    , resources={r"/shopping/*": {"origins": "*"}}

api = Api(app, version='1.0', title='ShoppingList API',
          description='Das ist unserer API für die Shoppinglist.')

shopping = api.namespace('shopping', description='Funktionen der Shoppinglist')

bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

namedBO = api.inherit('namedBO', bo, {
    'name': fields.String(attribute='_name', description='Name des namedBO'),
    'erstellungs_zeitpunkt': fields.String(attribute='_erstellungs_zeitpunkt', description='Erstellungszeitpunkt'),
})

artikel = api.inherit('Artikel', namedBO, {
    'einheit': fields.String(attribute='_einheit', description='Name eines Artikels'),
    'standardartikel': fields.Boolean(attribute='_standardartikel', description='Standardartikel'),
})

einzelhaendler = api.inherit('Einzelhandler', namedBO, bo)

benutzer = api.inherit('Benutzer', namedBO, {
    'email': fields.String(attribute='_email', description='Email des Benutzers'),
    'google_id': fields.String(attribute='_google_id', description='Google ID des Benutzers')
})

einkaufsliste = api.inherit('Einkaufsliste', namedBO, {
    'aenderungs_zeitpunkt': fields.String(attribute='_änderungs_zeitpunkt', description='Änderungszeitpunkt'),
    'anwenderverbund_id': fields.Integer(attribute='_anwenderverbund_id', description='ID des Anwenderverbundes')
})

anwenderverbund = api.inherit('Anwenderverbund', namedBO, bo)

listeneintrag = api.inherit('Listeneintrag', bo, {
    'menge': fields.Integer(attribute='_anzahl', description='Anzahl'),
    'erledigt': fields.Boolean(attribute='_erledigt', description='Status'),
    'aenderungs_zeitpunkt': fields.String(attribute='_änderungs_zeitpunkt', description='Änderungszeitpunkt'),
    'einkaufsliste_id': fields.Integer(attribute='_einkaufsliste_id', description='ID der Einkaufsliste'),
    'einzelhaendler_id': fields.Integer(attribute='_einzelhaendler_id', description='ID des Einzehändler'),
    'einzelhaendler_name': fields.String(attribute='_einzelhaendler_name', description='Name des Einzehändler'),
    'artikel_id': fields.Integer(attribute='_artikel_id', description='ID des Artikels'),
    'artikel_name': fields.String(attribute='_artikel_name', description='name des Artikels'),
    'artikel_einheit': fields.String(attribute='_artikel_einheit', description='Einheit des Artikels'),
    'benutzer_id': fields.Integer(attribute='_benutzer_id', description='ID des Benutzer'),
    'benutzer_name': fields.String(attribute='_benutzer_name', description='Name des Benutzer'),

})

# Statistik hinzugefügt, Maik
statistik = api.inherit('Statistik', {
    'gesamtzahl': fields.String(attribute='_gesamtzahl', description='Gesamtzahl wie oft der Artikel gekauft wurde'),
    'ArtikelID': fields.Integer(attribute='_ArtikelID', description='ID des Anwenderverbundes')
})


@shopping.route('/artikel')
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ArtikelListOperations(Resource):
    @shopping.marshal_list_with(artikel)
    @secured
    def get(self):
        """Auslesen aller Artikel"""
        adm = ApplikationsAdministration()
        artikel = adm.get_all_artikel()
        return artikel

    @shopping.marshal_with(artikel)
    @shopping.expect(artikel)
    @secured
    def post(self):
        """Anlegen eines Artikels"""
        adm = ApplikationsAdministration()

        test = Artikel.from_dict(api.payload)
        if test is not None:
            a = adm.artikel_anlegen(test.get_name(), test.get_einheit(), test.get_standardartikel())
            return a, 200
        else:
            return '', 500


@shopping.route('/artikel-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Artikels')
class ArtikelOperations(Resource):
    @shopping.marshal_with(artikel)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Artikel anhand einer id"""
        adm = ApplikationsAdministration()
        artikel = adm.get_artikel_by_id(id)
        return artikel

    @secured
    def delete(self, id):
        """Löschen eines Artikels anhand einer id"""
        adm = ApplikationsAdministration()
        artikel = adm.get_artikel_by_id(id)
        adm.delete_artikel(artikel)
        return ''

    @shopping.marshal_with(artikel)
    @shopping.expect(artikel)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Artikel"""

        adm = ApplikationsAdministration()
        a = Artikel.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_artikel(a)
            return '', 200
        else:
            return '', 500


@shopping.route('/artikel-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name des Artikels')
class ArtikelByNameOperations(Resource):
    @shopping.marshal_with(artikel)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Artikel anhand dessen Namen"""
        adm = ApplikationsAdministration()
        artikel = adm.get_artikel_by_name(name)
        return artikel


"""Artikel DONE -> no error. Listeneintrag NEXT"""


@shopping.route('/listeneintrag')
@shopping.response(500, 'Server-Error')
class ListeneintragOperations(Resource):
    @shopping.marshal_with(listeneintrag)
    @shopping.expect(listeneintrag)
    @secured
    def post(self):
        """Anlegen eines Listeneintrages
        adm = ApplikationsAdministration()

        test = Listeneintrag.from_dict(api.payload)

        # Hinzugefügt, da ganze Instanzen übergeben werden sollen, Maik
        einkaufsliste_id = test.get_einkaufslisteId()
        einkaufsliste = adm.get_einkaufsliste_by_id(einkaufsliste_id)

        # Hinzugefügt, da ganze Instanzen übergeben werden sollen, Maik
        einzelhaendler_id = test.get_einzelhaendlerId()
        einzelhaendler = adm.get_einzelhaendler_by_id(einzelhaendler_id)

        # Hinzugefügt, da ganze Instanzen übergeben werden sollen, Maik
        artikel_id = test.get_artikelId()
        artikel = adm.get_artikel_by_id(artikel_id)

        # Hinzugefügt, da ganze Instanzen übergeben werden sollen, Maik
        benutzer_id = test.get_benutzerId()
        benutzer = adm.get_benutzer_by_id(benutzer_id)

        if test is not None:
            a = adm.listeneintrag_anlegen(test.get_anzahl(), einkaufsliste, einzelhaendler, artikel, benutzer, test.get_erledigt())
            return a, 200
        else:
            return '', 500
            """

        # es geht doch auch einfach so: oder? Denn das listeneintragObjkt wird doch schon durch die from_dict methode in der main angelegt und dadurch
        # muss es nich nochmal in der Applikationsadmin gemacht werden, dh es reicht wenn das listenintrag objekt übergeben wird
        # Also ich habs getestet es geht, und Thies is ja so au zufrieden oder?

        adm = ApplikationsAdministration()

        test = Listeneintrag.from_dict(api.payload)
        if test is not None:
            a = adm.listeneintrag_anlegen(test)
            return a, 200
        else:
            return '', 500


@shopping.route('/listeneintrag-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Listeneintrages')
class ListeneintragOperations(Resource):
    @shopping.marshal_with(listeneintrag)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Listeneintrages anhand einer id"""
        adm = ApplikationsAdministration()
        listeneintrag = adm.get_listeneintrag_by_id(id)
        return listeneintrag

    # Zeigt namen nicht an!

    @secured
    def delete(self, id):
        """Löschen eines Listeneintrages anhand einer id"""
        adm = ApplikationsAdministration()
        listeneintrag = adm.get_listeneintrag_by_id(id)
        adm.delete_listeneintrag(listeneintrag)
        return ''

    @shopping.marshal_with(listeneintrag)
    @shopping.expect(listeneintrag)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Listeneintrag"""

        adm = ApplikationsAdministration()
        a = Listeneintrag.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_listeneintrag(a)
            return '', 200
        else:
            return '', 500


"""Listeneintrag DONE -> no error. Einzelhaendler NEXT"""


@shopping.route('/einzelhaendler')
@shopping.response(500, 'Serverfehler')
class EinzelhaendlerListOperations(Resource):
    @shopping.marshal_list_with(einzelhaendler)
    @secured
    def get(self):
        """Auslesen aller Einzelhändler"""
        adm = ApplikationsAdministration()
        einzelhaendler = adm.get_all_einzelhaendler()
        return einzelhaendler

    @shopping.marshal_with(einzelhaendler)
    @shopping.expect(einzelhaendler)
    @secured
    def post(self):
        """Anlegen eines Einzelhändlers"""
        adm = ApplikationsAdministration()

        test = Einzelhaendler.from_dict(api.payload)
        if test is not None:
            a = adm.einzelhaendler_anlegen(test.get_name(), test.get_id())
            return a, 200
        else:
            return '', 500


@shopping.route('/einzelhaendler-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Einzelhaendler')
class EinzelhaendlerOperations(Resource):
    @shopping.marshal_with(einzelhaendler)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Einzelhändlers anhand einer id"""
        adm = ApplikationsAdministration()
        einzelhaendler = adm.get_einzelhaendler_by_id(id)
        return einzelhaendler

    @secured
    def delete(self, id):
        """Löschen eines Einzelhändlers anhand einer id"""
        adm = ApplikationsAdministration()
        einzelhaendler = adm.get_einzelhaendler_by_id(id)
        adm.delete_einzelhaendler(einzelhaendler)
        return ''

    @shopping.marshal_with(einzelhaendler)
    @shopping.expect(einzelhaendler)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Einzelhändlers"""

        adm = ApplikationsAdministration()
        a = Einzelhaendler.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_einzelhaendler(a)
            return '', 200
        else:
            return '', 500


@shopping.route('/einzelhaendler-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name des Einzelhändler')
class ArtikelByNameOperations(Resource):
    @shopping.marshal_with(einzelhaendler)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Einzelhändlers anhand dessen Namen"""
        adm = ApplikationsAdministration()
        einzelhaendler = adm.get_einzelhaendler_by_name(name)
        return einzelhaendler


"""Einzelhändler DONE -> no error. Benutzer NEXT. """


@shopping.route('/benutzer')
@shopping.response(500, 'Serverfehler')
class BenutzerListOperations(Resource):
    @shopping.marshal_list_with(benutzer)
    @secured
    def get(self):
        """Auslesen aller Benutzer"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_all_artikel()
        return benutzer

    @shopping.marshal_with(benutzer)
    @shopping.expect(benutzer)
    @secured
    def post(self):
        """Anlegen eines Benutzers"""
        adm = ApplikationsAdministration()

        test = Benutzer.from_dict(api.payload)
        if test is not None:
            a = adm.benutzer_anlegen(test.get_name(), test.get_email(), test.get_google_id())
            return a, 200
        else:
            return '', 500


@shopping.route('/benutzer-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Benutzers')
class BenutzerOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Benutzers anhand einer id"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_id(id)
        return benutzer

    @secured
    def delete(self, id):
        """Löschen eines Benutzers anhand einer id"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_id(id)
        adm.delete_benutzer(benutzer)
        return ''

    @shopping.marshal_with(benutzer)
    @shopping.expect(benutzer)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Benutzer"""

        adm = ApplikationsAdministration()
        a = Benutzer.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_benutzer(a)
            return '', 200
        else:
            return '', 500


@shopping.route('/benutzer-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name des Benutzers')
class BenutzerByNameOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Benutzers anhand seines Namen"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_name(name)
        return benutzer


@shopping.route('/benutzer-by-email/<string:email>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class BenutzerByEmailOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, email):
        """Auslesen eines bestimmten Benutzers anhand seiner Email"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_email(email)
        return benutzer


@shopping.route('/benutzer/<int:id>/listeneintraege')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Benutzer')
class BenutzerRelatedListeneintragOperations(Resource):
    @shopping.marshal_with(listeneintrag)
    @secured
    def get(self, id):
        """Auslesen aller Listeneinträge für einen durch Id definierten Benutzer"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_id(id)

        if benutzer is not None:
            listeneintraege = adm.get_all_listeneintraege_of_benutzer(benutzer)
            return listeneintraege
        else:
            return "Benutzer nicht gefunden", 500


@shopping.route('/benutzer/<string:email>/anwenderverbuende')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class BenutzerRelatedAnwenderverbundOperations(Resource):
    @shopping.marshal_list_with(anwenderverbund)
    @secured
    def get(self, email):
        """Auslesen aller Anwenderverbünde für einen durch Id definierten Benutzer"""
        adm = ApplikationsAdministration()
        benutzer = adm.get_benutzer_by_email(email)

        if benutzer is not None:
            anwenderverbund_IDs = adm.get_anwenderverbuende_by_benutzer_email(benutzer)
            result = []
            for id in anwenderverbund_IDs:
                Anwenderverbund_objekt = adm.get_anwenderverbund_by_id(id)
                result.append(Anwenderverbund_objekt)
            return result
        else:
            return "Benutzer nicht gefunden", 500


"""Benutzer DONE -> no error. Einkaufsliste NEXT"""


@shopping.route('/einkaufsliste')
@shopping.response(500, 'Serverfehler')
class EinkaufslisteListOperations(Resource):
    @shopping.marshal_list_with(einkaufsliste)
    @secured
    def get(self):
        adm = ApplikationsAdministration()
        einkaufsliste = adm.get_all_all_einkaufslisten()
        return einkaufsliste


# ja diese Methode ist unnöti aber sie wird zurzeit vom frontend benutzt bis wir es richtig hinkriegen

@shopping.route('/einkaufsliste')
@shopping.response(500, 'Serverfehler')
class EinkaufslisteListOperations(Resource):
    @shopping.marshal_with(einkaufsliste)
    @shopping.expect(einkaufsliste)
    @secured
    def post(self):  # id von Einkaufsliste muss mit id von Anwenderverbund angegeben werden, sonst Server-Error!
        """Anlegen einer Einkaufsliste"""
        adm = ApplikationsAdministration()

        test = Einkaufsliste.from_dict(api.payload)
        if test is not None:
            a = adm.einkaufsliste_anlegen(test.get_name(), test.get_anwenderId())
            return a, 200
        else:
            return '', 500


@shopping.route('/einkaufsliste-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID der Einkaufsliste')
class EinkaufslisteOperations(Resource):
    @shopping.marshal_with(einkaufsliste)
    @secured
    def get(self, id):
        """Auslesen einer bestimmten Einkaufsliste anhand einer id"""
        adm = ApplikationsAdministration()
        einkaufsliste = adm.get_einkaufsliste_by_id(id)
        return einkaufsliste

    @secured
    def delete(self, id):
        """Löschen einer Einkaufsliste anhand einer id"""
        adm = ApplikationsAdministration()
        einkaufsliste = adm.get_einkaufsliste_by_id(id)
        adm.delete_einkaufsliste(einkaufsliste)
        return ''

    @shopping.marshal_with(einkaufsliste)
    @shopping.expect(einkaufsliste)
    @secured
    def put(self, id):
        """Update einer durch id bestimmten Einkaufsliste"""

        adm = ApplikationsAdministration()
        a = Einkaufsliste.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_einkaufsliste(a)
            return '', 200
        else:
            return '', 500


"""
@shopping.route('/einkaufsliste-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name der Einkaufsliste')
class EinkaufslisteByNameOperations(Resource):                                  #name evtl. nicht eindeutig
    @shopping.marshal_with(einkaufsliste)
    #@secured
    def get(self, name):
        "Auslesen einer bestimmten Einkaufsliste anhand dessen Namen"
        adm = ApplikationsAdministration()
        einkaufsliste = adm.get_einkaufsliste_by_name(name)
        return einkaufsliste
"""


# Suche per Name nicht sinnvoll da nicht eindeutig!

@shopping.route('/einkaufsliste/<int:id>/listeneintraege')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID der Einkaufsliste')
class EinkaufslisteRelatedListeneintraegeOperations(Resource):
    @shopping.marshal_with(listeneintrag)
    @secured
    def get(self, id):
        """Auslesen aller Listeneinträge in einem durch Id definierten Einkaufsliste"""
        adm = ApplikationsAdministration()
        liste = adm.get_einkaufsliste_by_id(id)

        if liste is not None:
            listeneintraege = adm.get_all_listeneintraege_of_einkaufslisten(liste)
            return listeneintraege
        else:
            return "Einkaufsliste nicht gefunden", 500


"""Einkaufsliste DONE -> no error. Anwenderverbund NEXT"""


@shopping.route('/anwenderverbund')
@shopping.response(500, 'Serverfehler')
class AnwenderverbundListOperations(Resource):
    @shopping.marshal_list_with(anwenderverbund)
    @secured
    def get(self):
        """Auslesen aller Anwenderverbünde"""
        adm = ApplikationsAdministration()
        anwenderverbund = adm.get_all_anwenderverbunde()
        return anwenderverbund

    @shopping.marshal_with(anwenderverbund)
    @shopping.expect(anwenderverbund)
    @secured
    def post(self):
        """Anlegen eines Anwenderverbundes"""
        adm = ApplikationsAdministration()

        test = Anwenderverbund.from_dict(api.payload)
        if test is not None:
            a = adm.anwenderverbund_anlegen(test.get_name())
            return a, 200
        else:
            return '', 500


@shopping.route('/anwenderverbund-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Anwenderverbundes')
class AnwenderverbundOperations(Resource):
    @shopping.marshal_with(anwenderverbund)
    @secured
    def get(self, id):
        """Auslesen eines bestimmten Anwenderverbundes anhand einer id"""
        adm = ApplikationsAdministration()
        anwenderverbund = adm.get_anwenderverbund_by_id(id)
        return anwenderverbund

    @secured
    def delete(self, id):
        """Löschen eines Anwenderverbundes anhand einer id"""
        adm = ApplikationsAdministration()
        anwenderverbund = adm.get_anwenderverbund_by_id(id)
        adm.delete_anwenderverbund(anwenderverbund)
        return ''

    @shopping.marshal_with(anwenderverbund)
    @shopping.expect(anwenderverbund)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Anwenderverbundes"""

        adm = ApplikationsAdministration()
        a = Anwenderverbund.from_dict(api.payload)

        if a is not None:
            a.set_id(id)
            adm.update_anwenderverbund(a)
            return '', 200
        else:
            return '', 500


@shopping.route('/anwenderverbund-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name des Anwenderverbundes')
class AnwenderverbundByNameOperations(Resource):
    @shopping.marshal_with(anwenderverbund)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Anwenderverbundes anhand dessen Namen"""
        adm = ApplikationsAdministration()
        anwenderverbund = adm.get_anwenderverbund_by_name(name)
        return anwenderverbund


@shopping.route('/anwenderverbund/<int:id>/einkauflisten')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Anwenderverbundes')
class AnwenderverbundRelatedEinkaufslisteOperations(Resource):
    @shopping.marshal_with(einkaufsliste)
    @secured
    def get(self, id):
        """Auslesen aller Einkaufslisten in einem durch Id definierten Anwenderverbund"""
        adm = ApplikationsAdministration()
        verbund = adm.get_anwenderverbund_by_id(id)

        if verbund is not None:
            einkaufslisten = adm.get_all_einkaufslisten_of_anwenderverbund(verbund)
            return einkaufslisten
        else:
            return "Anwenderverbund nicht gefunden", 500


@shopping.route('/anwenderverbund/<int:id>/mitglieder')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Anwenderverbundes')
class AnwenderverbundRelatedBenutzerOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, id):
        """Auslesen aller Mitglieder in einem durch Id definierten Anwenderverbund"""
        adm = ApplikationsAdministration()
        verbund = adm.get_anwenderverbund_by_id(id)

        if verbund is not None:

            mitgliederID = adm.mitglieder_zum_anwenderverbund_ausgeben(verbund)
            benutzeObjekte = []
            for i in mitgliederID:
                benutzeObjekt = adm.get_benutzer_by_id(i)
                benutzeObjekte.append(benutzeObjekt)
            return benutzeObjekte
        else:
            return "Anwenderverbund nicht gefunden", 500

    @shopping.marshal_with(benutzer)
    @shopping.expect(benutzer)
    @secured
    def post(self, id):
        """Hinzufügen eines Benutzers in einem Anwenderverbund"""
        adm = ApplikationsAdministration()

        verbund = adm.get_anwenderverbund_by_id(id)
        mitglied = Benutzer.from_dict(api.payload)
        if verbund is not None:
            adm.mitglieder_zum_anwenderverbund_hinzufügen(verbund, mitglied)
            return mitglied
        else:
            return "Benutzer oder Anwenderverbund unbekannt", 500

    @shopping.marshal_with(benutzer)
    @shopping.expect(benutzer)
    @secured
    def delete(self, id):
        """Löschen eines Benutzers in einem Anwenderverbund"""
        adm = ApplikationsAdministration()

        verbund = adm.get_anwenderverbund_by_id(id)
        mitglied = Benutzer.from_dict(api.payload)
        if verbund is not None:
            adm.mitglieder_vom_anwenderverbund_entfernen(verbund, mitglied)  # Name der Methode geändert,Maik
            return mitglied
        else:
            return "Benutzer oder Anwenderverbund unbekannt", 500


"""Anwenderverbund DONE -> no error"""

"""Statistik-Methoden, Maik"""


@shopping.route('/statistik')
@shopping.response(500, 'Serverfehler')
class StatistikGetTopArtikelOperations(Resource):
    @shopping.marshal_list_with(statistik)
    @secured
    def get(self):
        """Auslesen der meist gekauften Artikel"""
        adm = ApplikationsAdministration()
        statistik = adm.statistik()

        return statistik


if __name__ == '__main__':
    app.run(debug=True)