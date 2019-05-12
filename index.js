require('dotenv').config();
const express = require("express")
const expressEdge = require("express-edge")
const edge = require("edge.js")
const mongoose = require("mongoose")
const bodyParser = require('body-parser')
const fileUpload = require("express-fileupload")
const cloudinary = require("cloudinary")
const expressSession = require("express-session")
const connectMongo = require("connect-mongo")
const connectFlash = require("connect-flash")
const app = new express()
mongoose.connect('mongodb://localhost:27017/breakinpropaganda',{ useNewUrlParser: true });
const mongoStore = connectMongo(expressSession);
const createPostController = require('./controllers/createPost')
const homePageController = require('./controllers/homePage')
const storePostController = require('./controllers/storePost')
const getPostController = require('./controllers/getPost')
const aboutController = require('./controllers/about')
const contactController = require('./controllers/contact')
const createUserController = require('./controllers/createUser')
const storeUserController = require('./controllers/storeUser')
const loginController = require('./controllers/login')
const loginUserController = require('./controllers/loginUser')
const logoutController = require('./controllers/logout')

const storePost = require('./middleware/storePost')
const auth = require('./middleware/auth')
const redirectIfAuthenticated = require('./middleware/redirectIfAuthenticated')


app.use(fileUpload())
app.use(express.static('public'))
app.use(expressEdge)
app.set('views', `${__dirname}/views`);
app.use(bodyParser.json())
app.use(connectFlash())

cloudinary.config({

	api_key :process.env.CLOUINARY_API_KEY,

	api_secret :process.env.CLOUINARY_API_SECRET,

	cloud_name: process.env.CLOUINARY_NAME
}); 

app.use(expressSession({
	secret:process.env.EXPRESS_SESSION_KEY,
	store:new mongoStore({
		mongooseConnection : mongoose.connection
	})
}))

app.use('*',(req,res,next) => {

	edge.global('auth',req.session.userId)

	next()

})

 		 	       						

//app.use(bodyParser.urlencoded({extended:true}))
var urlencodedParser = bodyParser.urlencoded({ extended: true })

//app.use('/posts/store',storePost);

app.get('/',homePageController);
app.get('/about',aboutController);
app.get('/post/:id',getPostController);
app.get('/posts/new',auth,createPostController);
app.post('/posts/store',auth,storePost,urlencodedParser,storePostController);
app.get('/contact',contactController);
app.get('/auth/logout',auth,logoutController);
app.get('/auth/register',redirectIfAuthenticated,createUserController);
app.get('/auth/login',redirectIfAuthenticated,loginController);
app.post('/users/login',redirectIfAuthenticated,loginUserController);
app.post('/users/register',redirectIfAuthenticated,urlencodedParser,storeUserController);
app.use((req,res)=> res.render('not-found'));

app.listen(process.env.PORT,()=>{
	console.log("Server Successfully created and running")
})