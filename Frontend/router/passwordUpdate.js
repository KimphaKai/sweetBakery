var express = require("express");
var passwordUpdateRouter = express.Router();
var db = require("../db");

var session = require('express-session');
var bodyparser = require('body-parser');

var databaseUserInformation = []; //資料庫資料
var compareEmail = 0; // 比對email狀態 1 = true
var userCorrent;

passwordUpdateRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
passwordUpdateRouter.use(bodyparser.urlencoded({ extended: true }));

// 使用 session 中介軟體
passwordUpdateRouter.use(session({
  secret: 'secret', // 對session id 相關的cookie 進行簽名
  resave: true,
  saveUninitialized: false, // 是否儲存未初始化的會話
  cookie: {
    maxAge: 1000 * 60 * 3, // 設定 session 的有效時間，單位毫秒
  },
}));

passwordUpdateRouter.get("/", function (req, res) {
  res.render("passwordUpdate");
})


passwordUpdateRouter.post('/', function(req, res){
  res.redirect('user');
})
module.exports = passwordUpdateRouter;