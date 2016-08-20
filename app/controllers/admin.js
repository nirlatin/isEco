var numeral = require('numeral');
var bcrypt = require('bcrypt-nodejs');

exports.users = function (req, res) {
    var User = require("../models/user/scheme.js");
    User.find(function (err, users) {
        res.render('admin/users', {
            users: users
        });
    })
}


exports.orders = function (req, res) {
    var OrderSchema = require("../models/order/schema.js");
    OrderSchema.find(function (err, orders) {
        res.render('admin/orders', {
            orders: orders
        });
    })
}
