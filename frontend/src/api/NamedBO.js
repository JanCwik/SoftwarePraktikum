import BusinessObject from './BusinessObject';

export default class NamedBO extends BusinessObject {

/** Ein Name kann im Constructor von den Subklassen angenommen
     und hier in das Attribut name geschrieben werden. */
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
}