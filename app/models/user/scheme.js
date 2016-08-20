var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Scheme = new Schema({
    firstName: {type: String},
    lastName: {type: String},
    email: {type: String},
    country: {type: String},
    created: {type: Date},
    status: {type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELED']}
});

module.exports = mongoose.model('User', Scheme);