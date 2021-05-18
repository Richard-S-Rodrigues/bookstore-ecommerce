const express = require("express");
const routes = express.Router();

const {
    find,
    findOne,
    create,
    remove,
    update,
} = require("../controllers/bookController");

const auth = require("../middlewares/auth");

routes.get("/", find);
routes.get("/:id", findOne);
routes.post("/", auth, create);
routes.delete("/:id", auth, remove);
routes.patch("/:id", auth, update);

module.exports = routes;
