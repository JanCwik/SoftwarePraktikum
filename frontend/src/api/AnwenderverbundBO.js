import NamedBO from './NamedBO';

export default class AnwenderverbundBO extends NamedBO {

/** Damit direkt über diese KLasse ein Name angelegt werden kann,
     muss der Parameter im Constructor entgegengenommen werden
     und an die Superklasse NamedBO weitergegeben werden. */

   constructor(name) {
        super(name);
   }

    /** Gibt ein Array von AnwenderverbundBOs von einer gegebenen JSON Struktur zurück */
    static fromJSON(verb) {
        let result = [];
        if (Array.isArray(verb)) {
            verb.forEach((c) => {
                Object.setPrototypeOf(c, AnwenderverbundBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich um ein einzelnes Objekt
            let c = verb;
            Object.setPrototypeOf(c, AnwenderverbundBO.prototype)
            result.push(c)
        }
        return result;
    }
}

