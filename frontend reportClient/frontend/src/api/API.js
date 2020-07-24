import StatistikBO from "./StatistikBO";
import StatistikHaendlerBO from "./StatistikHaendlerBO"
import StatistikHuZBO from "./StatistikHuZBO"
import StatistikZeitraumBO from "./StatistikZeitraumBO"

export default class API {

    static #api = null;

    /** Diese Klassenmethode realisiert die Umsetztung als Singelton,
     *  dadurch kann nur eine Instanz dieser Klasse existieren. */
    static getAPI() {
        if (this.#api == null) {
            this.#api = new API();
        }
        return this.#api;
    }

    //Während der Entwicklung wird der Local host verwendet, im deployten Zustand wird der entsprechende Link auf das deployte Backend verwendet
    #ServerBaseURL = process.env.NODE_ENV === 'production' ? 'https://backend-dot-shoppinglist2020.ey.r.appspot.com/shopping' : '/shopping'

    //private Methoden um das angeben aller URLs zu erleichtern
    #getStatistikenURL = (userMail) => `${this.#ServerBaseURL}/statistik/${userMail}`;
    #getStatistikenByHaendlerURL = (userMail,haendler) => `${this.#ServerBaseURL}/statistik/${userMail}/${haendler}`;
    #getStatistikenByZeitraumURL = (userMail, startZeitpunkt, endZeitpunkt) => `${this.#ServerBaseURL}/statistik/${userMail}/${startZeitpunkt}/${endZeitpunkt}`;
    #getStatistikenByZuHURL = (userMail,haendler, startZeitpunkt, endZeitpunkt) => `${this.#ServerBaseURL}/statistik/${userMail}/${haendler}/${startZeitpunkt}/${endZeitpunkt}`;

    //Führt die Fetch-Funktion aus, fängt dabei mögliche Errors ab und führt anschließend schon die JSON-Funktion mit der Response aus.
    #fetchAdvanced = (url, init) =>
        fetch(url, init)
            .then(res => {
                if (!res.ok) {
                    throw Error(`${res.status} ${res.statusText}`);
                }
                return res.json();
                }
            )

        /** Methode die den GET request ausführt und die einen Statistik-Report über die 5 meistgekauften Artikel
         *  des Benutzers anfordert. Die Email des Benutzers wird an die URL gehängt. */
        getStatistikenAPI(userMail) {
            return this.#fetchAdvanced(this.#getStatistikenURL(userMail)).then((responseJSON) => {
                let report = StatistikBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(report);
                })
            })
        }

        /** Methode die den GET request ausführt und die ein Statistik-Report über die 5 meistgekauften Artikel
         *  bei einem bestimmten Einzelhändler des Benutzers anfordert.
         *  Die Email des Benutzers und der Name des Einzelhändlers werden an die URL gehängt. */
        getStatistikenByHaendlerAPI(userMail, haendler) {
            return this.#fetchAdvanced(this.#getStatistikenByHaendlerURL(userMail, haendler)).then((responseJSON) => {
                let report = StatistikHaendlerBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(report);
                })
            })
        }

        /** Methode die den GET request ausführt und die ein Statistik-Report über die 5 meistgekauften Artikel
         *  in einem bestimmten Zeitraum des Benutzers anfordert. Die Email des Benutzers sowie Start- und Endzeitpunkt
         *  werden an die URL gehängt. */
        getStatistikenByZeitraumAPI(userMail, startZeitpunkt, endZeitpunkt) {
            return this.#fetchAdvanced(this.#getStatistikenByZeitraumURL(userMail,startZeitpunkt, endZeitpunkt)).then((responseJSON) => {
                let report = StatistikZeitraumBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(report);
                })
            })
        }

        /** Methode die den GET request ausführt und die ein Statistik-Report über die 5 meistgekauften Artikel
         * bei einem bestimmten Einzelhändler in einem bestimmten Zeitraum des Benutzers anfordert.
         * Die Email des Benutzers, der Name des Einzelhändlers, Start- und Endzeitpunkt werden an die URL gehängt. */
        getStatistikenByZuHAPI(userMail,haendler,startZeitpunkt, endZeitpunkt) {
            return this.#fetchAdvanced(this.#getStatistikenByZuHURL(userMail,haendler,startZeitpunkt, endZeitpunkt)).then((responseJSON) => {
                let report = StatistikHuZBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(report);
                })
              })
        }
}