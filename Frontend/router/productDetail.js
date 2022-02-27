var express = require("express");
var productDetailRouter = express.Router();
var db = require("../db");

productDetailRouter.get("/", function (req, res) {
  res.render("productDetail");
})

module.exports = productDetailRouter;