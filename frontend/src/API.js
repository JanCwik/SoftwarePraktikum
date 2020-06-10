


export default class API {

    // Diese Klasse wird zurzeit nicht verwendet. Auf diese Weise wurde die API im Bankbeispiel umgesetzt, aber dabei wird eine Error geworfen

    static #api = null;


    #ServerBaseURL = '/shopping';
    #getArtikelURL = () => `${this.#ServerBaseURL}/artikel`;

    static getAPI() {
        if (this.#api == null) {
            this.#api = new API();
        }
        return this.#api;
    }






    #fetchAdvanced = (url, init) => fetch(url, init)
        .then(res => {

                if (!res.ok) {
                    throw Error(`${res.status} ${res.statusText}`);
                }
                return res.json();
            }
        )





    static getArtikel() {
        return this.#fetchAdvanced(this.#getArtikelURL()).then((responseJSON) => {
            let artikel = responseJSON;
          

            return new Promise(function (resolve) {
                resolve(artikel);

            })



        })
    }
}

