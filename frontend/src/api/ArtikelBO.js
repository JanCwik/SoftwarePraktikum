import NamedBO from './NamedBO';

export default class ArtikelBO extends NamedBO {

    constructor() {
        super();
        this.einheit=""
        this.standardartikel= false

    }

    setEinheit(einheit) {
        this.einheit = einheit
    }

    getEinheit() {
        return this.einheit
    }

   setStandardartikel(standardartikel) {
        this.einheit = standardartikel
    }

    getStandardartikel() {
        return this.standardartikel
    }


      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(art) {
        let result = [];

        if (Array.isArray(art)) {
            art.forEach((c) => {
                Object.setPrototypeOf(c, ArtikelBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = art;
            Object.setPrototypeOf(c, ArtikelBO.prototype)
            result.push(c)
        }

        return result;


    }



}