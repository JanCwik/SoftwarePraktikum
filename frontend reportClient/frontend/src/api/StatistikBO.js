import NamedBO from "../../../../frontend/src/api/NamedBO";

export default class StatistikBO extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);
        this.artikelName= ""
        this.gesamtAnzahl = null
        this.artikelID = null
    }

    setArtikelName(artikelName) {
        this.artikelName = artikelName
    }

    getArtikelName() {
        return this.artikelName
    }

    setGesamtZahl(gesamtAnzahl) {
        this.gesamtAnzahl = gesamtAnzahl
    }

    getGesamtAnzahl() {
        return this.gesamtAnzahl
    }

    setArtikelID(artikelID) {
        this.artikelID = artikelID
    }

    getArtikelID() {
        return this.artikelID
    }

      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(stat) {
        let result = [];

        if (Array.isArray(stat)) {
            stat.forEach((c) => {
                Object.setPrototypeOf(c, StatistikBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = stat;
            Object.setPrototypeOf(c, StatistikBO.prototype)
            result.push(c)
        }

        return result;


    }



}