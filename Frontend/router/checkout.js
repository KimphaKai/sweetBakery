var express = require("express");
var checkoutRouter = express.Router();
var db = require("../db");

checkoutRouter.get('/', function (req, res) {
  res.render('checkout')
})

module.exports = checkoutRouter;