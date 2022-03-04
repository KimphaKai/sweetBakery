var express = require("express");
var homeRouter = express.Router();
var db = require('../db');

homeRouter.get("/", function (req, res) {
  res.render('index')
});

module.exports = homeRouter;