var mysql = require('mysql');
var fs = require('fs');
var con;

// Step 
// Authenticateuser -> connectToDb -> return con -> preAuthentication if user in database 

// Connecting to database
exports.connectToDB = function()
{
    var con = mysql.createConnection(
        {
            host: "localhost",
            user: "root",
            password: "admin",
            database: "128Recipes"
        }
    );
    return con;
}

// Creating session
exports.preAuthentication = function(res, mySess, userId, body)
{
    if (userId != -1 && userId != "" && userId !== undefined)
    {
        mySess.setMySession(body.username);
        mySess.setUserIdSession(userId);
        s = mySess.getMySession();
        if (s.username != "" && s.username !== undefined) 
        {
            // Redirect to the Home page.
            fs.readFile("../index.html", function (err, data) 
            {
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(data);
                return res.end();
            });
        }
    }
}

// Login the user in the web application.
exports.login = function (res) 
{
   // to display error message if there is any.
    fs.readFile("../login.html", function (err, data) 
    {
        if (err) 
        {
            res.writeHead(404, { 'Content-Type': 'text/html' });
            return res.end("404 Not Found");
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// Logout the user from the web application.
exports.logout = function (res) 
{
    fs.readFile("../login.html", function (err, data) 
    {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        con.destroy();
        return res.end();
    });
};

// Navigates the user to the Home page.
exports.navigateToHome = function (res) {
    fs.readFile("../index.html", function (err, data) {
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
};

// Authenticating user credentials
exports.authenticateUser = function(res, body, mySess, myCallback) {
    var username = body.username;
    var password = body.password;

    con = this.connectToDB();

    con.connect(function(err) 
    {
        if (err) throw err;

        var sql_query = `SELECT * FROM users WHERE username = '${username}' AND password = '${password}';`;

        con.query(sql_query, function(err, result)
        {
            if (err) throw err;

            // User found in database
            if (result !== undefined && result.length > 0)
            {
                myCallback(res, mySess, result[0].id, body);
            }
            else 
            {
                var message = `<script>
                alert("You have entered an incorrect username or password");
                </script>`
                fs.readFile("login.html", function(err,data)
                {
                    res.writeHead(200, {'Content-Type': 'text/html'});
                    res.write(data);
                    return res.end(message);
                });
            }
        });
    });
}

exports.getUser = function(res, mySess, myCallback)
{
    var sql_query = `SELECT * FROM users WHERE id = '${mySess.userId}';`;

    con.query(sql_query, function(err, result)
    {
        if (err) throw err;
        if (result !== undefined && result.length > 0)
        {
            myCallback(res, result);
        }
    });
}

// Navigate user to home page
exports.navigateToHome = function(res)
{
    fs.readFile("../index.html", function (err, data)
    {        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

// Navigate user to all recipes page
exports.navigateToRecipes = function(res)
{

}

// Navigate user to create page
exports.navigateToCreate = function(res)
{

}

// Navigate to user recipes
exports.navigateToUserRecipes = function(res)
{

}