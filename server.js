const express = require("express");
const mongoose = require("mongoose");

const indexRouter = require("./routes/index");

const app = express();

const port = process.env.PORT || 5000;

/**ROUTES
 *
 */
app.use(indexRouter);

//Start the server and listen
app.listen(port, () => console.log(`blogy listening on ${port}`));
