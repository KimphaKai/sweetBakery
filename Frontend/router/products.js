var express = require("express");
var productsRouter = express.Router();
var db = require('../db');

productsRouter.get("/", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  db.queryAsync("SELECT c.categoryId, p.productId,p.productTitle, p.productPrice, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' LIMIT 0,6")
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCount => { // 接SELECT * FROM productCategory資料
      productCategory = productCount;
      return db.queryAsync('SELECT * FROM productimg');
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory`);
    })
    .then(id => {
      categoryId = id
      res.render("products", {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: "所有商品"
      })
      // console.log(categoryId)

    })
    .catch(err => {
      console.log(err)
    })

})

productsRouter.get("/:categories", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  // console.log(req.params.categories);
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice, c.categoryName, size.sizeName FROM product p JOIN productSize size ON(size.sizeId = p.sizeId) JOIN productcategory c ON(c.categoryId = p.categoryId) WHERE c.categoryId = '${req.params.categories}' AND p.productStatus ='上架中' `)
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCat => {
      productCategory = productCat;
      return db.queryAsync(`SELECT img.* FROM productimg img JOIN product p ON(img.productId = p.productId) JOIN productcategory c ON(p.categoryId = c.categoryId) WHERE c.categoryId = '${req.params.categories}'`);
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory WHERE categoryId = '${req.params.categories}'`);
    })
    .then(id => {
      categoryId = id
      res.render("products", {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: categoryId
      })
      // console.log(categoryId)
      // console.log(productInformation);

    })
    .catch(err => {
      console.log(err)
    })

})

productsRouter.get("/productInfo/:id", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productId = '${req.params.id}' AND p.productStatus ='上架中' `)
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCount => {
      productCategory = productCount;
      return db.queryAsync(`SELECT * FROM productimg img WHERE img.productId = '${req.params.id}'`);
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory`);
    })
    .then(id => {
      categoryId = id
      res.json({
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: categoryId
      })

    })
    .catch(err => {
      console.log(err)
    })
})

productsRouter.get("/productInfo/:categories/:id", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productId = ${req.params.id} AND c.categoryId = ${req.params.categories} `)
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCount => {
      productCategory = productCount;
      return db.queryAsync(`SELECT * FROM productimg img WHERE img.productId = '${req.params.id}'`);
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory`);
    })
    .then(id => {
      categoryId = id
      res.json({
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: categoryId
      })

    })
    .catch(err => {
      console.log(err)
    })
})

productsRouter.get("/sortASC", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  let priceSort = {};
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' ORDER BY p.productPrice ASC`)
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCat => {
      productCategory = productCat;
      return db.queryAsync(`SELECT img.* FROM productimg img JOIN product p ON(img.productId = p.productId) JOIN productcategory c ON(p.categoryId = c.categoryId)`);
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory`);
    })
    .then(id => {
      categoryId = id
      return db.queryAsync(`SELECT * FROM product ORDER BY productPrice ASC`)
    })
    .then(productPrice => {
      priceSort = productPrice
      res.render("products", {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        priceSort: priceSort,
        categoryId: "所有商品"
      })
    })
    .catch(err => {
      console.log(err)
    })
})

productsRouter.get("/sortASC", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  let priceSort = {};
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' ORDER BY p.productPrice ASC`)
    .then(category => {
      productInformation = category;
      return db.queryAsync('SELECT * FROM productCategory');
    })
    .then(productCat => {
      productCategory = productCat;
      return db.queryAsync(`SELECT img.* FROM productimg img JOIN product p ON(img.productId = p.productId) JOIN productcategory c ON(p.categoryId = c.categoryId)`);
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory`);
    })
    .then(id => {
      categoryId = id
      return db.queryAsync(`SELECT * FROM product ORDER BY productPrice DESC`)
    })
    .then(productPrice => {
      priceSort = productPrice
      res.render("products", {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        priceSort: priceSort,
        categoryId: "所有商品"
      })
    })
    .catch(err => {
      console.log(err)
    })
})

module.exports = productsRouter;