from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from server.ApplikationsAdministration import ApplikationsAdministration
from server.bo.Artikel import Artikel
from server.bo.Einzelhaendler import Einzelhaendler
from server.bo.Benutzer import Benutzer
from server.bo.Einkaufsliste import Einkaufsliste
from server.bo.Anwenderverbund import Anwenderverbund
from server.bo.Listeneintrag import Listeneintrag
from SecurityDecorator import secured


"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

app = Flask(__name__)

CORS(app, resources=r"/shopping/*")

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
    'benutzer_id': fields.Integer(attribute='_benutzer_id', description='BenutzerID'),
})

einzelhaendler = api.inherit('Einzelhandler', namedBO, bo)

benutzer = api.inherit('Benutzer', namedBO, {
    'email': fields.String(attribute='_email', description='Email des Benutzers'),
    'google_id': fields.String(attribute='_google_id', description='Google ID des Benutzers')
})

einkaufsliste = api.inherit('Einkaufsliste', namedBO, {
    'aenderungs_zeitpunkt': fields.String(attribute='_aenderungs_zeitpunkt', description='Änderungszeitpunkt'),
    'anwenderverbund_id': fields.Integer(attribute='_anwenderverbund_id', description='ID des Anwenderverbundes')
})

anwenderverbund = api.inherit('Anwenderverbund', namedBO, bo)

listeneintrag = api.inherit('Listeneintrag', bo, {
    'menge': fields.Integer(attribute='_anzahl', description='Anzahl'),
    'erledigt': fields.Boolean(attribute='_erledigt', description='Status'),
    'aenderungs_zeitpunkt': fields.String(attribute='_aenderungs_zeitpunkt', description='Änderungszeitpunkt'),
    'einkaufsliste_id': fields.Integer(attribute='_einkaufsliste_id', description='ID der Einkaufsliste'),
    'einzelhaendler_id': fields.Integer(attribute='_einzelhaendler_id', description='ID des Einzehändler'),
    'einzelhaendler_name': fields.String(attribute='_einzelhaendler_name', description='Name des Einzehändler'),
    'artikel_id': fields.Integer(attribute='_artikel_id', description='ID des Artikels'),
    'artikel_name': fields.String(attribute='_artikel_name', description='name des Artikels'),
    'artikel_einheit': fields.String(attribute='_artikel_einheit', description='Einheit des Artikels'),
    'benutzer_id': fields.Integer(attribute='_benutzer_id', description='ID des Benutzer'),
    'benutzer_name': fields.String(attribute='_benutzer_name', description='Name des Benutzer'),
    'zuletzt_geaendert': fields.Boolean(attribute='_zuletzt_geaendert', description='zuletzt_geaendert'),

})

statistik = api.inherit('Statistik', {
    'ArtikelName': fields.String(attribute='_ArtikelName', description='Name des Artikels'),
    'GesamtAnzahl': fields.Integer(attribute='_anzahl', description='Gesamtanzahl wie oft der Artikel gekauft wurde'),
    'ArtikelID': fields.Integer(attribute='_ArtikelID', description='ID des Artikels')
})

statistikhaendler = api.inherit('StatistikHaendler', statistik, {
    'EinzelhaendlerName': fields.String(attribute='_Einzelhaendler_name', description='Name des Einzelhändlers'),
    'EinzelhaendlerID': fields.Integer(attribute='_Einzelhaendler_id', description='ID des Einzelhändlers')
})

statistikzeitraum = api.inherit('StatistikZeitraum', statistik, {
    'Zeitpunkt': fields.String(attribute='_zeitpunkt', description='Zugriffszeitpunkt'),
    'StartZeitpunkt': fields.String(attribute='_startzeitpunkt', description='Starrtzeitpunkt des Filters'),
    'EndZeitpunkt': fields.String(attribute='_endzeitpunkt', description='Endzeitpunkt des Filters')
})

statistikhuz = api.inherit('StatistikHuZ', statistik, {
    'Zeitpunkt': fields.String(attribute='_zeitpunkt', description='Zugriffszeitpunkt'),
    'StartZeitpunkt': fields.String(attribute='_startzeitpunkt', description='Starrtzeitpunkt des Filters'),
    'EndZeitpunkt': fields.String(attribute='_endzeitpunkt', description='Endzeitpunkt des Filters'),
    'EinzelhaendlerName': fields.String(attribute='_Einzelhaendler_name', description='Name des Einzelhändlers'),
    'EinzelhaendlerID': fields.Integer(attribute='_Einzelhaendler_id', description='ID des Einzelhändlers')
})

@shopping.route('/artikel')
@shopping.response(500, 'Serverfehler')
class ArtikelListOperations(Resource):

    @shopping.marshal_with(artikel)
    @shopping.expect(artikel)
    @secured
    def post(self):
        """Anlegen eines Artikels"""
        adm = ApplikationsAdministration()

        test = Artikel.from_dict(api.payload)
        if test is not None:
            a = adm.artikel_anlegen(test)
            return a, 200
        else:
            return '', 500


