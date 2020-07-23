export default class StatistikBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor() {
        this.ArtikelName= ""
        this.GesamtAnzahl = null
        this.ArtikelID = null
    }

    setArtikelName(artikelName) {
        this.ArtikelName = artikelName
    }

    getArtikelName() {
        return this.ArtikelName
    }

    setGesamtZahl(gesamtAnzahl) {
        this.GesamtAnzahl = gesamtAnzahl
    }

    getGesamtAnzahl() {
        return this.GesamtAnzahl
    }

    setArtikelID(artikelID) {
        this.ArtikelID = artikelID
    }

    getArtikelID() {
        return this.ArtikelID
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