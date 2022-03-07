var express = require("express");
var userRouter = express.Router();
var db = require('../db');

var bodyparser = require('body-parser');

userRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
userRouter.use(bodyparser.urlencoded({ extended: true }));


userRouter.get("/", function (req, res) {
  // console.log(req.session.username);
  // if (req.session.username) { //如果是登入的狀態的話
  db.query(`SELECT * FROM member WHERE email = "sweetbakery@gmail.com"`, function (error, rows) {
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
  // } else {
  //   res.redirect('/');
  // }
})

userRouter.post('/changeUserInfoContainer', function (req, res) {
  db.query(`UPDATE member SET userName="${req.body.userName}", userPhone="${req.body.userPhone}" WHERE memberId = "sweetbakery@gmail.com"`, function (error, rows) {
    if (error) {
      throw error;
    }
  });
  db.query(`SELECT * FROM member WHERE memberId = "sweetbakery@gmail.com"`, function (error, rows) {
    if (error) {
      throw error;
    } else {
      let user = rows[0];
      setTimeout(() => {
        res.render("user", {
          // 會員帳號
          userAcount: user,
          // 會員姓名
          userName: user,
          // 信箱
          userEmail: user,
          // 電話
          userPhone: user,
          // 生日
          userBirthday: user
        });
      }, 2000);
    };
  })


});

userRouter.post('/passwordUpdate', function (req, res) {
  db.query(`SELECT * FROM member WHERE email = "sweetbakery@gmail.com"`, function (error, rows) {
    db.query(`UPDATE member SET userPassword="${req.body.newPassword}" WHERE email = "sweetbakery@gmail.com"`, function (error, rows) {
      db.query(`SELECT * FROM member WHERE memberId = "sweetbakery@gmail.com"`, function (error, rows) {
        let user = rows[0];
        setTimeout(() => {
          // res.render('user', {
          //   // 會員帳號
          //   userAcount: user,
          //   // 會員姓名
          //   userName: user,
          //   // 信箱
          //   userEmail: user,
          //   // 電話
          //   userPhone: user,
          //   // 生日
          //   userBirthday: user
          // })
          res.render('index');
        }, 2000);
      })
    })
  })
})




module.exports = userRouter;