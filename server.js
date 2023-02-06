//Require necessary NPM Packages
const express = require("express");
const mongoose = require("mongoose");

//Require DB Configuration File
const db = require("./config/db");

//Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

//Require Route Files
const indexRouter = require("./routes/index");
const articlesRouter = require("./routes/articles");

//Instantiate Express Application Object
const app = express();

//Define PORT for the API to run on
const port = process.env.PORT || 5000;

/**Middleware
 *
 * Add `bodyParser` middleware which will parse JSON
 * requests into Javascript Objects before they reach
 * the route files
 *
 * The method '.use' sets up middleware for Express apps
 */
app.use(express.json());

/**ROUTES
 *
 *Mount imported Routers
 */

app.use(indexRouter);
app.use(articlesRouter);

//Start the server and listen and listen for requests on the given port
app.listen(port, () => console.log(`blogy listening on ${port}`));
