import NamedBO from './NamedBO';

export default class EinkaufslisteBO extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
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



      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(eink) {
        let result = [];

        if (Array.isArray(eink)) {
            eink.forEach((c) => {
                Object.setPrototypeOf(c, EinkaufslisteBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = eink;
            Object.setPrototypeOf(c, this.EinkaufslisteBO.prototype)
            result.push(c)
        }

        return result;


    }



}