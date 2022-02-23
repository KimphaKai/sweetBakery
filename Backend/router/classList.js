let express = require('express');
let classListRouter = express.Router();
let path = require('path');
let conn = require('./db');



classListRouter.get('/', function(req, res){
    conn.query("select * from classlist",[],
        function(err, rows){
            res.send(JSON.stringify(rows));
        }    
    )
})

module.exports = classListRouter;