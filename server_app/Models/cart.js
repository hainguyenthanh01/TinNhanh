var mongoose = require('mongoose');

var schema = new mongoose.Schema(
    {
        id_user: String,
        id_product: String,
        count: Number,
        size: String,
    }
);

var Carts = mongoose.model('Carts', schema, 'carts');

module.exports = Carts;