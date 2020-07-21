import ArtikelBO from "./ArtikelBO";
import EinzelhaendlerBO from "./EinzelhaendlerBO";
import AnwenderverbundBO from "./AnwenderverbundBO";
import EinkaufslisteBO from "./EinkaufslisteBO";
import ListeneintragBO from "./ListeneintragBO";
import BenutzerBO from "./BenutzerBO";

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
    //#ServerBaseURL= process.env.NODE_ENV ==='production'?'https://backend-dot-shoppinglist2020.ey.r.appspot.com/shopping':'/shopping'
    #ServerBaseURL= 'https://backend-dot-shoppinglist2020.ey.r.appspot.com/shopping';
    //private Methoden um das angeben aller URLs zu erleichtern
    #getArtikelURL = () => `${this.#ServerBaseURL}/artikel`;
    #addArtikelURL = () => `${this.#ServerBaseURL}/artikel`;
    #deleteArtikelURL = (id) => `${this.#ServerBaseURL}/artikel-by-id/${id}`;
    #updateArtikelURL = (id) => `${this.#ServerBaseURL}/artikel-by-id/${id}`;
    #getArtikelByNamelURL= (name) => `${this.#ServerBaseURL}/artikel-by-name/${name}`;
    #getArtikelByBenutzerURL = (userMail) => `${this.#ServerBaseURL}/benutzer/${userMail}/artikel`;

    #getEinzelhaendlerByBenutzerURL = (userMail) => `${this.#ServerBaseURL}/einzelhaendler/${userMail}`;
    #addEinzelhaendlerURL = () => `${this.#ServerBaseURL}/einzelhaendler`;
    #deleteEinzelhaendlerURL = (id) => `${this.#ServerBaseURL}/einzelhaendler-by-id/${id}`;
    #updateEinzelhaendlerURL = (id) => `${this.#ServerBaseURL}/einzelhaendler-by-id/${id}`;
    #getEinzelhaendlerByNameURL= (name) => `${this.#ServerBaseURL}/einzelhaendler-by-name/${name}`;

    #getAnwenderverbuendeURL = () => `${this.#ServerBaseURL}/anwenderverbund`;
    #addAnwenderverbundURL = () => `${this.#ServerBaseURL}/anwenderverbund`;
    #deleteAnwenderverbundURL = (id) => `${this.#ServerBaseURL}/anwenderverbund-by-id/${id}`;
    #updateAnwenderverbundURL = (id) => `${this.#ServerBaseURL}/anwenderverbund-by-id/${id}`;
    #getAnwenderverbuendeByBenutzerURL = (userMail) => `${this.#ServerBaseURL}/benutzer/${userMail}/anwenderverbuende`;

    #getEinkaufslistenURL = () => `${this.#ServerBaseURL}/einkaufsliste`
    #addEinkaufslisteURL = (email) => `${this.#ServerBaseURL}/einkaufsliste/${email}`;
    #getEinkaufslistenByAnwenderverbundURL = (id) => `${this.#ServerBaseURL}/anwenderverbund/${id}/einkauflisten`;
    #deleteEinkaufslisteURL = (id) => `${this.#ServerBaseURL}/einkaufsliste-by-id/${id}`;
    #updateEinkaufslisteURL = (id) => `${this.#ServerBaseURL}/einkaufsliste-by-id/${id}`;

    #getListeneintragByIdURL = (id) => `${this.#ServerBaseURL}/listeneintrag-by-id/${id}`;
    #getListeneintragByEinkaufslisteURL = (id) => `${this.#ServerBaseURL}/einkaufsliste/${id}/listeneintraege`;
    #addListeneintragURL = () => `${this.#ServerBaseURL}/listeneintrag`;
    #deleteListeneintragURL = (id) => `${this.#ServerBaseURL}/listeneintrag-by-id/${id}`;
    #updateListeneintragURL = (id) => `${this.#ServerBaseURL}/listeneintrag-by-id/${id}`;

    #getBenutzerByAnwenderverbundURL = (id) => `${this.#ServerBaseURL}/anwenderverbund/${id}/mitglieder`;
    #getBenutzerByEmailURL = (mail) => `${this.#ServerBaseURL}/benutzer-by-email/${mail}`;
    #addMitgliedschaftURL= (id) => `${this.#ServerBaseURL}/anwenderverbund/${id}/mitglieder`;
    #deleteMitgliedschaftURL= (id) => `${this.#ServerBaseURL}/anwenderverbund/${id}/mitglieder`;
    #getBenutzerByNameURL= (name) => `${this.#ServerBaseURL}/benutzer-by-name/${name}`;




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

    // Methode die den GET request ausführt und einen Artikel anhand seines namen ausgibt
    // Der name des Artikels wird an die URL gehängt
    getArtikelByNameAPI(name) {
        return this.#fetchAdvanced(this.#getArtikelByNamelURL(name)).then((responseJSON) => {
                let response = ArtikelBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(response);
                })
            })
    }

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
    addArtikelAPI(newArt) {
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
    getEinzelhaendlerAPI(mail) {
        return this.#fetchAdvanced(this.#getEinzelhaendlerByBenutzerURL(mail)).then((responseJSON) => {
            let Einzelhaendler = EinzelhaendlerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(Einzelhaendler);
            })
        })
    }


    // Methode die den GET request ausführt und einen Einzelhaendler anhand seines namen ausgibt
    // Der name des Einzelhaendlers wird an die URL gehängt
    getEinzelhaendlerByNameAPI(name) {
        return this.#fetchAdvanced(this.#getEinzelhaendlerByNameURL(name)).then((responseJSON) => {
                let response = EinzelhaendlerBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(response);
                })

        })
    }


    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Einzelhändler-objekt in den Body des Json
    addEinzelhaendlerAPI(neweinz) {
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

    //Führt ein PUT Request aus. Die ID des Einzelhändlers der geupdatet werden soll wird an die URL gehängt
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


    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Anwenderverbünde ausgibt
    getAnwenderverbuendeAPI() {
        return this.#fetchAdvanced(this.#getAnwenderverbuendeURL()).then((responseJSON) => {
            let Anwenderverbund = AnwenderverbundBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(Anwenderverbund);
            })
        })
    }

    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Anwenderverbünde ausgibt, zu denen der Benutzer gehört
    // Die ID des Benutzers wird an die URL gehängt
    getAnwenderverbuendeByBenutzerAPI(userMail) {
        return this.#fetchAdvanced(this.#getAnwenderverbuendeByBenutzerURL(userMail)).then((responseJSON) => {
            let verbuende = AnwenderverbundBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(verbuende);
            })
        })

    }

    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Anwenderverbund-objekt in den Body des Json
    addAnwenderverbundAPI(newanw) {
        return this.#fetchAdvanced(this.#addAnwenderverbundURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(newanw)
        }).then((responseJSON) => {
            // Zugriff auf das erste Anwenderverbund Objekt des Arrays, welches .fromJSON zurückgibt
            let responseAnwenderverbundBO = AnwenderverbundBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseAnwenderverbundBO);
            })
        })
    }

    //führt einen DELETE Request aus und gibt dabei die id des zu löschenden Anwenderverbunds weiter
    deleteAnwenderverbundAPI(id) {
        return this.#fetchAdvanced(this.#deleteAnwenderverbundURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // Zugriff auf das erste Anwenderverbund Objekt des Arrays, welches .fromJSON zurückgibt
            let responseAnwenderverbundBO = AnwenderverbundBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseAnwenderverbundBO);
            })
        })
    }

    //Fürht ein PUT Request aus. Die ID des Anwenderverbunds der geupdatet werden soll wird an die URL gehängt
    //und das aktualisierte Anwenderverbund-Objekt wird in den Body des JSON geschrieben
    updateAnwenderverbundAPI(anw) {
        return this.#fetchAdvanced(this.#updateAnwenderverbundURL(anw.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(anw)
        }).then((responseJSON) => {
            // Zugriff auf das erste Anwenderverbund Objekt des Arrays, welches .fromJSON zurückgibt
            let responseAnwenderverbundBO = AnwenderverbundBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseAnwenderverbundBO);
            })
        })
    }






    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Einkaufslisten ausgibt
    getEinkaufslistenAPI() {
        return this.#fetchAdvanced(this.#getEinkaufslistenURL()).then((responseJSON) => {
            let Einkaufslisten = EinkaufslisteBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(Einkaufslisten);
            })
        })
    }


    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Einkaufslisten-objekt in den Body des Json
    addEinkaufslisteAPI(neweinkl, email) {
        return this.#fetchAdvanced(this.#addEinkaufslisteURL(email), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(neweinkl)
        }).then((responseJSON) => {
            // Zugriff auf das erste Einkaufsliste Objekt des Arrays, welches .fromJSON zurückgibt
            let responseBO = EinkaufslisteBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseBO);
            })
        })
    }

    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Einkaufslisten ausgibt, die zu einem Anwenderverbund gehören
    // Die ID des Anwenderverbundes wird an die URL gehängt
    getEinkaufslistenByAnwenderverbundAPI(id) {
        return this.#fetchAdvanced(this.#getEinkaufslistenByAnwenderverbundURL(id)).then((responseJSON) => {
            let liste = EinkaufslisteBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(liste);
            })
        })
    }

    //Fürht ein PUT Request aus. Die ID der Einkaufsliste die geupdatet werden soll wird an die URL gehängt
    //und das aktualisierte Einkaufslisten-Objekt wird in den Body des JSON geschrieben
    updateEinkaufslisteAPI(lis) {
        return this.#fetchAdvanced(this.#updateEinkaufslisteURL(lis.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(lis)
        }).then((responseJSON) => {
            // Zugriff auf das erste Einkaufsliste Objekt des Arrays, welches .fromJSON zurückgibt
            let response = EinkaufslisteBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(response);
            })
        })
    }

    //führt einen DELETE Request aus und gibt dabei die id der zu löschenden Einkaufsliste weiter
    deleteEinkaufslisteAPI(id){
        return this.#fetchAdvanced(this.#deleteEinkaufslisteURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // Zugriff auf das erste Einkaufsliste Objekt des Arrays, welches .fromJSON zurückgibt
            let responseEinkaufslisteBO = EinkaufslisteBO.fromJSON(responseJSON)[0];
            //console.log(responseEinkaufslisteBO)
            return new Promise(function (resolve) {
                resolve(responseEinkaufslisteBO);
            })
        })
    }


    // Methode die den GET request ausführt und ein Listeneintrag anhand seiner ID ausgibt
    getListeneintragByIdAPI(id) {
        return this.#fetchAdvanced(this.#getListeneintragByIdURL(id)).then((responseJSON) => {
            let eintrag = ListeneintragBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(eintrag);
            })
        })
    }

    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten Listeneinträge ausgibt die zu einer
    // bestimmten Einkaufsliste gehören
    // Die ID der Einkaufsliste wird an die URL gehängt
    getListeneintraegeByEinkaufslisteAPI(id) {
        return this.#fetchAdvanced(this.#getListeneintragByEinkaufslisteURL(id)).then((responseJSON) => {
            let eintrag = ListeneintragBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(eintrag);
            })
        })
    }

    //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Listeneintrag-objekt in den Body des Json
    addListeneintragAPI(neweintr) {
        return this.#fetchAdvanced(this.#addListeneintragURL(), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(neweintr)
        }).then((responseJSON) => {
            // Zugriff auf das erste Listeneintrag Objekt des Arrays, welches .fromJSON zurückgibt
            let responseBO = ListeneintragBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(responseBO);
            })
        })
    }

     //Fürht ein PUT Request aus. Die ID des Listeneintrages der geupdatet werden soll wird an die URL gehängt
    //und das aktualisierte Listeneintrag-Objekt wird in den Body des JSON geschrieben
     updateListeneintragAPI(eintr) {
        return this.#fetchAdvanced(this.#updateListeneintragURL(eintr.getID()), {
            method: 'PUT',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(eintr)
        }).then((responseJSON) => {
            // Zugriff auf das erste Listeneintrag Objekt des Arrays, welches .fromJSON zurückgibt
            let response = ListeneintragBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(response);
            })
        })
    }

    //führt einen DELETE Request aus und gibt dabei die id des zu löschenden Listeneintrages weiter
    deleteListeneintragAPI(id){
        return this.#fetchAdvanced(this.#deleteListeneintragURL(id), {
            method: 'DELETE'
        }).then((responseJSON) => {
            // Zugriff auf das erste Listeneintrag Objekt des Arrays, welches .fromJSON zurückgibt
            let response = ListeneintragBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(response);
            })
        })
    }

    // Methode die den GET request ausführt und alle in der Datenbank gespeicherten benutzer ausgibt die zu einem
    // bestimmten Anwenderverbund gehören
    // Die ID der Anwenderverbund wird an die URL gehängt
    GetBenutzerByAnwenderverbundAPI(id) {
        return this.#fetchAdvanced(this.#getBenutzerByAnwenderverbundURL(id)).then((responseJSON) => {
            let benutzer = BenutzerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(benutzer);
            })
        })
    }

     //führt einen POST Request aus und schreibt dabei das als Parameter übergebene Benutzer-objekt in den Body des Json
    // und die id des Anwenderverbundes in die URL
    addMitgliedschaftAPI(anwenderverbundID, BenutzerBO) {
        return this.#fetchAdvanced(this.#addMitgliedschaftURL(anwenderverbundID), {
            method: 'POST',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(BenutzerBO)
        })
        /*   //funktioniert iwi nicht
            .then((responseJSON) => {
            console.log(responseJSON)
            // Zugriff auf das erste Listeneintrag Objekt des Arrays, welches .fromJSON zurückgibt
            let responseBO = BenutzerBO.fromJSON(responseJSON);
           return new Promise(function (resolve) {
                resolve(responseBO);
            })
        })
         */
    }

    //führt einen DELETE Request aus und schreibt dabei die id des Anwenderverbundes in die URL und das BenutzerBO in den Body der Json
    deleteMitgliedschaftAPI(anwenderverbundID,BenutzerBO){

        return this.#fetchAdvanced(this.#deleteMitgliedschaftURL(anwenderverbundID), {
            method: 'DELETE',
            headers: {
                'Accept': 'application/json, text/plain',
                'Content-type': 'application/json',
            },
            body: JSON.stringify(BenutzerBO)
        })
            /*
            .then((responseJSON) => {
            console.log(responseJSON)
            // Zugriff auf das erste Listeneintrag Objekt des Arrays, welches .fromJSON zurückgibt
            let response = BenutzerBO.fromJSON(responseJSON)[0];
            return new Promise(function (resolve) {
                resolve(response);
            })
        })

             */
    }

    // Methode die den GET request ausführt und einen benutzer anhand seiner email ausgibt
    // Die email des Benutzers wird an die URL gehängt
    getBenutzerByEmailAPI(email) {
        return this.#fetchAdvanced(this.#getBenutzerByEmailURL(email)).then((responseJSON) => {
            let benutzer = BenutzerBO.fromJSON(responseJSON);
            return new Promise(function (resolve) {
                resolve(benutzer);
            })
        })
    }


    // Methode die den GET request ausführt und einen Benutzer anhand seines namen ausgibt
    // Der name des Benutzers wird an die URL gehängt
    getBenutzerByNameAPI(name) {
        return this.#fetchAdvanced(this.#getBenutzerByNameURL(name)).then((responseJSON) => {
                let response = BenutzerBO.fromJSON(responseJSON);
                return new Promise(function (resolve) {
                    resolve(response);
                })

        })
    }



}
