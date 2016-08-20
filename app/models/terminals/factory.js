module.exports = class factory {
    constrctor() {

    }

    static getMethod(method) {
        switch (method) {
            case "PAYPAL":
                var Paypal = require("./methods/paypal");
                return new Paypal();
                break;
        }
    }

}