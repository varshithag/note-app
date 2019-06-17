const mongoose=require('mongoose')
const CONNECTION_URI = process.env.MONGODB_URI || "mongodb+srv://varshitha:varshithag@123@cluster0-ll79k.mongodb.net/test?retryWrites=true&w=majority"
	mongoose
		.connect(CONNECTION_URI, {
			useNewUrlParser: true
		})
		.then(() => {
			console.log("db connected succefully");
		})
			.catch(err => {
			console.log("Error connecting to DB", err);
		});

//connect express to mongo via mongoose
//configure the promise library to be ES6 pomises //mongodb://localhost:27017/notes-app-feb
mongoose.Promise=global.Promise //its native present in javascript
//connect to db

mongoose.connect(CONNECTION_URI,{useNewUrlParser: true})
.then((res)=>{
    console.log('connected to db')
})
.catch((err)=>{
    console.log('error connecting to db')
})

module.exports={mongoose}
