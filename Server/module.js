var mysql = require('mysql');
var fs = require('fs');
var con;

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

// Creating new user entry
exports.createUser = function(res, signupbody)
{
    var new_username = signupbody.username;
    var new_password = signupbody.password;

    con = this.connectToDB();

    con.connect(function(err)
    {
        if (err) throw err;

        var sql_query = `INSERT INTO users (username, password) values ("${new_username}", "${new_password}");`;

        con.query(sql_query, function(err, result) 
        {
            if (err) 
            {
                // User already exists
                if (err.code === 'ER_DUP_ENTRY') 
                {
                    console.log('Duplicate entry error: Username already exists.');
                    var alertScript = `<script>alert("Your account already exists"); window.location.href = "/signup_redirect.html";</script>`;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(alertScript);
                } 
            } else {
                // User inserted successfully
                console.log('User created:', new_username);
                var alertScript = `<script>alert("Your account has been created, please login"); </script>`;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(alertScript);
                fs.readFile("../login.html", function (err, data) {
                    if (err) {
                        console.error('Error reading login.html:', err);
                        return res.status(500).send('Error reading login.html');
                    }
                    res.write(data);
                    return res.end();
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
        if (err) {
            console.error('Error reading userrecipes.html:', err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('Internal Server Error');
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

// Navigate user to all recipes page
exports.navigateToRecipes = function(res)
{
    fs.readFile("../recipesgrid.html", function (err, data)
    {        
        if (err) {
            console.error('Error reading userrecipes.html:', err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('Internal Server Error');
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

// Navigate user to create page
exports.navigateToCreate = function(res)
{
    // have to pass id so it can enter it to the recipe object
    fs.readFile("../create.html", function (err, data)
    {        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}

// Insert recipe into database
exports.createRecipe = function(res, formData, s)
{
    // User details
    var username = s.username;

    // Recipe details
    var name = formData.name;
    var prep_time = formData.prep_time;
    var serving_size = formData.serving_size;
    var dish_type = formData.dish_type;
    var cuisine = formData.cuisine;
    var ingredients = formData.ingredients;
    var instructions = formData.instructions;
    var image_src = formData.image_src;
    var short_description = formData.short_description;

    con = this.connectToDB();

    con.connect(function(err)
    {
        if (err) throw err;

        var sql_query = `INSERT INTO recipes (name, username, prep_time, serving_size, dish_type, cuisine, ingredients, instructions, description, image_src, short_description) VALUES ("${name}", "${username}", "${prep_time}", "${serving_size}", "${dish_type}", "${cuisine}", "${ingredients}", "${instructions}", "${dish_type}", "${image_src}", "${short_description}")`
        // Update json over here using fs
        con.query(sql_query, function(err, result) 
        {
            if (err) 
            {  
                throw err;
            } 
            else
            {
                // Recipe inserted successfully
                console.log('Recipe created:', name);
                var alertScript = `<script>alert("Your recipe has been created");</script>`;
                res.writeHead(200, { 'Content-Type': 'text/html' });
                res.write(alertScript);
                // Navigate to recipesgrid.html
                return res.end();
            }
        });
    });
}

// Navigate to user recipes
exports.navigateToUserRecipes = function(res)
{
    // have to pass id or username and only display the user's recipes
    fs.readFile("../userrecipes.html", function (err, data)
    {        
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}