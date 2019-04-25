const mongoose = require('mongoose')

const Post = require('./database/models/Post')

mongoose.connect('mongodb://localhost/breakinpropaganda-test',{ useNewUrlParser: true })

Post.find({
	title: 'My First blog post'
},(error,post)=>{
	console.log(error,post)
})

/*Post.create({
	title:"My Second blog post",

	description : "Second Post description",

	content : "Second Lorem ipsum contetnt."

},(error,post)=>{
	console.log(error,post)
})*/