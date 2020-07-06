import NamedBO from './NamedBO';

export default class  extends NamedBO {
//damit direkt über diese KLasse ein Name angelegt werden kann
ListeneintragBO// muss der Parameter im Constructor entgegengenommen werden
// und an die superklasse NapedBo weitergegeben werden
    constructor(name) {
        super(name);
        this.menge=""
    }

    setMenge(menge) {
        this.menge = menge
    }

    getMenge() {
        return this.menge


      // Returns an Array of CustomerBOs from a given JSON structure
    static fromJSON(lis) {
        let result = [];

        if (Array.isArray(lis)) {
            lis.forEach((c) => {
                Object.setPrototypeOf(c, ListeneintragBO.prototype)
                result.push(c)
            })
        } else {
            // Es handelt sich offenbar um ein singuläres Objekt
            let c = lis;
            Object.setPrototypeOf(c, ListeneintragBO.prototype)
            result.push(c)
        }

        return result;


    }



}