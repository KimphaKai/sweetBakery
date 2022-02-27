var mysql = require("mysql");
var conn = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'root',
  port: 3306,
  database: 'sweetBakery'
})

conn.connect(function (error) {
  if (error) throw error;
  console.log("connected to database!")

})

module.exports = conn;
