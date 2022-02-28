var express = require("express");
var cartRouter = express.Router();
var db = require('../db');

cartRouter.get("/", function (req, res) {
  let productInformation = {};
  let productPic = {};

  db.queryAsync('SELECT c.*, p.*,s.sizeName,(p.productPrice*c.productNum) AS subTotal FROM cartlist c JOIN product p ON(c.productId=p.productId) JOIN productsize s ON(p.sizeId=s.sizeId)')
    .then(category =>{
      productInformation = category;
      return db.queryAsync('SELECT * FROM productimg');
    }).then(productImage=>{
      productPic = productImage
      res.render("cart",{
        productInformation: productInformation,
        productPic: productPic
      })
      console.log(productPic);
    })
    .catch(err=>{
      console.log(err)
    })
})

module.exports = cartRouter;