var express = require("express");
var ordersRouter = express.Router();
var db = require('../db');

ordersRouter.get("/", function (req, res) {
  res.render("orders")
})

module.exports = ordersRouter;