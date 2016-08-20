var mongoose = require('mongoose');

var Schema = mongoose.Schema;
var Scheme = new Schema({
    token: {type: String},
    trackNumber: {type: String},
    dataMethod: {type: Object},
    paymentMethod: {type: String},
    created: {type: Date},
    status: {type: String, enum: ['PENDING', 'SUCCESS', 'FAILED', 'CANCELED']},
    ingredients: [
        {type: Schema.Types.ObjectId, ref: 'User'}
    ]
});

module.exports = mongoose.model('Order', Scheme);