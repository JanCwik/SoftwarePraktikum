import NamedBO from './NamedBO';

export default class EinkaufslisteBO extends NamedBO {

/** Damit direkt über diese KLasse ein Name angelegt werden kann,
     muss der Parameter im Constructor entgegengenommen werden
     und an die Superklasse NamedBO weitergegeben werden. */

    constructor(name) {
        super(name);
        this.aenderungs_zeitpunkt= ""
        this.anwenderverbund_id= null

    }

    setAenderungsZeitpunkt(aenderungs_zeitpunkt) {
        this.aenderungs_zeitpunkt = aenderungs_zeitpunkt
    }

    getAenderungsZeitpunkt() {
        return this.aenderungs_zeitpunkt
    }

   setAnwenderverbundID(anwenderverbund_id) {
        this.anwenderverbund_id = anwenderverbund_id
    }

    getAnwenderverbundID() {
        return this.anwenderverbund_id
    }

    /** Gibt ein Array von EinkaufslisteBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(eink) {
        let result = [];
        if (Array.isArray(eink)) {
            eink.forEach((c) => {
                Object.setPrototypeOf(c, EinkaufslisteBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = eink;
            Object.setPrototypeOf(c, EinkaufslisteBO.prototype)
            result.push(c)
        }
        return result;
    }
}