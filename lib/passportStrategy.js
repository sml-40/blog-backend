//Passport Package
const passportJWT = require("passport-jwt");

//Passport Options
const jwtOptions = require("./passportOptions");

//JSON Web Token Strategy object that we will be using
const JwtStrategy = passportJWT.Strategy;

//Make a dummy User for testing
//Use a database for real use case
const dummyUser = {
	id: 42,
	username: "Selina",
	password: "1234",
};

//set upa funtion where we are going to see if the wequesting user
//has a valid jwt or not. And to see if the token is expired.

//new instance
const strategy = new JwtStrategy(jwtOptions, (jwtPayload, next) => {
	console.log("Payload Recieved!");
	console.log("User ID:", jwtPayload.id);
	console.log("Token Expires On:", jwtPayload.exp);

	//Example real life db call:
	//User.findById(jwtPayLoad.id)
	if (dummyUser.id === jwtPayload.id) {
		//If ID is in the database, then lets run our original route
		next(null, dummyUser);
	} else {
		//If ID does not match, then skip our target route and return a 401
		next(null, false);
	}
});

module.exports = strategy;
