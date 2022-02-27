var express = require("express");
var homeRouter = express.Router();
var db = require('../db');

homeRouter.get("/", function (req, res) {
  var sql = 'SELECT * FROM product';
  db.query(sql, function (error, data) {
    if (error) throw error;
    res.render('index', {
      productTitle: "title",
      data: data
    });
    console.log(data)
  });
});

module.exports = homeRouter;