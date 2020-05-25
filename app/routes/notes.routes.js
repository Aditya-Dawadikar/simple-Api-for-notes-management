module.exports = app=>{
	const notes= require("../controllers/note.controller.js");
	
	var router = require("express").Router();

	//create a new note
	router.post("/",notes.create);

	//retrieve all notes
	router.get("/",notes.findAll);

	//retrieve all published notes
	router.get("/published", notes.findAllPublished);

	//retrieve a single note with id
	router.get("/:id",notes.findOne);

	//update a note with id
	router.put("/:id",notes.update);

	//delete a note with id
	router.delete("/:id",notes.delete);

	//delete all notes
	router.delete("/",notes.deleteAll);

	app.use('/api/notes',router);
};