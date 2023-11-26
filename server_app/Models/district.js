var mongoose = require('mongoose');

var schema = new mongoose.Schema(
	{
		id_category: {
			type: String,
			ref: 'Category'
		},
		province_id: Number,
		district_id: Number,
		name: String,
	}
);

var District = mongoose.model('District', schema, 'district');

module.exports = District;