var express = require("express");
var passwordUpdateRouter = express.Router();
var db = require("../db");

passwordUpdateRouter.get("/", function (req, res) {
  res.render("passwordUpdate");
})

module.exports = passwordUpdateRouter;