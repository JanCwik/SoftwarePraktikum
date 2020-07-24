export default class StatistikBO {

/** Damit direkt über diese Klasse ein Name angelegt werden kann
    muss der Parameter im Constructor entgegengenommen werden
    und an die Superklasse NamedBO weitergegeben werden */

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

    /** Gibt ein Array von StatistikBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(stat) {
        let result = [];
        if (Array.isArray(stat)) {
            stat.forEach((c) => {
                Object.setPrototypeOf(c, StatistikBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = stat;
            Object.setPrototypeOf(c, StatistikBO.prototype)
            result.push(c)
        }
        return result;
    }
}