@shopping.route('/artikel-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Artikels')
class ArtikelOperations(Resource):

    @secured
    def delete(self, id):
        """Löschen eines Artikels anhand einer id"""
        adm = ApplikationsAdministration()
        article = adm.get_artikel_by_id(id)
        adm.delete_artikel(article)
        return '', 200

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
        article = adm.get_artikel_by_name(name)
        return article


"""Artikel DONE -> no error. Listeneintrag NEXT"""


@shopping.route('/listeneintrag')
@shopping.response(500, 'Serverfehler')
class ListeneintragListOperations(Resource):
    @shopping.marshal_with(listeneintrag)
    @shopping.expect(listeneintrag)
    @secured
    def post(self):
        """Anlegen eines Listeneintrages"""

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
    def delete(self, id):
        """Löschen eines Listeneintrages anhand einer id"""
        adm = ApplikationsAdministration()
        eintrag = adm.get_listeneintrag_by_id(id)
        adm.delete_listeneintrag(eintrag)
        return eintrag

    @shopping.marshal_with(listeneintrag)
    @shopping.expect(listeneintrag)
    @secured
    def put(self, id):
        """Update eines durch eine id bestimmten Listeneintrag"""

        adm = ApplikationsAdministration()
        eintrag = Listeneintrag.from_dict(api.payload)

        if eintrag is not None:
            eintrag.set_id(id)
            eintrag.set_aenderungs_zeitpunkt_now()
            new_eintrag = adm.update_listeneintrag(eintrag)
            return new_eintrag , 200
        else:
            return '', 500


"""Listeneintrag DONE -> no error. Einzelhaendler NEXT"""


@shopping.route('/einzelhaendler/<string:email>')
@shopping.response(500, 'Serverfehler')
class EinzelhaendlerByBenutzerMailOperations(Resource):
    @shopping.marshal_list_with(einzelhaendler)
    @secured
    def get(self, email):
        """Auslesen aller Einzelhändler anhand einer Benutzer-Email"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)
        haendler = adm.get_all_einzelhaendler(user)
        return haendler


@shopping.route('/einzelhaendler')
@shopping.response(500, 'Serverfehler')
class EinzelhaendlerListOperations(Resource):
    @shopping.marshal_with(einzelhaendler)
    @shopping.expect(einzelhaendler)
    @secured
    def post(self):
        """Anlegen eines Einzelhändlers"""
        adm = ApplikationsAdministration()

        test = Einzelhaendler.from_dict(api.payload)
        if test is not None:
            a = adm.einzelhaendler_anlegen(test)
            return a, 200
        else:
            return '', 500


@shopping.route('/einzelhaendler-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID des Einzelhaendler')
class EinzelhaendlerOperations(Resource):

    @secured
    def delete(self, id):
        """Löschen eines Einzelhändlers anhand einer id"""
        adm = ApplikationsAdministration()
        haendler = adm.get_einzelhaendler_by_id(id)
        adm.delete_einzelhaendler(haendler)
        return '', 200

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
class EinzelhaendlerByNameOperations(Resource):
    @shopping.marshal_with(einzelhaendler)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Einzelhändlers anhand dessen Namen"""
        adm = ApplikationsAdministration()
        haendler = adm.get_einzelhaendler_by_name(name)
        return haendler


"""Einzelhändler DONE -> no error. Benutzer NEXT. """


@shopping.route('/benutzer')
@shopping.response(500, 'Serverfehler')
class BenutzerListOperations(Resource):

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


@shopping.route('/benutzer-by-name/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('name', 'Name des Benutzers')
class BenutzerByNameOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, name):
        """Auslesen eines bestimmten Benutzers anhand seines Namen"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_name(name)
        return user


@shopping.route('/benutzer-by-email/<string:email>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class BenutzerByEmailOperations(Resource):
    @shopping.marshal_with(benutzer)
    @secured
    def get(self, email):
        """Auslesen eines bestimmten Benutzers anhand seiner Email"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)
        return user



@shopping.route('/benutzer/<string:email>/artikel')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class BenutzerRelatedArtikelOperations(Resource):
    @shopping.marshal_with(artikel)
    @secured
    def get(self, email):
        """Auslesen aller Artikel, die zu einem Benutzer gehören"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)

        if user is not None:
            article = adm.get_all_artikel_of_benutzer(user)
            return article
        else:
            return "Benutzer nicht gefunden", 500


@shopping.route('/benutzer/<string:email>/anwenderverbuende')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class BenutzerRelatedAnwenderverbundOperations(Resource):
    @shopping.marshal_list_with(anwenderverbund)
    @secured
    def get(self, email):
        """Auslesen aller Anwenderverbünde für einen durch Email definierten Benutzer"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)

        if benutzer is not None:
            anwenderverbund_ids = adm.get_anwenderverbuende_by_benutzer_email(user)
            result = []
            for i in anwenderverbund_ids:
                anwenderverbund_objekt = adm.get_anwenderverbund_by_id(i)
                result.append(anwenderverbund_objekt)
            return result
        else:
            return "Benutzer nicht gefunden", 500


"""Benutzer DONE -> no error. Einkaufsliste NEXT"""


