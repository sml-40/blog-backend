const express = require("express");
const mongoose = require("mongoose");

//Require DB Configuration File
const db = require("./config/db");

//Establish Database Connection
mongoose.connect(db, { useNewUrlParser: true });
mongoose.connection.once("open", () => console.log("Connected to MongoDB"));

const indexRouter = require("./routes/index");

const app = express();

const port = process.env.PORT || 5000;

/**ROUTES
 *
 */
app.use(indexRouter);

//Start the server and listen
app.listen(port, () => console.log(`blogy listening on ${port}`));
