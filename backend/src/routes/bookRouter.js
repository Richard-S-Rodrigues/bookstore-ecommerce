const express = require("express");
const routes = express.Router();

const {
    find,
    findOne,
    create,
    remove,
    update,
} = require("../controllers/bookController");

routes.get("/", find);
routes.get("/:id", findOne);
routes.post("/", create);
routes.delete("/:id", remove);
routes.patch("/:id", update);

module.exports = routes;
