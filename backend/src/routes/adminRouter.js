const express = require("express");
const routes = express.Router();

const { 
	getAllUsers: getUsers, 
	remove: removeUser, 
	update: updateUser 
} = require("../controllers/userController");

const { 
	create: createBook,
	remove: removeBook, 
	update: updateBook 
} = require("../controllers/bookController");

routes.get('/getUsers', getUsers)
routes.get('/updateUser/:id', updateUser)
routes.delete("/removeUser/:id", removeUser)

routes.post("/createBook", createBook);
routes.delete("/removeBook/:id", removeBook);
routes.put("/updateBook/:id", updateBook);

module.exports = routes