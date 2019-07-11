const express=require('express')
const path = require("path");
const cors=require('cors')
const app=express()


const {mongoose}=require('./config/database')

// 1st appoach
const router=require('./config/route')
//2nd approach
const categoriesRouter=require('./app/controllers/categoriesController')
const tagsRouter=require('./app/controllers/tagController')
const { usersRouter } = require('./app/controllers/UserController')




app.use(express.json())
app.use(cors())
app.use('/', router)
app.use('/users',usersRouter)              
app.use('/categories',categoriesRouter) //2nd approach map up here
app.use('/categories/:id',categoriesRouter)
app.use('/tags',tagsRouter) //1st approach map here
// app.use('/products', poductRouter)
const port = process.env.PORT || 3005
	app.use(express.static(path.join(__dirname,"note-client/build")))


	app.get("*",(req,res)=>{
    		res.sendFile(path.join(__dirname + "/note-client/build/index.html"))
	})

	app.get('/', (req,res)=>{
		res.send('welcome to my note taking app')
	})

app.listen(port,()=>{
    console.log('listening to port',port)
})
