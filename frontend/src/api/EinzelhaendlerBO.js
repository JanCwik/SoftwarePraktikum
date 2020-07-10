import NamedBO from './NamedBO';

export default class EinzelhaendlerBO extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);



    }

    setEinzelhaendlerName(name) {
        this.name = name
    }

    getEinzelhaendlerName() {
        return this.name
    }


      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(einz) {
        let result = [];

        if (Array.isArray(einz)) {
            einz.forEach((c) => {
                Object.setPrototypeOf(c, EinzelhaendlerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = einz;
            Object.setPrototypeOf(c, EinzelhaendlerBO.prototype)
            result.push(c)
        }

        return result;


    }



}