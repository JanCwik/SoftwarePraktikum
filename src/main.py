"""
A. Allgemeine Hinweise zu diesem Module:

Normalerweise würde man eine Datei dieser Länge bzw. ein Module
dieser Größe in mehrere Dateien bzw. Modules untergliedern. So könnte
man z.B. pro Resource Class ein eigenes Module anlegen. Dadurch
ergäben sich erhebliche Vorteile bzgl. der Wartungsfreundlichkeit
dieses Modules. Es ergäben sich aber auch Nachteile! So haben Sie
etwa mit einer Reihe von Abhängigkeiten z.B. zwischen der API-Definition
und den Decorators zu tun. Außerdem verschlechtert sich aufgrund der Länge
der Datei die Übersichtlichkeit der Inhalte und Strukturen.

Abgesehen von Lehrbüchern und Vorlesungen müssen Sie in realen Projekten
häufig die Vor- und Nachteile von Entscheidungen abwägen und sich dann
bewusst für einen Weg entscheiden. Hier wurde die Entscheidung getroffen,
die Einfachheit und Verständlichkeit des Source Codes höher zu werten als
die Optimierung des Kopplungsgrads und damit die Wartbarkeit des Modules.

B. Konventionen für dieses Module:

    B.1. HTTP response status codes:

        Folgende Codes werden verwendet:
        200 OK           :      bei erfolgreichen requests. AUf die Verwendung von weiter differenzierenden
                                Statusmeldungen wie etwa '204 No Content' für erfolgreiche requests, die außer evtl.
                                im Header keine weiteren Daten zurückliefern, wird in dieser Fallstudie auch aus Gründen
                                einer möglichst einfachen Umsetzung verzichtet.
        401 Unauthorized :      falls der User sich nicht gegenüber dem System
                                authentisiert hat und daher keinen Zugriff erhält.
        404 Not Found    :      falls eine angefragte Resource nicht verfügbar ist
        500 Internal Server Error : falls der Server einen Fehler erkennt,
                                diesen aber nicht genauer zu bearbeiten weiß.

    B.2. Name des Moduls:
        Der Name dieses Moduls lautet main.py. Grund hierfür ist, dass Google App Engine, diesen Namen bevorzugt und
        sich dadurch das Deployment einfacher gestaltet. Natürlich wären auch andere Namen möglich. Dies wäre aber mit
        zusätzlichem Konfigurationsaufwand in der Datei app.yaml verbunden.
"""




#import von Klassen und Flask

# //Thies Unser Service basiert auf Flask
from flask import Flask
# //Thies Auf Flask aufbauend nutzen wir RestX
from flask_restx import Api, Resource, fields
# //ThiesWir benutzen noch eine Flask-Erweiterung für Cross-Origin Resource Sharing
from flask_cors import CORS

# //Thies Wir greifen natürlich auf unsere Applikationslogik inkl. BusinessObject-Klassen zurück
# import unserer bo-klassen
from src.server.ApplikationsAdministration import ApplikationsAdministration
from src.server.bo.Artikel import Artikel

#den rest brauchen wir noch nicht, aber hier folgen die weiteren bo-Klassen
#from server.bo.Account import Account
#from server.bo.Transaction import Transaction

#Hier endet der import






# //Thies Außerdem nutzen wir einen selbstgeschriebenen Decorator, der die Authentifikation übernimmt
#brauchen wir noch nicht
#from SecurityDecorator import secured






"""
Instanzieren von Flask. Am Ende dieser Datei erfolgt dann erst der 'Start' von Flask.
"""
#Hier erstellen wir die API
app = Flask(__name__)





#Kp was hier passiert, trz mal auf List geändert
"""
Alle Ressourcen mit dem Präfix /bank für **Cross-Origin Resource Sharing** (CORS) freigeben.
Diese eine Zeile setzt die Installation des Package flask-cors voraus.
"""
CORS(app, resources=r'/List/*')






