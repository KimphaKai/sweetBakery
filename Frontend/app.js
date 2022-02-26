var express = require("express");
var app = express();
var conn = require('./db');
var homeRouter = require('./router/home');
var checkoutRouter = require('./router/checkout');
var cartRouter = require('./router/cart');
var classDetailRouter = require('./router/classDetail');
var classesRouter = require('./router/classes');
var classFormRouter = require('./router/classForm');
var passwordUpdateRouter = require('./router/passwordUpdate');
var productDetailRouter = require('./router/productDetail');
var productsRouter = require('./router/products');
var registeredRouter = require('./router/registered');
const userRouter = require("./router/user");
const orderHistoryRouter = require("./router/orderHistory");
const ordersRouter = require("./router/orders");
app.listen(3000);

app.use(express.static("public"));
app.use(express.urlencoded({ extended: true }));
app.set('view engine', 'ejs');
app.use('/', homeRouter);
app.use('/checkout', checkoutRouter);
app.use('/cart', cartRouter);
app.use('/classDetail', classDetailRouter);
app.use('/classes', classesRouter);
app.use('/classForm', classFormRouter);
app.use('/passwordUpdate', passwordUpdateRouter);
app.use('/productDetail', productDetailRouter);
app.use('/products', productsRouter);
app.use('/registered', registeredRouter);
app.use('/user', userRouter);
app.use('/orderHistory', orderHistoryRouter);
app.use('/orders', ordersRouter);


app.get("/about", function (req, res) {
  res.render("about")
})