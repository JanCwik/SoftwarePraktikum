import NamedBO from './NamedBO';

export default class BenutzerBO extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);
        this.email=""
        this.google_id= 0

    }

    setEMail(email) {
        this.email = email
    }

    getEMail() {
        return this.email
    }

   setGoogleID(google_id) {
        this.google_id = google_id
    }

    getGoogleID() {
        return this.google_id
    }


      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(ben) {
        let result = [];

        if (Array.isArray(ben)) {
            ben.forEach((c) => {
                Object.setPrototypeOf(c, BenutzerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = ben;
            Object.setPrototypeOf(c, BenutzerBO.prototype)
            result.push(c)
        }

        return result;


    }



}