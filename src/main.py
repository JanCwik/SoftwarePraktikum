from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from src.server.ApplikationsAdministration import ApplikationsAdministration
from src.server.bo.Artikel import Artikel


"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

app = Flask(__name__)

CORS(app, resource=r'/shopping/*')

api = Api(app, version="1.0", title="Einkaufsliste API")

shopping = api.namespace("shopping_list", descriptiion="Funktionen des Shopping-List-Systems")

bo = api.model("BusinessObject", {
    "id": fields.Integer(attribute="_id")
})

namedBO = api.inherit('namedBO', bo, {
    'name': fields.String(attribute='_name', description='Name eines Benutzers'),
    'erstellungs_zeitpunkt': fields.String(attribute='_erstellungs_zeitpunkt', description='E-Mail-Adresse eines Benutzers'),
})
artikel = api.inherit(Artikel, bo, {
    "einheit": fields.String(attribute="_einheit"),
    "standardartikel": fields.Boolean(attribute="_standardartikel")
})


@shopping.route("/artikel")
@shopping.response(500, 'Error')
class ArtikelListOperations(Resource):
    @shopping.marshal_list_with(artikel)
    def get(self):
        admin = ApplikationsAdministration()
        artikel = admin.get_all_artikel()
        return artikel


if __name__ == '__main__':
    app.run(debug=True)