@shopping.route('/einkaufsliste/<string:email>')
@shopping.response(500, 'Serverfehler')
class EinkaufslisteByBenutzerListOperations(Resource):
    @shopping.marshal_with(einkaufsliste)
    @shopping.expect(einkaufsliste)
    @secured
    def post(self, email):
        """Anlegen einer Einkaufsliste"""
        adm = ApplikationsAdministration()

        user = adm.get_benutzer_by_email(email)
        test = Einkaufsliste.from_dict(api.payload)
        if test is not None:
            a = adm.einkaufsliste_anlegen(test, user)
            return a, 200
        else:
            return '', 500


@shopping.route('/einkaufsliste-by-id/<int:id>')
@shopping.response(500, 'Serverfehler')
@shopping.param('id', 'ID der Einkaufsliste')
class EinkaufslisteOperations(Resource):
    @secured
    def delete(self, id):
        """Löschen einer Einkaufsliste anhand einer id"""
        adm = ApplikationsAdministration()
        liste = adm.get_einkaufsliste_by_id(id)
        adm.delete_einkaufsliste(liste)
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
    @secured
    def delete(self, id):
        """Löschen eines Anwenderverbundes anhand einer id"""
        adm = ApplikationsAdministration()
        verbund = adm.get_anwenderverbund_by_id(id)
        adm.delete_anwenderverbund(verbund)
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

            mitglieder_id = adm.mitglieder_zum_anwenderverbund_ausgeben(verbund)
            benutze_objekte = []
            for i in mitglieder_id:
                benutze_objekt = adm.get_benutzer_by_id(i)
                benutze_objekte.append(benutze_objekt)
            return benutze_objekte
        else:
            return "Anwenderverbund nicht gefunden", 500

    @shopping.marshal_with(benutzer)
    @shopping.expect(benutzer)
    @secured
    def post(self, id):
        """Hinzufügen eines Benutzers in einen Anwenderverbund"""
        adm = ApplikationsAdministration()

        verbund = adm.get_anwenderverbund_by_id(id)
        mitglied = Benutzer.from_dict(api.payload)
        if verbund is not None:
            adm.mitglieder_zum_anwenderverbund_hinzufuegen(verbund, mitglied)
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
            adm.mitglieder_vom_anwenderverbund_entfernen(verbund, mitglied)
            return mitglied
        else:
            return "Benutzer oder Anwenderverbund unbekannt", 500


"""Anwenderverbund DONE """

"""Statistik-Methoden"""


@shopping.route('/statistik/<string:email>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
class StatistikListOperationsByBenutzer(Resource):
    @shopping.marshal_list_with(statistik)
    @secured
    def get(self, email):
        """Auslesen der meist gekauften Artikel"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)

        if benutzer is not None:
            stat = adm.get_top_artikel_5(benutzer)
            return stat
        else:
            return "Benutzer nicht gefunden", 500


@shopping.route('/statistik/<string:email>/<string:name>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
@shopping.param('name', 'Name des Einzelhändlers') #evtl. mehrere param nicht nötig/erwünscht
class StatistikListOperationsByEinzelhaendler(Resource):
    @shopping.marshal_list_with(statistikhaendler)
    @secured
    def get(self, email, name):
        """Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)
        haendler = adm.get_einzelhaendler_by_name(name)

        if user is not None:
            if haendler is not None:
                stat = adm.get_top_artikel_5_by_einzelhaendler(user, haendler)
                return stat
            else:
                return "Einzelhändler nicht gefunden", 500
        else:
            return "Benutzer nicht gefunden", 500


@shopping.route('/statistik/<string:email>/<string:von>/<string:bis>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
@shopping.param('von', 'Startzeitpunkt')
@shopping.param('von', 'Endzeitpunkt')
class StatistikListOperationsByDatum(Resource):
    @shopping.marshal_list_with(statistikzeitraum)
    @secured
    def get(self, email, von, bis):
        """Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)

        if user is not None:
            stat = adm.get_top_artikel_5_by_datum(user, von, bis)
            return stat
        else:
            return "Benutzer nicht gefunden", 500


@shopping.route('/statistik/<string:email>/<string:name>/<string:von>/<string:bis>')
@shopping.response(500, 'Serverfehler')
@shopping.param('email', 'Email des Benutzers')
@shopping.param('name', 'Name des Einzelhändlers')
@shopping.param('von', 'Startzeitpunkt')
@shopping.param('von', 'Endzeitpunkt')
class StatistikListOperationsByEinzelhaendlerDatum(Resource):
    @shopping.marshal_list_with(statistikhuz)
    @secured
    def get(self, email, name, von, bis):
        """Auslesen der meist gekauften Artikel bei einem durch Namen definierten Einzelhaendler"""
        adm = ApplikationsAdministration()
        user = adm.get_benutzer_by_email(email)
        haendler = adm.get_einzelhaendler_by_name(name)

        if user is not None:
            if haendler is not None:
                stat = adm.get_top_artikel_5_by_einzelhaendler_datum(user, haendler, von, bis)
                return stat
            else:
                return "Einzelhändler nicht gefunden", 500
        else:
            return "Benutzer nicht gefunden", 500



if __name__ == '__main__':
    app.run(debug=True)