var express = require("express");
var productsRouter = express.Router();
var db = require('../db');

productsRouter.get("/", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  // res.render('products');
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
      res.render('products', {
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


});


productsRouter.get("/:categories", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};

  db.queryAsync(`SELECT c.categoryId, p.productId,p.productTitle, p.productPrice, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' and p.categoryId= "${req.params.categories}"`)
    .then(category => {
      productInformation = category;
      return db.queryAsync(`SELECT * FROM productCategory `);
    })
    .then(productCount => { // 接SELECT * FROM productCategory資料
      productCategory = productCount;
      return db.queryAsync('SELECT * FROM productimg');
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory where categoryId= "${req.params.categories}"`);
    })
    .then(id => {
      categoryId = id
      res.render('products', {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: categoryId
      })
      // console.log(categoryId)

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
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice,p.categoryId, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productId = '${req.params.id}' AND p.productStatus ='上架中' `)
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
// 商品對話視窗
productsRouter.get("/productInfo/:categories/:id", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  db.queryAsync(`SELECT p.productId, p.productTitle, p.productPrice,p.categoryId, p.productInfo, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productId = ${req.params.id} AND c.categoryId = ${req.params.categories} `)
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

productsRouter.get("/sortProduct/:categoryId", function (req, res) {
  let productInformation = {};
  let productCategory = {};
  let productPic = {};
  let categoryId = {};
  let priceSort = {};
  let order = '';
  // console.log(req.query);
  let condition = '';
  let paramsCategoryId = req.params.categoryId;
  if (paramsCategoryId == "0") {
    condition = ` `;
  } else {
    condition = `and p.categoryId ="${paramsCategoryId}"`
  }
  // console.log(req.pa)
  // res.send({message:'123'})
  // res.json({message:req.params.sortVal})
  if (req.query.sortVal == 0) {
    order = "";
  } else {
    order = ` order by p.productPrice ${req.query.sortVal}`

  }
  db.queryAsync(`SELECT c.categoryId, p.productId,p.productTitle, p.productPrice, c.categoryName, size.sizeName FROM product p JOIN productcategory c ON(c.categoryId = p.categoryId) JOIN productsize size ON(size.sizeId = p.sizeId) WHERE p.productStatus ='上架中' ${condition} ${order}`)
    .then(category => {
      productInformation = category;
      return db.queryAsync(`SELECT * FROM productCategory `);
    })
    .then(productCount => { // 接SELECT * FROM productCategory資料
      productCategory = productCount;
      return db.queryAsync('SELECT * FROM productimg');
    })
    .then(productImage => {
      productPic = productImage
      return db.queryAsync(`SELECT * FROM productcategory where categoryId="${paramsCategoryId}"`);
    })
    .then(id => {
      if (paramsCategoryId == "0") {

        categoryId = '所有商品';
      } else {
        categoryId = id;
      }
      res.render('products', {
        productInformation: productInformation,
        productCategory: productCategory,
        productPic: productPic,
        categoryId: categoryId
      })
      // console.log(categoryId)

    })
    .catch(err => {
      console.log(err)
    })
  // res.send('ok')

})

//點選購物車按鈕
productsRouter.post('/cartClick', function (req, res) {
  res.json({
    username : req.session.username
  })
})


module.exports = productsRouter;