import StatistikBO from "./StatistikBO";

export default class StatistikHuZBO extends StatistikBO {

/** Damit direkt über diese Klasse ein Name angelegt werden kann
    muss der Parameter im Constructor entgegengenommen werden
    und an die Superklasse NamedBO weitergegeben werden */

    constructor() {
        super();
        this.zeitpunkt= ""
        this.startZeitpunkt= ""
        this.endZeitpunkt = ""
        this.einzelhaendlerName = ""
        this.einzelhaendlerID = null
    }

    setZeitpunkt(zeitpunkt) {
        this.zeitpunkt = zeitpunkt
    }

    getZeitpunkt() {
        return this.zeitpunkt
    }

    setStartZeitpunkt(startZeitpunkt) {
        this.startZeitpunkt = startZeitpunkt
    }

    getStartZeitpunkt() {
        return this.startZeitpunkt
    }

    setEndZeitpunkt(endZeitpunkt) {
        this.endZeitpunkt = endZeitpunkt
    }

    getEndZeitpunkt() {
        return this.endZeitpunkt
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

    /** Gibt ein Array von StatistikHuZBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(stathuz) {
        let result = [];
        if (Array.isArray(stathuz)) {
            stathuz.forEach((c) => {
                Object.setPrototypeOf(c, StatistikHuZBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = stathuz;
            Object.setPrototypeOf(c, StatistikHuZBO.prototype)
            result.push(c)
        }
        return result;
    }
}