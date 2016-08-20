var Base = require("./base");
var randomstring = require("randomstring");
module.exports = class Paypal extends Base {

    init(order) {
        this.order = order;
    }

    request(req) {
       //req.
    }

    create( cb) {
        //call paypal create method
        //return token
        var token = randomstring.generate({
            length: 16,
            charset: 'alphabetic'
        });
        cb(null, {token: token});
    }

    success(data) {

    }

    validate() {

    }

    failed(data) {

    }

}


