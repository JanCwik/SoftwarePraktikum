import NamedBO from './NamedBO';

export default class BenutzerBO extends NamedBO {

/** Damit direkt über diese KLasse ein Name angelegt werden kann,
    muss der Parameter im Constructor entgegengenommen werden
    und an die Superklasse NamedBO weitergegeben werden. */

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

    /** Gibt ein Array von BenutzerBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(ben) {
        let result = [];
        if (Array.isArray(ben)) {
            ben.forEach((c) => {
                Object.setPrototypeOf(c, BenutzerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = ben;
            Object.setPrototypeOf(c, BenutzerBO.prototype)
            result.push(c)
        }
        return result;
    }
}