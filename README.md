# simple-Api-for-notes-management

Dependencies:
----
  * express
  * body-parser
  * cors
  * mongoose


To install the dependencies run the command :
----
>npm i express body-parser cors mongoose --save

Api testing software used:
-----
PostMan  


Running the code:
----
This repository has a server.js file which is the entry point for the application.
To run the code(placed inside a folder, say NEM)  

    note: You must have MongoDB installed already

>node <foldername>NEM

You may use nodemon to monitor the server and automate the process 

>npm i nodemon --save

To run the code using nodemon  

>nodemon <foldername>NEM

Routes:
----
* /api/tutorials: GET, POST, DELETE
* /api/tutorials/: id: GET, PUT, DELETE
* /api/tutorials/published: GET

For personal use make following changes in the code
----
 1. MongoDb Schema
 Edit the Schema with prefered data in the app/models/note.model.js file
 ~~~
 mongoose.Schema(
			{
				title:String,
				description:String,
				published:Boolean
			},
			{
				timestamps:true
			}
		)
~~~
2. Edit create method in app/controllers/note.controllers.js
~~~
 //create a note
 const note = new Note({
 title:req.body.title,
 description:req.body.description,
 published:req.body.published ? req.body.published:true
 });
~~~

source:
----
https://bezkoder.com/node-express-mongodb-crud-rest-api/



