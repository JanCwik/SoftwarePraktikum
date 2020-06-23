import BusinessObject from './BusinessObject';

export default class NamedBO extends BusinessObject {

   constructor() {
       super();
        this.ErstellungsZeitpunkt = null;
        this.Name = "";
   }

    setErstellungsZeitpunkt(ErstellungsZeitpunkt) {
        this.ErstellungsZeitpunkt = ErstellungsZeitpunkt
    }

    getErstellungsZeitpunkt() {
        return this.ErstellungsZeitpunkt
    }

    setName(Name) {
        this.Name = Name
    }

    getName() {
        return this.Name
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