var express = require("express");
var userRouter = express.Router();
var db = require('../db');


var session = require('express-session');
var bodyparser = require('body-parser');

var databaseUserInformation = []; //資料庫資料
var compareEmail = 0; // 比對email狀態 1 = true
var userCorrent;

userRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
userRouter.use(bodyparser.urlencoded({ extended: true }));


userRouter.get("/", function (req, res) {

  // db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
  //   if (error) {
  //     console.log(error);
  //   } else {
  //     if (item.email == req.session.username) {
  //       res.render("user", {
  //         // 會員帳號
  //         userAcount: item.email,
  //         // 會員姓名
  //         userName: item.userName,
  //         // 信箱
  //         userEmail: item.email,
  //         // 電話
  //         userPhone: item.userPhone,
  //         // 生日
  //         userBirthday: item.userBirthday
  //       });
  //     };
  //   }
  // })
})

// userRouter.post('/changeUserInfoContainer', function (req, res) {
//   // 姓名 req.body.userName
//   // 電話 req.body.userPhone

//   res.render('/user');
// })
module.exports = userRouter;