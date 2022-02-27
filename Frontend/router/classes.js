var express = require("express");
var classesRouter = express.Router();
var db = require("../db");

classesRouter.get("/", function (req, res) {
  res.render("classes");
})

module.exports = classesRouter;