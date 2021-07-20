const express = require("express");
const multer = require("multer");
const multerConfig = require("../multerConfig");
const routes = express();

const uploadFileController = require("../controllers/uploadFileController");

routes.post("/image", multer(multerConfig).single("file"), uploadFileController);

module.exports = routes;