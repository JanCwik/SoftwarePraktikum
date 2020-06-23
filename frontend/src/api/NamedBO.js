import BusinessObject from './BusinessObject';

export default class NamedBO extends BusinessObject {

   constructor() {
       super();
        this.erstellungs_zeitpunkt = null;
        this.name = "";
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