from flask import Flask
from flask_cors import CORS
from flask_restx import Resource, Api


app = Flask(__name__)

CORS(app, resources=)

api = Api(app, version="1.0", title="Einkaufsliste API")

shopping_list =api.namespace("shopping_list", descriptiion="Funktionen des Shopping-List-Systems")

"""requirements: Flask, Flask-Cors, flask-restx, mysql-connector-python"""
