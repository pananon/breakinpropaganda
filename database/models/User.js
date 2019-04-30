const bcrypt = require('bcrypt')

const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({

	username : {

		type:String,

		required: [true,"Please provide username"],

		unique : true

	},

	email :{

		type:String,

		required: [true,"Please provide email"],

		unique : true

	}, 

	password :{

		type:String,

		required: [true,"Please enter a tough password"],

	}

})

UserSchema.pre('save',function(next){

	const user = this

	bcrypt.hash(user.password, 10,function(error,encrypted){
		user.password =encrypted
		next()
	})

})

module.exports = mongoose.model('User',UserSchema)
