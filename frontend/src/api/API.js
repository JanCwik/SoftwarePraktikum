import ArtikelBO from "./ArtikelBO";
import EinzelhaendlerBO from "./EinzelhaendlerBO";

export default class API {



     static #api = null;


     //diese Klassenmethode realisiert die Umsetztung als Singelton, dadurch kann nur eine Instanz dieser Klasse existieren
     static getAPI() {
          if (this.#api == null) {
              this.#api = new API();
          }
          return this.#api;
      }


    //Attribut um im späteren verlauf des Projekts das angeben aller URLs zu erleichtern
    #ServerBaseURL = '/shopping';

    //private Methoden um das angeben aller URLs zu erleichtern
    #getArtikelURL = () => `${this.#ServerBaseURL}/artikel`;
    #addArtikelURL =()=> `${this.#ServerBaseURL}/artikel`;
    #deleteArtikelURL = (id) => `${this.#ServerBaseURL}/artikel-by-id/${id}`;
    #updateArtikelURL=(id)=>`${this.#ServerBaseURL}/artikel-by-id/${id}`;

    #getEinzelhaendlerURL = () => `${this.#ServerBaseURL}/einzelhaendler`;
    #addEinzelhaendlerURL =()=> `${this.#ServerBaseURL}/einzelhaendler`;
    #deleteEinzelhaendlerURL=(id)=> `${this.#ServerBaseURL}/einzelhaendler-by-id/${id}`;
    #updateEinzelhaendlerURL=(id)=> `${this.#ServerBaseURL}/einzelhaendler-by-id/${id}`;




    //führt die fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die json-Funktion mit der Response aus.
    #fetchAdvanced = (url, init) =>
        fetch(url, init)
            .then(res => {
                    if (!res.ok) {
                        throw Error(`${res.status} ${res.statusText}`);
                    }
                    return res.json();
                }
            )



    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Artikel ausgibt
    getArtikelAPI() {
        return this.#fetchAdvanced(this.#getArtikelURL()).then((responseJSON) => {
            let artikel = ArtikelBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(artikel);
            })
        })
    }


    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Artikelobjekt in den Body des Json
   addArtikelAPI (newArt) {
    return this.#fetchAdvanced(this.#addArtikelURL(), {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(newArt)
    }).then((responseJSON) => {
            // Zugriff auf das erste Artikel Objekt des Arrays, welches .fromJSON zurückgibt
            let responseArtikelBO = ArtikelBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArtikelBO);
            })
        })
    }

    //führt einen DELETE Request aus und gibt dabei die id des zu löschenden Artikels weiter
    deleteArtikelAPI(id) {
        return this.#fetchAdvanced(this.#deleteArtikelURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // Zugriff auf das erste Artikel Objekt des Arrays, welches .fromJSON zurückgibt
            let responseArtikelBO = ArtikelBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArtikelBO);
            })
        })
    }

    //Fürht ein PUT Request aus. Die ID des Artikels der geupdatet werden soll wird an die URL gehängt
    //und das aktualisierte Artikel-Objekt wird in den Body des JSON geschrieben
    updateArtikelAPI(artikel) {
        return this.#fetchAdvanced(this.#updateArtikelURL(artikel.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(artikel)
        }).then((responseJSON) => {
            // Zugriff auf das erste Artikel Objekt des Arrays, welches .fromJSON zurückgibt
            let responseArtikelBO = ArtikelBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseArtikelBO);
            })
        })
    }


 // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Einzelhändler ausgibt
    getEinzelhaendlerAPI() {
        return this.#fetchAdvanced(this.#getEinzelhaendlerURL()).then((responseJSON) => {
            let Einzelhaendler = EinzelhaendlerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(Einzelhaendler);
            })
        })
    }

    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Einzelhändler-objekt in den Body des Json
    addEinzelhaendlerAPI (neweinz) {
        return this.#fetchAdvanced(this.#addEinzelhaendlerURL(), {
          method: 'POST',
          headers: {
            'Accept': 'application/json, text/plain',
            'Content-type': 'application/json',
          },
          body: JSON.stringify(neweinz)
        }).then((responseJSON) => {
                // Zugriff auf das erste Einzelhändler Objekt des Arrays, welches .fromJSON zurückgibt
                let responseEinzelhaendlerBO = EinzelhaendlerBO.fromJSON(responseJSON)[0];
                return new Promise(function (resolve) {
                    resolve(responseEinzelhaendlerBO);
                })
            })
    }

    //führt einen DELETE Request aus und gibt dabei die id des zu löschenden Einzelhändlers weiter
      deleteEinzelhaendlerAPI(id) {
        return this.#fetchAdvanced(this.#deleteEinzelhaendlerURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
             // Zugriff auf das erste Einzelhändler Objekt des Arrays, welches .fromJSON zurückgibt
            let responseEinzelhaendlerBO = EinzelhaendlerBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEinzelhaendlerBO);
            })
        })
    }

    //Fürht ein PUT Request aus. Die ID des Einzelhändlers der geupdatet werden soll wird an die URL gehängt
    //und das aktualisierte Einzelhändler-Objekt wird in den Body des JSON geschrieben
     updateEinzelhaendlerAPI(einz) {
        return this.#fetchAdvanced(this.#updateEinzelhaendlerURL(einz.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(einz)
        }).then((responseJSON) => {
             // Zugriff auf das erste Einzelhändler Objekt des Arrays, welches .fromJSON zurückgibt
            let responseEinzBO = EinzelhaendlerBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseEinzBO);
            })
        })
    }
}