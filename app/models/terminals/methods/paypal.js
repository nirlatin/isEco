var Base = require("./base");
var randomstring = require("randomstring");
module.exports = class Paypal extends Base {

    init(order) {
        this.order = order;
    }

    request(req) {
        //request data unique
    }

    create(cb) {
        //call paypal create method
        //return token
        var token = randomstring.generate({
            length: 16,
            charset: 'alphabetic'
        });
        cb(null, {token: token});
    }

    success(cb) {
        this.order.success(function (err,order) {
            if (err)
                return cb(err);
            return cb(null)
        })
    }

    validate() {

    }

    failed(cb) {
        this.order.failed(function (err) {
            if (err)
                return cb(err);
            return cb(null)
        })
    }

}


