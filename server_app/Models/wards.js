var mongoose = require('mongoose');

var schema = new mongoose.Schema(
	{
		id_category: {
			type: String,
			ref: 'Category'
		},
		wards_id: Number,
		district_id: Number,
		name: String,
	}
);

var Wards = mongoose.model('Wards', schema, 'wards');

module.exports = Wards;