import mongoose from 'mongoose';

const postSchema = mongoose.Schema({

	connector:String,
	url:String,
	username:String,
	creator:String,
	password:String,
	createdAt:{
		type:Date,
		default:new Date()
	}
})

const PostModel = mongoose.model('ActionModel',postSchema)

export default PostModel

