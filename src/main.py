from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api, fields

from src.server.ApplikationsAdministration import ApplikationsAdministration
from src.server.bo.Artikel import Artikel

from src.SecurityDecorator import secured

"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

app = Flask(__name__)

CORS(app)

api = Api(app, version="1.0", title="Einkaufsliste API")

shopping_list = api.namespace("shopping_list", descriptiion="Funktionen des Shopping-List-Systems")

bo = api.model("BusinessObject", {
    "id": fields.Integer(attribute="_id")
})

artikel = api.inherit(Artikel, bo, {
    "einheit": fields.String(attribute="_einheit"),
    "standardartikel": fields.Boolean(attribute="_standardartikel")
})

@shopping_list.route("/")
@shopping_list.response(500)
class ArtikelListOperations(Resource):
    @shopping_list.marshal_list_with(artikel)
    @secured
    def get(self):
        admin = ApplikationsAdministration()
        artikel = admin.get_all_artikel()
        return artikel

"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""

if __name__ == '__main__':
    app.run(debug=True)
