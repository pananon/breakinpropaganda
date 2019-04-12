const express = require("express")

const expressEdge = require("express-edge")

const path = require("path")

const mongoose = require("mongoose")

const app = new express()

mongoose.connect('mongodb://localhost/breakinpropaganda')

app.use(express.static('public'))

app.use(expressEdge)

app.set('views', `${__dirname}/views`);

app.get('/',(req,res)=>{
	res.render('index')

})
app.get('/about',(req,res)=>{
	res.render('about')

})
app.get('/post',(req,res)=>{
	res.render('post')

})
app.get('/contact',(req,res)=>{
	res.render('contact')

})

app.listen(4000,()=>{
	console.log("Server Successfully created and running")
})