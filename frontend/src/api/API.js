import ArtikelBO from "./ArtikelBO";
import EinzelhaendlerBO from "./EinzelhaendlerBO";

export default class API {



     static #api = null;


    //Attribut um im späteren verlauf des Projekts das angeben aller URLs zu erleichtern
    #ServerBaseURL = '/shopping';

    //private Methode um im späteren verlauf des Projekts das angeben aller URLs zu erleichtern
    #getArtikelURL = () => `${this.#ServerBaseURL}/artikel`;
    #addArtikelURL =()=> `${this.#ServerBaseURL}/artikel`;

    //diese Klassenmethode realisiert die Umsetztung als Singelton, dadurch kann nur eine Instanz dieser Klasse existieren
     static getAPI() {
          if (this.#api == null) {
              this.#api = new API();
          }
          return this.#api;
      }



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
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseArtikelBO = ArtikelBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseArtikelBO);
            })
        })
    }

    getEinzelhaendlerAPI() {
        return this.#fetchAdvanced("/shopping/einzelhaendler").then((responseJSON) => {

            let Einzelhaendler = EinzelhaendlerBO.fromJSON(responseJSON);


            return new Promise(function (resolve) {
                resolve(Einzelhaendler);

            })
        })
    }

    addEinzelhaendlerAPI (neweinz) {

    return this.#fetchAdvanced("/shopping/einzelhaendler", {
      method: 'POST',
      headers: {
        'Accept': 'application/json, text/plain',
        'Content-type': 'application/json',
      },
      body: JSON.stringify(neweinz)
    }).then((responseJSON) => {
            // We always get an array of CustomerBOs.fromJSON, but only need one object
            let responseEinzelhaendlerBO = EinzelhaendlerBO.fromJSON(responseJSON)[0];
            // console.info(accountBOs);
            return new Promise(function (resolve) {
                resolve(responseEinzelhaendlerBO);
            })
        })
    }

}