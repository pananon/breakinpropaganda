const express = require("express")

const expressEdge = require("express-edge")

const path = require("path")

const mongoose = require("mongoose")

const bodyParser = require('body-parser')

const Post = require('./database/models/Post')

const app = new express()

mongoose.connect('mongodb://localhost/breakinpropaganda',{ useNewUrlParser: true })

app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`);

app.use(bodyParser.json())

//app.use(bodyParser.urlencoded({extended:true}))
var urlencodedParser = bodyParser.urlencoded({ extended: true })


app.get('/',async(req,res)=>{

	const posts =await Post.find({})

	console.log(posts)

	res.render('index',{
		posts
	})

})
app.get('/about',(req,res)=>{
	res.render('about')

})
app.get('/post/:id',async(req,res)=>{

	const post = await Post.findById(req.params.id)

	res.render('post',{
		post
	})

})

app.get('/posts/new',(req,res)=>{
	res.render('create')
})

app.post('/posts/store',urlencodedParser,(req,res)=>{
	Post.create(req.body,(error,post)=>{
		res.redirect('/')
	})
})
app.get('/contact',(req,res)=>{
	res.render('contact')

})

app.listen(4000,()=>{
	console.log("Server Successfully created and running")
})