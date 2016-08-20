var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');
var _ = require("underscore");
var PrivateDetails = require('./PrivateDetails');
var Base = require('../base');
var Order = require('../order/control');
var UserSchema = require("./scheme");
var TerminalFactory = require("../terminals/factory")
var waterfall = require('async-waterfall');

module.exports = class control extends Base {
    constructor() {
        super();
        this.db = new UserSchema();
    }

    init(firstName, lastName, email, country) {
        this.privateDetails = new PrivateDetails(firstName, lastName, email, country)
    }

    getByEmail(email, cb) {
        UserSchema.findOne({email: email}, function (err, user) {
            if (err)
                throw  err;
            if (!user)
                return cb(null, null);
            return cb(null, user);
        });
    }

    createOrder(paymentMethod, next) {
        var order = new Order();
        var self = this;
        waterfall([function (callback) {
                self.getByEmail(self.privateDetails.email, function (err, user) {
                    if (err)
                        return callback(err);
                    if (user) {
                        return callback(null, user);
                    } else {
                        self._createUser(function (err, user) {
                            if (err)
                                return callback(err);
                            callback(null, user);
                        });
                    }
                })
            }, function (user, callback) {
                var terminal = TerminalFactory.getMethod(paymentMethod);
                terminal.init(order);
                terminal.create(function (err, data) {
                    if (err)
                        return callback(err);
                    return callback(null, user, data);
                });
            }, function (user, data, callback) {
                order.setData({
                    paymentMethod: paymentMethod,
                    userId: user.id,
                    dataMethod: data,
                    email: self.privateDetails.email
                });
                order.create(function (err, count) {
                    if (err)
                        return callback(err);
                    callback(null);
                });
            }, function (callback) {
                self._sendEmail(order, callback);
            }], function (err) {
                if (err)
                    return next(err);
                next(null, {order: order});
            }
        );
    }

    _sendEmail(order, cb) {
        var email = require("../../../lib/email");
        var text = 'Hi ' + this.privateDetails.name + "," + '<br/>' + '<br/>' +
            "<b>Thanks for your order !" + "</b> " + '<br/>' + '<br/>' +
            "<b>ORDER NUMBER:</b> " + order.trackNumber + '<br/>' + '<br/>'
            + "isEco Customer care :)";
        email.send(this.privateDetails.email, text, cb);
    }

    _getCreateData() {
        return {
            firstName: this.privateDetails.firstName,
            lastName: this.privateDetails.lastName,
            email: this.privateDetails.email,
            country: this.privateDetails.country,
            created: new Date()
        }
    }

    _createUser(cb) {
        var data = this._getCreateData();
        this.db.firstName = data.firstName;
        this.db.lastName = data.lastName;
        this.db.email = data.email;
        this.db.country = data.country;
        this.db.created = data.created;
        this.db.save(cb)
    }

}




