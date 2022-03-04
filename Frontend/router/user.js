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
  console.log('------------');
  console.log(req.sessionID);
  console.log(req.session); 
  db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if (error) {
      console.log(error);
    } else {
      res.render("user", {
        // 會員帳號
        userAcount: rows,
        // 會員姓名
        userName: rows,
        // 信箱
        userEmail: rows,
        // 電話
        userPhone: rows,
        // 生日
        userBirthday: rows
      });
    };
  })
})

 userRouter.post('/changeUserInfoContainer', function (req, res){
  //  console.log(req.body.userPhone);
  db.query(`UPDATE member SET userName="${req.body.userName}", userPhone="${req.body.userPhone}" WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if(error){
      throw error;
    }else{
      db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
        if (error) {
          throw error;
        } else {
          res.render("user", {
            // 會員帳號
            userAcount: rows,
            // 會員姓名
            userName: rows,
            // 信箱
            userEmail: rows,
            // 電話
            userPhone: rows,
            // 生日
            userBirthday: rows
          });
        };
      })
    };
  });
 });
module.exports = userRouter;