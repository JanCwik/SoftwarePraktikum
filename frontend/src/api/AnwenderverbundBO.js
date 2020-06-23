import NamedBO from './NamedBO';

export default class AnwenderverbundBO extends NamedBO {

   constructor() {
        super();

   }


    /*
    Nutzungsmöglichkeit:

        let outputHTML = '';
        customers = Customer.fromJSON(this.responseText);
        customers.forEach((c) => {
            outputHTML += '<div class='customer'>' + c.getFirstName() + ' ' + c.getLastName() + '</div>';
        });

    */

    // Returns an Array of CustomerBOs from a given JSON structure
/*

    static fromJSON(customers) {
        let result = [];

        if (Array.isArray(customers)) {
            customers.forEach((c) => {
                Object.setPrototypeOf(c, CustomerBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = customers;
            Object.setPrototypeOf(c, CustomerBO.prototype)
            result.push(c)
        }

        return result;
    }
*/
}

