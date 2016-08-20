var randomstring = require("randomstring");
var OrderScheme = require("./schema");
var waterfall = require('async-waterfall');

var _getRandString = function (length = 16, charset = 'alphanumeric') {
    return randomstring.generate({
        length: length,
        charset: charset
    });
}


module.exports = class Order {

    constructor() {
        this.db = new OrderScheme();
        this.email = null;
        this.token = null;
        this.trackNumber = null;
        this.dataMethod = null;
        //this.sum = 100;
    }

    initByToken(token, cb) {
        console.log("init by token")
        var self = this;
        waterfall([function (callback) {
            self.getByToken(token, callback);
        }, function (order, callback) {
            self.setData(order);
            console.log(order);
            self.status = order.status;
            callback(null);
        }], function (err) {
            if (err)
                return cb(err);
            cb();
        })
    }

    getByToken(token, cb) {
        OrderScheme.findOne({token: token}, function (err, order) {
            if (err)
                throw  err;
            if (!order)
                return cb("ORDER_NOT_FOUND");
            return cb(null, order);
        });
    }

    success(cb) {
        this._updateStatus("SUCCESS", cb);
    }

    _updateStatus(status, cb) {
        OrderScheme.update({id: this.id}, {$set: {status: status}}, function (err, order) {
            if (err)
                throw  err;
            return cb(null, order);
        });
    }

    failed(cb) {
        this._updateStatus("FAILED", cb);
    }

    setData(data) {
        this.email = data.email;
        this.dataMethod = data.dataMethod;
        this.userId = data.userId;
        this.paymentMethod = data.paymentMethod;
    }

    create(cb) {
        var data = this._getCreateData();
        this.db.token = data.token;
        this.db.trackNumber = data.trackNumber;
        this.db.dataMethod = data.dataMethod;
        this.db.status = data.status;
        this.db.created = data.created;
        this.db.paymentMethod = data.paymentMethod;
        this.db.ingredients.push(data.userId);

        this.db.save(cb)
    }

    _getCreateData() {
        this.trackNumber = _getRandString(16, "numeric");
        this.token = _getRandString();
        return {
            token: this.token,
            trackNumber: this.trackNumber,
            status: "PENDING",
            userId: this.userId,
            created: new Date(),
            paymentMethod: this.paymentMethod,
            dataMethod: this.dataMethod
        }
    }

}

