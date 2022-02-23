let mysql= require('mysql');
let bluebird= require('bluebird');
let conn=mysql.createConnection({
    host:'localhost',
    user:'root',
    password:'root',
    port:3306,
    database:'sweetBakery'
});
conn.connect(function(error){
    if(error){
        console.log(error);
    }else{
        console.log('database is working');
    }
});
bluebird.promisifyAll(conn);
module.exports = conn;