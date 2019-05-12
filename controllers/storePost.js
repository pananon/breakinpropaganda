const path = require('path')

const cloudinary = require('cloudinary')

const Post = require('../database/models/Post')


module.exports = (req,res) => {
	
	const {image} = req.files

	const uploadPath = path.resolve(__dirname,'..','public/posts',image.name);	

	image.mv(uploadPath,(error) =>{

		cloudinary.v2.uploader.upload(uploadPath,(error,result)=>{

			if(error){
				return res.redirect("/posts/new");
			}
		Post.create({
			...req.body,
			//image:`/posts/${image.name}` ,

			image : result.secure_url,

			user_id :req.session.userId


		},(error,post)=>{
		res.redirect('/');

	});

	
	});
	})


}