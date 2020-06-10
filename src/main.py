from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from src.server.ApplikationsAdministration import ApplikationsAdministration
from src.server.bo.Artikel import Artikel



from src.SecurityDecorator import secured

"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

app = Flask(__name__)


CORS(app)                  # als zweiter parameter könnte man auch noch folgendes hinzufügen:
                           # , resources=r'/shopping/*'      oder    , resources={r"/shopping/*": {"origins": "*"}}

api = Api(app, version='1.0', title='ShoppingList API',
    description='Das ist unserer API für die Shoppinglist.')

shopping = api.namespace('shopping', description='Funktionen der Shoppinglist')
bo = api.model('BusinessObject', {
    'id': fields.Integer(attribute='_id', description='Der Unique Identifier eines Business Object'),
})

namedBO = api.inherit('namedBO', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'erstellungs_zeitpunkt': fields.String(attribute='_erstellungs_zeitpunkt', description='E-Mail-Adresse eines Benutzers'),
})

"""Users, Customers, Accounts & Transactions sind BusinessObjects..."""
artikel = api.inherit('Artikel',namedBO , {
    'Einheit': fields.String(attribute='_einheit', description='Name eines Benutzers'),
    'Standardartikel': fields.String(attribute='_standardartikel', description='E-Mail-Adresse eines Benutzers'),
})



@shopping.route('/artikel')
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class ArtikelListOperations(Resource):
    @shopping.marshal_list_with(artikel)
    #secured brauchen wir noch nicht
    #@secured
    def get(self):
        """Auslesen aller Customer-Objekte.
        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ApplikationsAdministration()
        artikel = adm.get_all_artikel()
        return artikel





if __name__ == '__main__':
    app.run(debug=True)



