var express = require("express");
var loginRouter = express.Router();
var db = require("../db");

var bodyparser = require('body-parser');

var databaseUserInformation = []; //資料庫資料
var compareEmail = 0; // 比對email狀態 1 = true

loginRouter.use(bodyparser.json()); // 使用bodyparder中介軟體，
loginRouter.use(bodyparser.urlencoded({ extended: true }));


//會員註冊
loginRouter.post('/memberRegister', function (req, res) {
    compareEmail = 0; //初始
    db.query(`SELECT * FROM member`, function (err, rows) {  //抓資料
        rows.forEach(item => {
            if (item.email == req.body.memberRegisterEmail) {
                //帳號已存在
                compareEmail = 1; //存在
            }
        })
        //將資料存入資料庫
        if (compareEmail == 0) {
            //可以註冊帳號
            db.query(`INSERT INTO member (memberId, email, userPassword, userName,  userPhone, userBirthday, fb, google) VALUES ('${req.sessionID}', '${req.body.memberRegisterEmail}','${req.body.memberRegisterPassword}', '${req.body.memberRegisterName}','${req.body.memberRegisterPhone}','${req.body.memberRegisterBirthday}','','')`, (error, rows) => {
                if (error) {
                    console.log(error);
                }
                //如何alert 帳號註冊成功
                //
                //
                console.log('帳號註冊成功');
            })
        } else {
            //如何alert 出畫面顯示已存在
            //
            //
            console.log('帳號已存在');
        };
        res.redirect('/'); //跳轉頁面
    });
})

//會員登入
loginRouter.post('/memberLogin', function (req, res) {
    if (req.session.username) {  //判斷session暫存資料有無
        db.query(`SELECT * FROM member WHERE memberId = "${req.session.username}"`, function (error, rows) {
            res.render('user', {
                userAcount: rows,
                userName: rows,
                userEmail: rows,
                userPhone: rows,
                userBirthday: rows
            });
        });
    } else {
        db.query(`SELECT * FROM member`, function (err, rows) {  //抓資料
            rows.forEach(item => {
                if (req.body.memberLoginEmail == item.email && req.body.memberLoginPassword == item.userPassword) {
                    req.session.username = req.body.memberLoginEmail;   //取得前端資料，並寫入至後端session暫存
                    req.session.password = req.body.memberLoginPassword;

                    res.render('user', {
                        userAcount: item,
                        userName: item,
                        userEmail: item,
                        userPhone: item,
                        userBirthday: item
                    });

                    console.log('登入成功');
                    console.log(req.session.username);
                }
            })
        });
    }
})


//忘記密碼
loginRouter.post('/memberForgetPassword'), function (req, res) {
    console.log(req.session['username']);
    db.query(`SELECT * FROM member`, function (err, rows) {
        rows.forEach(item => {
            if (req.body.memberForgetEmail == item.useremail) {
                let forgetuserpassword = item.userpassword;
                res.render('/login', userpassword = forgetuserpassword);
            }
        });
    });
}

// 獲取主頁
loginRouter.get('/', function (req, res) {

    if (req.session.username) { //判斷session 狀態，如果有效，則返回主頁，否則轉到登入頁面
        res.render('user', { username: req.session.username });
    } else {
        res.redirect('/');
    }
})
// 退出
loginRouter.get('/logout', function (req, res) {
    req.session.memberLoginEmail = null; // 刪除session
    res.redirect('login');
});


module.exports = loginRouter;