var mongoose = require('mongoose');
var Schema = mongoose.Schema;


var BlogSchema = new Schema({
	title: {
		type: String,
		required: true,
		trim: true,
		unique: true
	},
	descriptions: {
		type: String,
		required: true,
		trim: true
	},
	author: {
		type: String,
		required: true
	},
	imageUrl: {
		type: String,
	},
	createdAt: {
		type: Date,
		default: Date.now()
	},
	category: {
		type: String
	},
	comments: [
	  {
	  	text: {
	  		type: String,

	  	},
	  	commentator: {
	  		type: String
	  	}
	  }
    ]
})


module.exports = mongoose.model('Blog', BlogSchema);