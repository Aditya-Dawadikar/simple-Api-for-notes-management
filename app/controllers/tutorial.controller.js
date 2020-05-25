const db = require("../models");
const Tutorial = db.tutorials;

//create and save a new tutorial
exports.create = (req,res)=>{
	//validate request
	if(!req.body.title){
		res.status(400).send({message:"content cannot be empty!"});
		return;
	}

	//create a tutorial
	const tutorial = new Tutorial({
		title:req.body.title,
		description:req.body.description,
		published:req.body.published ? req.body.published:true
	});

	//save tutorial in the database
	tutorial.save(tutorial).then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while creating the tutorial"
		});
	});
};

//retreive all tutorials from data base
exports.findAll=(req,res)=>{
	const title= req.query.title;
	var condition = title? {title:{$regex:new RegExp(title),$options:"i"}}:{};

	Tutorial.find(condition).then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while retrieving tutorials"
		});
	});	
};

//find a single tutorial with an id
exports.findOne=(req,res)=>{
	const id = req.params.id;

	Tutorial.findById(id).then(data=>{
		if(!data){
			res.status(404).send({message:"not found tutorial with id:"+id});
		}else{
			res.send(data);
		}
	})
	.catch(err=>{
		res.status(500).send({message:"Error retrieving tutorial with id:"+id});
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

	Tutorial.findByIdAndUpdate(id,req.body,{useFindAndModify:false})
	.then(data=>{
		if(!data){
			res.status(400).send({
				message:"cannot update tutorial with id:"+id
			});
		}else{
			res.send({message:"tutorial was updated successfully"});
		}
	})
	.catch(err=>{
		res.status(500).send({
			message:"Error updating tutorial with id:"+id
		});
	});

};

//delete a tutorial by id 
exports.delete=(req,res)=>{
	const id= req.params.id;

	Tutorial.findByIdAndRemove(id)
	.then(data=>{
		if(!data){
			res.status(404).send({
				message:"cannot delete tutorial with id:"+id
			});
		}else{
			res.send({
				message:"tutorial was deleted successfully"
			});
		}
	})
	.catch(err=>{
		res.status(500).send({
			message:"Could not delete tutorial with id:"+id
		});
	});
};

//delete all tutorials
exports.deleteAll=(req,res)=>{
	Tutorial.deleteMany({})
	.then(data=>{
		res.send({
			message:data.deletedCount+"Tutorials were deleted successfully"
		});
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message || "some error occured while removing all tutorials"
		});
	});
};
	
//find all published tutorials
exports.findAllPublished=(req,res)=>{
	Tutorial.find({published:true})
	.then(data=>{
		res.send(data);
	})
	.catch(err=>{
		res.status(500).send({
			message:err.message|| "some error occured while retrieving tutorials"
		});
	});
};





















