from flask import request
from google.auth.transport import requests


def secured(function):
    firebase_request_adapter = requests.Request()
