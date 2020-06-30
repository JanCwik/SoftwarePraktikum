import NamedBO from './NamedBO';

export default class AnwenderverbundBO extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
   constructor(name) {
        super(name);

   }


    /*
    Nutzungsmöglichkeit:

        let outputHTML = '';
        customers = Customer.fromJSON(this.responseText);
        customers.forEach((c) => {
            outputHTML += '<div class='customer'>' + c.getFirstName() + ' ' + c.getLastName() + '</div>';
        });

    */

    static fromJSON(verb) {
        let result = [];

        if (Array.isArray(verb)) {
            verb.forEach((c) => {
                Object.setPrototypeOf(c, AnwenderverbundBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = verb;
            Object.setPrototypeOf(c, AnwenderverbundBO.prototype)
            result.push(c)
        }

        return result;


    }

}

