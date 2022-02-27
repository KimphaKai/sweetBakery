var express = require("express");
var productsRouter = express.Router();
var db = require('../db');

productsRouter.get("/", function (req, res) {
  res.render("products")
})

module.exports = productsRouter;