const db = require("../models");
const Note = db.notes;

//create and save a new note
exports.create = (req,res)=>{
	//validate request
	if(!req.body.title){
		res.status(400).send({message:"content cannot be empty!"});
		return;
	}

	//create a note
	const note = new Note({
		title:req.body.title,
		description:req.body.description,
		published:req.body.published ? req.body.published:true
	});

	//save note in the database
	note.save(note).then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while creating the note"
		});
	});
};

//retreive all notes from data base
exports.findAll=(req,res)=>{
	const title= req.query.title;
	var condition = title? {title:{$regex:new RegExp(title),$options:"i"}}:{};

	Note.find(condition).then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while retrieving notes"
		});
	});	
};

//find a single note with an id
exports.findOne=(req,res)=>{
	const id = req.params.id;

	Note.findById(id).then(data=>{
		if(!data){
			res.status(404).send({message:"not found note with id:"+id});
		}else{
			res.send(data);
		}
	})
	.catch(err=>{
		res.status(500).send({message:"Error retrieving note with id:"+id});
	});
};

//update a tutoral by the id in the request
exports.update=(req,res)=>{
	if(!req.body){
		return res.status(400).send({
			message:"data to updated cannot be empty!"
		});
	}

	const id= req.params.id;

	Note.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
	.then(data=>{
		if(!data){
			res.status(400).send({
				message:"cannot update note with id:"+id
			});
		}else{
			res.send({message:"note was updated successfully"});
		}
	})
	.catch(err=>{
		res.status(500).send({
			message:"Error updating note with id:"+id
		});
	});

};

//delete a note by id 
exports.delete=(req,res)=>{
	const id= req.params.id;

	Note.findByIdAndRemove(id)
	.then(data=>{
		if(!data){
			res.status(404).send({
				message:"cannot delete note with id:"+id
			});
		}else{
			res.send({
				message:"note was deleted successfully"
			});
		}
	})
	.catch(err=>{
		res.status(500).send({
			message:"Could not delete note with id:"+id
		});
	});
};

//delete all notes
exports.deleteAll=(req,res)=>{
	Note.deleteMany({})
	.then(data=>{
		res.send({
			message:data.deletedCount+"Notes were deleted successfully"
		});
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while removing all notes"
		});
	});
};
	
//find all published notes
exports.findAllPublished=(req,res)=>{
	Note.find({published:true})
	.then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message|| "some error occured while retrieving notes"
		});
	});
};





















