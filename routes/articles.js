//Require necessary NPM Package
const express = require("express");

//Require Mongoose Model for Article
const Article = require("./../models/article");

//Instantiate a Router (mini app that only handles routes)
const router = express.Router();

/**
 * Action:         INDEX
 * Method:         HTTP GET method
 * URI:            /api/articles
 * Description:    Get All Articles (what the route is going to do)
 */
router.get("/api/articles", (req, res) => {
	//use the Articles model imported above
	Article.find()
		//return all articles as an array
		.then((articles) => {
			res.status(200).json({ articles: articles });
		})
		//Catch any errors that might occur
		.catch((error) => {
			res.status(500).json({ error: error });
		});
});

/**
 * Action:          SHOW
 *  Method:         HTTP GET method
 * URI:            /api/articles/5d664b8b68b4bjdbjdbj
 * Description:    Get an individual Article by Article ID
 */
router.get("/api/articles/:id", (req, res) => {
	//use the Articles model imported above
	Article.findById(req.params.id)
		//return an articles as an array
		.then((article) => {
			if (article) {
				res.status(200).json({ articles: article });
			} else {
				//If we couldn't find a document with the matching ID
				res.status(404).json({
					error: {
						name: "DocumentNotFoundError",
						message: "The provided ID doesn't match any documnets",
					},
				});
			}
		})
		//Catch any errors that might occur
		.catch((error) => {
			res.status(500).json({ error: error });
		});
});

/**
 * Action:          DESTROY
 *  Method:         HTTP DELETE method
 * URI:            /api/articles/5d664b8b68b4bjdbjdbj
 * Description:    Delete an Article by Article ID
 */
router.delete("/api/articles/:id", (req, res) => {
	Article.findById(req.params.id)
		.then((article) => {
			if (article) {
				//Pass the result of Mongoose's .remove method to the next promise on the '.then' chain
				return article.remove();
			} else {
				//If we couldn't find a document with the matching ID
				res.status(404).json({
					error: {
						name: "DocumentNotFoundError",
						message: "The provided ID doesn't match any documnets",
					},
				});
			}
		})
		.then(() => {
			//If the deletion succeeded, return 204 and no JSON
			res.status(204).end();
		})
		// catch any errors that might occur
		.catch((error) => {
			res.status(500).json({ error: error });
		});
});

/**
 * Action:          UPDATE
 *  Method:         PATCH/PUT
 * URI:            /api/articles/5d664b8b68b4bjdbjdbj
 * Description:    Update an Article by Article ID
 */

/**
 * Action:          CREATE
 *  Method:         POST
 * URI:            /api/articles
 * Description:    Create a new Article
 */
router.post("/api/articles", (req, res) => {
	Article.create(req.body.article)
		// On a successful `creat` action. respond with 201
		//HTTP status and the content of the new Article
		.then((newArticle) => {
			res.status(201).json({ article: newArticle });
		})
		// catch any errors that might occur
		.catch((error) => {
			res.status(500).json({ error: error });
		});
});

//Export the Router so we can use it in the server.js file
module.exports = router;
