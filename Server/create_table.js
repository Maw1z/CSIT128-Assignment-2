var mysql = require('mysql');

var con = mysql.createConnection(
    {
        host: "localhost",
        user: "root",
        password: "admin",
        database: "128Recipes"
    }
);

con.connect(function(err)
{
    if (err) throw err;

    var sql_query = 'CREATE TABLE recipes (name VARCHAR(100) NOT NULL, username VARCHAR(50) NOT NULL, prep_time VARCHAR(20) NOT NULL, serving_size VARCHAR(20) NOT NULL, dish_type VARCHAR(50) NOT NULL, cuisine VARCHAR(50) NOT NULL, ingredients TEXT NOT NULL, instructions TEXT NOT NULL, description TEXT NOT NULL, image_src VARCHAR(255) NOT NULL, short_description VARCHAR(255) NOT NULL);';

    con.query(sql_query, function(err, result)
    {
        if (err) throw err;
        console.log("Recipes table created!");
    });

    var sql_query2 = 'CREATE TABLE users (id INT AUTO_INCREMENT PRIMARY KEY,  username varchar(50) UNIQUE, password varchar(100));';

    con.query(sql_query2, function(err, result)
    {
        if (err) throw err;
        console.log("Users table created!");
    });    
})