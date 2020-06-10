


export default class API {


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
                // The Promise returned from fetch() won’t reject on HTTP error status even if the response is an HTTP 404 or 500.
                if (!res.ok) {
                    throw Error(`${res.status} ${res.statusText}`);
                }
                return res.json();
            }
        )





    static getArtikel() {
        return this.#fetchAdvanced(this.#getArtikelURL()).then((responseJSON) => {
            let artikel = responseJSON;
            // console.info(customerBOs);

            return new Promise(function (resolve) {
                resolve(artikel);

            })



        })
    }
}

