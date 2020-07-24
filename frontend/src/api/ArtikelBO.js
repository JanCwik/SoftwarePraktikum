import NamedBO from './NamedBO';

export default class ArtikelBO extends NamedBO {

/** Damit direkt über diese KLasse ein Name angelegt werden kann,
    muss der Parameter im Constructor entgegengenommen werden
    und an die Superklasse NamedBO weitergegeben werden. */

    constructor(name) {
        super(name);
        this.einheit=""
        this.standardartikel= false
        this.benutzer_id= 0
    }

    setEinheit(einheit) {
        this.einheit = einheit
    }

    getEinheit() {
        return this.einheit
    }

   setStandardartikel(standardartikel) {
        this.standardartikel = standardartikel
    }

    getStandardartikel() {
        return this.standardartikel
    }

    setBenutzerID(benutzer_id) {
        this.benutzer_id = benutzer_id
    }

    getBenutzerID() {
        return this.benutzer_id
    }

    /** Gibt ein Array von ArtikelBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(art) {
        let result = [];
        if (Array.isArray(art)) {
            art.forEach((c) => {
                Object.setPrototypeOf(c, ArtikelBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = art;
            Object.setPrototypeOf(c, ArtikelBO.prototype)
            result.push(c)
        }
        return result;
    }
}