var express = require("express");
var cartRouter = express.Router();
var db = require('../db');

cartRouter.get("/", function (req, res) {
  res.render("cart")
})

module.exports = cartRouter;