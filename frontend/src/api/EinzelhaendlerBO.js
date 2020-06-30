import NamedBO from './NamedBO';

export default class EinzelhaendlerBO extends NamedBO {

    constructor() {
        super();
        this.adresse=""


    }

    setAdresse(adresse) {
        this.adresse = adresse
    }

    getAdresse() {
        return this.adresse
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