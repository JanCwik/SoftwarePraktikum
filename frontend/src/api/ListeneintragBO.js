import BusinessObject from "./BusinessObject";

export default class ListeneintragBO extends BusinessObject {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor() {
        super();
        this.menge=""
        this.erledigt= false
        this.aenderungs_zeitpunkt= ""
        this.einkaufsliste_id= null
        this.einzelhaendler_id= null
        this.artikel_id= null
        this.benutzer_id= null
    }

    setMenge(menge) {
        this.menge = menge
    }

    getMenge() {
        return this.menge
    }


    setErledigt(erledigt) {
        this.erledigt = erledigt
    }

    getErledigt() {
        return this.erledigt
    }


    setAenderungs_zeitpunkt(aenderungs_zeitpunkt) {
        this.aenderungs_zeitpunkt = aenderungs_zeitpunkt
    }

    getAenderungs_zeitpunkt() {
        return this.aenderungs_zeitpunkt
    }


    setEinkaufsliste_id(einkaufsliste_id) {
        this.einkaufsliste_id = einkaufsliste_id
    }

    getEinkaufsliste_id() {
        return this.einkaufsliste_id
    }


    setEinzelhaendler_id(einzelhaendler_id) {
        this.einzelhaendler_id = einzelhaendler_id
    }

    getEinzelhaendler_id() {
        return this.einzelhaendler_id
    }


    setArtikel_id(artikel_id) {
        this.artikel_id = artikel_id
    }

    getArtikel_id() {
        return this.artikel_id
    }


    setBenutzer_id(benutzer_id) {
        this.benutzer_id = benutzer_id
    }

    getBenutzer_id() {
        return this.benutzer_id
    }

      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(lis) {
        let result = [];

        if (Array.isArray(lis)) {
            lis.forEach((c) => {
                Object.setPrototypeOf(c, ListeneintragBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = lis;
            Object.setPrototypeOf(c, ListeneintragBO.prototype)
            result.push(c)
        }

        return result;


    }



}