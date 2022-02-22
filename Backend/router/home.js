let express = require('express');
let homeRouter = express.Router();
let conn = require('./db');


homeRouter.get('/rankList', function(req,res){
    // res.send('hehe');
    let rankList =[];
    
})
homeRouter.get('/rankList/:page([0-9]+)', function(req, res){
    var page = req.params.page

    //page <= 跑到/1
    if( page <= 0){
        res.redirect('/1');
        return;
    }

    var rowsPerPage = 4; //每頁4筆
    var rowsStart = (page-1)*rowsPerPage;
    conn.query(`SELECT * FROM inventory LIMIT`) 

})

module.exports = homeRouter;