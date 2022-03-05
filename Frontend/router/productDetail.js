var express = require("express");
var productDetailRouter = express.Router();
var db = require("../db");

productDetailRouter.get("/", function (req, res) {
  let productInformation = {};
  let productName = $('').val();
  // console.log(productName)
  db.queryAsync(`SELECT productInfo FROM product WHERE productTitle ="test2"`, function(error,rows){
    res.render("productDetail",{
      productInformation : rows[0]
    })
  })
    .then(category => {
      productInformation = category;
      res.render("productDetail", {
        productInformation: productInformation
      })
      console.log(productInformation);
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = productDetailRouter;