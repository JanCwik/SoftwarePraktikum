import StatistikBO from "./StatistikBO";
import StatistikHaendlerBO from "./StatistikHaendlerBO"
import StatistikHuZBO from "./StatistikHuZBO"
import StatistikZeitraumBO from "./StatistikzeitraumBO"

export default class API {


    static #api = null;


    //diese Klassenmethode realisiert die Umsetztung als Singelton, dadurch kann nur eine Instanz dieser Klasse existieren
    static getAPI() {
        if (this.#api == null) {
            this.#api = new API();
        }
        return this.#api;
    }


    //Während der Entwicklung wird der Local host verwendet, im deployten Zustand wird der entsprechende Link auf das Deployte Backend verwendet
    #ServerBaseURL= process.env.NODE_ENV ==='production'?'https://backend-dot-shoppinglist2020.ey.r.appspot.com/shopping':'/shopping'

    //private Methoden um das angeben aller URLs zu erleichtern

    #getStatistikURL= () => `${this.#ServerBaseURL}/statistik`;


    //führt die fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die json-Funktion mit der Response aus.
    #fetchAdvanced = (url, init) =>
        fetch(url, init)
            .then(res =>{
                //console.log(res)
                    if (!res.ok) {
                        throw Error(`${res.status} ${res.statusText}`);
                    }
                    return res.json();
                }

            )

    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Artikel ausgibt, zu denen der Benutzer gehört
    // Die ID des Benutzers wird an die URL gehängt
    getArtikelByBenutzerAPI(userMail) {
        return this.#fetchAdvanced(this.#getArtikelByBenutzerURL(userMail)).then((responseJSON) => {
            let Artikel = ArtikelBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(Artikel);
            })
        })

    }