#Das was hier steht, steht auch in der API. Ist wohl der Aufbau bzw instanz der API, auch mal abgeändert
"""
In dem folgenden Abschnitt bauen wir ein Modell auf, das die Datenstruktur beschreibt, 
auf deren Basis Clients und Server Daten austauschen. Grundlage hierfür ist das Package flask-restx.
"""

api = Api(app, version='1.0', title='ShoppingList API',
    description='Das ist unserer API für die Shoppinglist.')






#Der folgende Namespace wird immer mit dem @ verwendet (gelb)

"""Anlegen eines Namespace

Namespaces erlauben uns die Strukturierung von APIs. In diesem Fall fasst dieser Namespace alle
Bank-relevanten Operationen unter dem Präfix /bank zusammen. Eine alternative bzw. ergänzende Nutzung
von Namespace könnte etwa sein, unterschiedliche API-Version voneinander zu trennen, um etwa 
Abwärtskompatibilität (vgl. Lehrveranstaltungen zu Software Engineering) zu gewährleisten. Dies ließe
sich z.B. umsetzen durch /bank/v1, /bank/v2 usw."""
shopping = api.namespace('Shoppinglist', description='Funktionen der Shoppinglist')






#Nachfolgend werden die Python klasssenattribute wohl in JSON umgewandelt

"""Nachfolgend werden analog zu unseren BusinessObject-Klassen transferierbare Strukturen angelegt.



##Abgeändert auf unser Projekt
BusinessObject dient als Basisklasse, auf der die weiteren Strukturen Customer, Account und Transaction aufsetzen."""
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
#bis hier hin geändert rest brauchen wir noch nicht







@shopping.route('/artikel')
@shopping.response(500, 'Falls es zu einem Server-seitigen Fehler kommt.')
class CustomerListOperations(Resource):
    @shopping.marshal_list_with(artikel)
    #secured brauchen wir noch nicht
    #@secured
    def get(self):
        """Auslesen aller Customer-Objekte.

        Sollten keine Customer-Objekte verfügbar sein, so wird eine leere Sequenz zurückgegeben."""
        adm = ApplikationsAdministration()
        artikel = adm.get_all_artikel()
        return artikel








    #der rest der klassse ist post, ich habe mal nur das get angepasst
    #@shopping.marshal_with(artikel, code=200)
    #@shopping.expect(artikel)  # Wir erwarten ein Customer-Objekt von Client-Seite.
    #@secured
    #def post(self):
        """Anlegen eines neuen Customer-Objekts.

        **ACHTUNG:** Wir fassen die vom Client gesendeten Daten als Vorschlag auf.
        So ist zum Beispiel die Vergabe der ID nicht Aufgabe des Clients.
        Selbst wenn der Client eine ID in dem Proposal vergeben sollte, so
        liegt es an der BankAdministration (Businesslogik), eine korrekte ID
        zu vergeben. *Das korrigierte Objekt wird schließlich zurückgegeben.*
        """
#        adm = BankAdministration()

 #       proposal = Customer.from_dict(api.payload)

#        """RATSCHLAG: Prüfen Sie stets die Referenzen auf valide Werte, bevor Sie diese verwenden!"""
 #       if proposal is not None:

  #          c = adm.create_customer(proposal.get_first_name(), proposal.get_last_name())
   #         return c, 200
    #    else:
            # Wenn irgendetwas schiefgeht, dann geben wir nichts zurück und werfen einen Server-Fehler.
     #       return '', 500





"""
Nachdem wir nun sämtliche Resourcen definiert haben, die wir via REST bereitstellen möchten,
müssen nun die App auch tatsächlich zu starten.

Diese Zeile ist leider nicht Teil der Flask-Doku! In jener Doku wird von einem Start via Kommandozeile ausgegangen.
Dies ist jedoch für uns in der Entwicklungsumgebung wenig komfortabel. Deshlab kommt es also schließlich zu den 
folgenden Zeilen. 

**ACHTUNG:** Diese Zeile wird nur in der lokalen Entwicklungsumgebung ausgeführt und hat in der Cloud keine Wirkung!
"""
if __name__ == '__main__':
    app.run(debug=True)
