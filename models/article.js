//Require necesary npm packages
const mongoose = require("mongoose");

//define articleSchema
const articleSchema = new mongoose.Schema(
	{
		title: { type: String, required: true },
		content: String,
		author: { type: String, required: true },
		published: { type: Boolean, default: true },
		publishedOn: { type: Date, default: Date.now },
	},
	{ timestamps: true }
);

//compile our Model based on the schema
const Article = mongoose.model("Article", articleSchema);

//Export our Model for use
module.exports = Article;
