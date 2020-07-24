import StatistikBO from "./StatistikBO";

export default class StatistikZeitraumBO extends StatistikBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor() {
        super();
        this.zeitpunkt= ""
        this.startZeitpunkt= ""
        this.endZeitpunkt = ""
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

      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(statzpkt) {
        let result = [];

        if (Array.isArray(statzpkt)) {
            statzpkt.forEach((c) => {
                Object.setPrototypeOf(c, StatistikZeitraumBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = statzpkt;
            Object.setPrototypeOf(c, StatistikZeitraumBO.prototype)
            result.push(c)
        }

        return result;


    }



}