import StatistikBO from "./StatistikBO";

export default class StatistikHuZBO extends StatistikBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);
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

      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(stathuz) {
        let result = [];

        if (Array.isArray(stathuz)) {
            stathuz.forEach((c) => {
                Object.setPrototypeOf(c, StatistikHuZBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = stathuz;
            Object.setPrototypeOf(c, StatistikHuZBO.prototype)
            result.push(c)
        }

        return result;


    }



}