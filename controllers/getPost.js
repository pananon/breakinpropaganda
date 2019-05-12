const Post = require('../database/models/Post')

module.exports = async(req,res) => {

	const post = await Post.findById(req.params.id).populate('user_id');

	res.render('post',{
		post
	})
}