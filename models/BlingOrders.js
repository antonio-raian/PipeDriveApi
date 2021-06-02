const mongoose = require('mongoose');

// Create a Schema to Database
const OrdersSchema = mongoose.Schema({
	date:{
		type: Date,
		required: true
	},
	itens:{
		type: [],
		required: true
	},
	count:{
		type: Number
	},
	valueTotal:{
		type: {},
		required: true
	},
	createdAt: {
		type: Date,
		default: Date.now
	}
});

module.exports = mongoose.model('OrdersBling', OrdersSchema);