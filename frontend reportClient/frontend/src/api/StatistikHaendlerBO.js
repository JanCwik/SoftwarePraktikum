import StatistikBO from "./StatistikBO";

export default class StatistikHaendlerBO extends StatistikBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);
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

      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(stathndl) {
        let result = [];

        if (Array.isArray(stathndl)) {
            stathndl.forEach((c) => {
                Object.setPrototypeOf(c, StatistikHaendlerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = stathndl;
            Object.setPrototypeOf(c, StatistikHaendlerBO.prototype)
            result.push(c)
        }

        return result;


    }



}