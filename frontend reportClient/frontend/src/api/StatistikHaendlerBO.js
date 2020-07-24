import StatistikBO from "./StatistikBO";

export default class StatistikHaendlerBO extends StatistikBO {

/**Damit direkt über diese KLasse ein Name angelegt werden kann
 * muss der Parameter im Constructor entgegengenommen werden
 * und an die superklasse NamedBO weitergegeben werden. */

    constructor() {
        super();
        this.einzelhaendlerName= ""
        this.einzelhaendlerID = null
    }

    setEinzelhaendlerName(einzelhaendlerName) {
        this.einzelhaendlerName = einzelhaendlerName
    }

    getEinzelhaendlerName() {
        return this.einzelhaendlerName
    }

    setEinzelhaendlerID(einzelhaendlerID) {
        this.einzelhaendlerID = einzelhaendlerID
    }

    getEinzelhaendlerID() {
        return this.einzelhaendlerID
    }

    /** Gibt ein Array von StatistikHaendlerBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(stathndl) {
        let result = [];
        if (Array.isArray(stathndl)) {
            stathndl.forEach((c) => {
                Object.setPrototypeOf(c, StatistikHaendlerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = stathndl;
            Object.setPrototypeOf(c, StatistikHaendlerBO.prototype)
            result.push(c)
        }
        return result;
    }
}