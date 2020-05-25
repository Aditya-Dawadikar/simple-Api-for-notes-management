const express= require('express');
const bodyParser=require('body-parser');
const cors=require('cors');

const app=express();

var corsOptions={
	origin:"http://localhost:3000"
};


//middle ware
app.use(cors(corsOptions));

//parse requests of content-type  - application/json
app.use(bodyParser.json());

//parse requests of content-type -application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({extended:true}));

const db = require("./app/models");
db.mongoose.connect(db.url,{
	useNewUrlParser:true
})
.then(()=>{
	console.log("connected to database");
})
.catch(err=>{
	console.log("Cannot connect to db",err);
	process.exit();
});

//simple route
app.get("/",(req,res)=>{
	res.json({message:"welcome to my application"});
});

require("./app/routes/tutorials.routes")(app);


//set port,listen for requests
const port = process.env.PORT || 3000;
app.listen(port,()=>{
	console.log('server is running on port :'+port);
}); 



















