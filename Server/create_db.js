var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "admin"
    }
);

con.connect(function (err) 
{
    if (err) throw err;
    console.log("Connected!");
    
    var sql_query = "CREATE DATABASE 128Recipes";
    
    con.query(sql_query, function (err, result) 
    {
        if (err) throw err;
        console.log("128Recipes Database Created!");
    });
});