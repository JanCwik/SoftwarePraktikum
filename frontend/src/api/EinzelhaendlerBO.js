import NamedBO from './NamedBO';

export default class EinzelhaendlerBO extends NamedBO {

/** Damit direkt über diese KLasse ein Name angelegt werden kann,
     muss der Parameter im Constructor entgegengenommen werden
     und an die Superklasse NamedBO weitergegeben werden. */

    constructor(name) {
        super(name);
        this.benutzer_id= 0
    }

    setBenutzerID(benutzer_id) {
        this.benutzer_id = benutzer_id
    }

    getBenutzerID() {
        return this.benutzer_id
    }

    /** Gibt ein Array von EinzelhaendlerBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(einz) {
        let result = [];
        if (Array.isArray(einz)) {
            einz.forEach((c) => {
                Object.setPrototypeOf(c, EinzelhaendlerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = einz;
            Object.setPrototypeOf(c, EinzelhaendlerBO.prototype)
            result.push(c)
        }
        return result;
    }
}