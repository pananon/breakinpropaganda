const User = require('../database/models/User')

module.exports = (req,res,next) =>{

	User.findById(req.session.userId,(error,user) => {

		if(error || !user){
			return res.redirect('/auth/login')
		}

		next()
	})

} 