let express = require("express");
let app = express();
app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');

app.get("/home", function (req, res) {
  res.render("index.ejs", { test: "test" })
})

app.get("/about", function (req, res) {
  res.render("about.ejs")
})

app.get("/checkout", function (req, res) {
  res.render("checkout.ejs")
})

app.get("/cart", function (req, res) {
  res.render("cart.ejs")
})

app.get("/classDetail", function (req, res) {
  res.render("classDetail.ejs")
})

app.get("/classes", function (req, res) {
  res.render("classes.ejs")
})

app.get("/classForm", function (req, res) {
  res.render("classForm.ejs")
})

app.get("/passwordUpdate", function (req, res) {
  res.render("passwordUpdate.ejs")
})

app.get("/productDetail", function (req, res) {
  res.render("productDetail.ejs")
})

app.get("/products", function (req, res) {
  res.render("products.ejs")
})

app.get("/registered", function (req, res) {
  res.render("registered.ejs")
})

app.get("/user", function (req, res) {
  res.render("user.ejs")
})

app.get("/orderHistory", function (req, res) {
  res.render("orderHistory.ejs")
})

app.get("/orders", function (req, res) {
  res.render("orders.ejs")
})