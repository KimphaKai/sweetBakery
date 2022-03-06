var express = require("express");
var userRouter = express.Router();
var db = require('../db');

var bodyparser = require('body-parser');

userRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
userRouter.use(bodyparser.urlencoded({ extended: true }));


userRouter.get("/", function (req, res) {
  console.log(req.session.username);
  if (req.session.username) { //如果是登入的狀態的話
    db.query(`SELECT * FROM member WHERE email = "${req.session.username}"`, function (error, rows) {
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
  } else {
    res.redirect('/');
  }
})

userRouter.post('/changeUserInfoContainer', function (req, res) {
  //  console.log(req.body.userPhone);
  db.query(`UPDATE member SET userName="${req.body.userName}", userPhone="${req.body.userPhone}" WHERE memberId = "${req.session.username}"`, function (error, rows) {
    if (error) {
      throw error;
    } else {
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

userRouter.post('/passwordUpdate', function (req, res) {
  console.log(req.session.username);
  if (req.session.username) {
    db.query(`SELECT * FROM member WHERE email = "${req.session.username}"`, function (error, rows) {
      let currentusername = rows[0].email;
      let changePassword = req.body.newPassword;
      db.query(`UPDATE member SET userPassword="${changePassword}" WHERE email = "${currentusername}"`, function (error, rows) {
        if(error){
          console.log(error);
        }else{
          console.log(rows);
          res.render('user', {
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
          })
        }
      })
    })
  }else{

  }
})




module.exports = userRouter;