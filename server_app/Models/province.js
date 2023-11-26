var mongoose = require('mongoose');

var schema = new mongoose.Schema(
	{
		id_category: {
			type: String,
			ref: 'Category'
		},
		province_id: Number,
		name: String,
	}
);

var Province = mongoose.model('Province', schema, 'province');

module.exports = Province;