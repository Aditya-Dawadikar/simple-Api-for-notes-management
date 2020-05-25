module.exports=mongoose=>{
	const Note = mongoose.model(
		"note",
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
	);

	return Note;
};