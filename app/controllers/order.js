var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');
var dateFormat = require('dateformat');
var User = require("../models/user/control")
var _ = require("underscore")
var validator = require("validator")
var PrivateDetails = require("../models/user/privateDetails")
var TerminalFactory = require("../models/terminals/factory")
var Order = require("../models/order/control")
var waterfall = require('async-waterfall');

exports.create = function (req, res, next) {
    console.log("Asd");
    var firstName = req.body.firstName;
    if (_.isEmpty(firstName))
        return res.status(400).send({error: "FIRSTNAME_EMPTY"});
    var lastName = req.body.lastName;
    if (_.isEmpty(lastName))
        return res.status(400).send({error: "LASTNAME_EMPTY"});
    var email = req.body.email;
    if (_.isEmpty(email))
        return res.status(400).send({error: "EMAIL_EMPTY"});
    if (!validator.isEmail(email))
        return res.status(400).send({error: "EMAIL_INVALID"});
    var country = req.body.country;

    if (!PrivateDetails.isCountryAllow(country))
        return res.status(400).send({error: "COUNTRY_INVALID"});
    var paymentMethod = "PAYPAL";
    var user = new User();

    user.init(firstName, lastName, email, country);
    user.createOrder(paymentMethod, function (err, dataCreated) {
        if (err)
            throw err;
        res.send({order: {trackNumber: dataCreated.order.trackNumber}});
    });

}

exports.checkout = function (req, res, next) {
    res.render('checkout', {title: "Checkout", countries: PrivateDetails.getCountries()});
}

exports.success = function (req, res, next) {
    var token = req.query.token;
    if (_.isEmpty(token))
        throw new Error("TOKEN_EMPTY");
    var order = new Order();
    waterfall([function (callback) {
        order.initByToken(token, function (err) {
            if (err)
                return callback(err);
            return callback(null);
        });
    }, function (callback) {
        console.log(order);
        console.log("PENDING");
        if (order.status != "PENDING")
            return callback("ORDER_STATUS_INVALID");
        else
            return callback(null);
    }, function (callback) {
        var terminal = TerminalFactory.getMethod(order.paymentMethod);
        terminal.init(order);
        terminal.request(req);
        terminal.validate();
        terminal.success(callback);
    }], function (err) {
        if (err)
            return next(err);
        res.send();
    })
}

exports.failed = function (req, res, next) {
    var token = req.query.token;
    if (_.isEmpty(token))
        throw new Error("TOKEN_EMPTY");
    var order = new Order();
    waterfall([function (callback) {
        order.initByToken(token, function (err) {
            if (err)
                return callback(err);
            console.log("RET");
            return callback(null);
        });
    }, function (callback) {
        if (order.status != "PENDING")
            return callback("ORDER_STATUS_INVALID");
        return callback(null)
    }, function (callback) {
        var terminal = TerminalFactory.getMethod(order.paymentMethod);
        terminal.init(order);
        terminal.request(req);
        terminal.validate();
        terminal.failed(callback);
    }], function (err) {
        if (err)
            return next(err);
        res.send();
    })
}


