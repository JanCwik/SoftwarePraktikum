import ArtikelBO from "./ArtikelBO";


export default class API {

    // Diese Klasse wird zurzeit nicht verwendet. Auf diese Weise wurde die API im Bankbeispiel umgesetzt,
    // aber diese Umsetzteung funktioniert hier noch nicht

     static #api = null;


    //Attribut um im späteren verlauf des Projekts das angeben aller URLs zu erleichtern
    #ServerBaseURL = '/shopping';

    //private Methode um im späteren verlauf des Projekts das angeben aller URLs zu erleichtern
    #getArtikelURL = () => `${this.#ServerBaseURL}/artikel`;


    //diese Klassenmethode realisiert die Umsetztung als Singelton, dadurch kann nur eine Instanz dieser Klasse existieren
     static getAPI() {
          if (this.#api == null) {
              this.#api = new API();
          }
          return this.#api;
      }





    // Klassenmethode die den GET request ausführt und alle in der Datenbank gespeicherten Artikel ausgibt
    static getArtikel() {
        return this.#fetchAdvanced("http://127.0.0.1:5000/shopping/artikel").then((responseJSON) => {      // funktioniert wahrscheinlich wendern nur mit der URL
                                                                                                                // http://127.0.0.1:5000/shopping/artikel
            let artikel = ArtikelBO.fromJSON(responseJSON);


            return new Promise(function (resolve) {
                resolve(artikel);

            })
        })
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

}