//Require necessary NPM Packages
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors"); //require as dependancy
//Require our Auth Related packages
const bcrypt = require("bcrypt");
const passport = require("passport");
const jwt = require("jsonwebtoken");

//Require DB Configuration File
const db = require("./config/db");

//Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

//Require Passport Strategy and Options
const strategy = require("./lib/passportStrategy");
const jwtOptions = require("./lib/passportOptions");

const saltRounds = 10;

//Require Route Files
const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");

//Instantiate Express Application Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5000;
const reactPort = 3000;

/**Middleware - order matters...
 *
 * Add `bodyParser` middleware which will parse JSON
 * requests into Javascript Objects before they reach
 * the route files
 *
 * The method '.use' sets up middleware for Express apps
 */
app.use(express.json());

//Set CORS headers on response from this API using the 'cors' NPM package
app.use(
	cors({ origin: process.env.CLIENT_ORIGIN || `http://localhost:${reactPort}` })
);

//Define our suth strategy from before
passport.use(strategy);

/**ROUTES
 *
 *Mount imported Routers
 */

app.use(indexRouter);
app.use(articlesRouter);

//temp test route
app.get("/test", (req, res) => {
	bcrypt.hash("1234", saltRounds, (error, hash) => {
		res.status(200).json({ password: hash });
	});
});

//Make a dummy User for testing
//Use a database for real use case
const dummyUser = {
	id: 42,
	username: "Selina",
	password: "1234",
};

// Login Route
app.post("/api/login", (req, res) => {
	//verify that they are supplying username and password
	if (req.body.username && req.body.password) {
		//This should be a Database call...
		//
		//Example: User.find({username: req.body.username})
		if (
			req.body.username === dummyUser.username &&
			req.body.password === dummyUser.password
		) {
			//Select the information we want to send to the user
			const payload = {
				//try to keep as bare minimum as poss
				id: dummyUser.id,
			};

			//Build a JSON Web Token using the paylosd
			const token = jwt.sign(payload, jwtOptions.secretOrKey, {
				expiresIn: 600,
			}); // token expires in 10 minutes

			//Send the jsoin web token back to the user
			res.status(200).json({ success: true, token: token });
		} else {
			res.status(401).json({ error: "Invalid username or password" });
		}
	} else {
		res.status(400).json({ error: "Username & Password Required" });
	}
});

//dummy path to protect site form invalid
app.get(
	"/api/protected",
	passport.authenticate("jwt", { session: false }),
	(req, res) => {
		res.status(200).json({
			message: "Hey, you can see this message with the JSon Web Token.",
			user: req.user,
		});
	}
);

//Start the server and listen and listen for requests on the given port
app.listen(port, () => console.log(`blogy listening on ${port}`));
