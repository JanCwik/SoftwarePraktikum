import BusinessObject from './BusinessObject';

export default class NamedBO extends BusinessObject {
//ein name kann im Constructor von deun SubKlassen angenommen werden
// und hier in das Atribut name geschrieben werden
   constructor(name) {
       super();
        this.erstellungs_zeitpunkt = null;
        this.name = name;
   }

    setErstellungsZeitpunkt(erstellungs_zeitpunkt) {
        this.erstellungs_zeitpunkt = erstellungs_zeitpunkt
    }

    getErstellungsZeitpunkt() {
        return this.erstellungs_zeitpunkt
    }

    setName(name) {
        this.name = name
    }

    getName() {
        return this.name
    }


    /*
    toString() {
        let result = ''
        for (var prop in this) {
            result += prop + ': ' + this[prop] + ' ';
        }
        return result;
    }
*/
}