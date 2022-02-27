var express = require("express");
var userRouter = express.Router();
var db = require('../db');

userRouter.get("/", function (req, res) {
  res.render("user")
})

module.exports = userRouter;