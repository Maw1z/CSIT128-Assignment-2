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
            myCallback(res, `result`);
        }
    });
}

exports.getUserForUserRecipes = function(res, mySess, myCallback)
{
    var sql_query = `SELECT * FROM users WHERE id = '${mySess.userId}';`;

    con.query(sql_query, function(err, result)
    {
        if (err) throw err;
        if (result !== undefined && result.length > 0)
        {
            myCallback(res, `result`, mySess);
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
exports.navigateToAllRecipes = function(res)
{
    con = exports.connectToDB();
    var recipeCardHTML = '';

    con.connect(function(err)
    {
        var sql_query = "SELECT * FROM recipes";
        con.query(sql_query, function(err, results) {
            if (err) throw err;

            var recipes = results.map(function(row) {
                return {
                    "name": row.name,
                    "username": row.username,
                    "prep_time": row.prep_time,
                    "serving_size": row.serving_size,
                    "dish_type": row.dish_type,
                    "cuisine": row.cuisine,
                    "ingredients": row.ingredients,
                    "instructions": row.instructions,
                    "description": row.description,
                    "image_src": row.image_src,
                    "short_description": row.short_description
                };
            });

            recipes.forEach(function(recipe) {
                recipeCardHTML += `
                <a href="RecipesHTML/${recipe.name}.html">
                    <div class="recipecard">
                        <div class="recipeimage">
                            <img src="http://localhost:3333/?jpg=/${recipe.image_src}">
                        </div>
                        <div class="recipedetails">
                            <div class="recipetype">
                                <div class="recipefilters">
                                    <div class="filter">
                                        ${recipe.cuisine}
                                    </div>
                                    <div class="filter">
                                        ${recipe.dish_type}
                                    </div>
                                </div>
                            </div>
                            <div class="recipeheading">
                                <h3>
                                    ${recipe.name}
                                </h3>
                                <p>
                                    ${recipe.short_description}
                                </p>
                            </div>
                        </div>
                    </div>
                </a>`;
            });

            // Reading and displaying HTML file
            fs.readFile("../recipesgrid.html", function (err, data)
            {        
                if (err) throw err;
                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                
                res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Importing Instrument Serif amd Josefin sans font -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
            <!-- Linking favicon -->
            <link rel="icon" type="image/x-icon" href="http://localhost:3333/?svg=\recipes-svgrepo-com.svg">
            <!-- Linking CSS styles files -->
            <link rel="stylesheet" href="http://localhost:3333/?css=styles.css">    <!--Main styles sheet-->
            <link rel="stylesheet" href="http://localhost:3333/?css=header.css">
            <link rel="stylesheet" href="http://localhost:3333/?css=recipes.css">
            <title>All Recipes</title>
        </head>
        <body>
            <header>
                <div id="header_leftside">
                    <div class="companyname firstline">
                        128
                        <img src="http://localhost:3333/?svg=\recipes-svgrepo-com.svg" alt="128 Recipes logo icon">
                    </div>
                    <div class="companyname">
                        Recipes
                    </div>
                </div>
                <div id="header_rightside">
                    <div class="headerdivs">
                        <a class="headerlinks" href="home">
                            Home
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="recipes">
                            All Recipes
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="create">
                            Create
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="userrecipes">
                            My Recipes
                        </a>
                    </div>
                    <div id="userbutton">
                        <a href="logout">
                            <img src="http://localhost:3333/?svg=\MaterialSymbolsPersonOutline.svg" alt="user icon" id="usericon">
                        </a>
                    </div>
                </div>
            </header>
            <main>
                <div id="griddetails">
                    <h1>
                        Discover culinary inspiration, key to your next meal.
                    </h1>
                    <p>
                        Explore our dynamic recipe-sharing platform, featuring diverse culinary creations from classic favorites to innovative dishes, perfect for every palate.
                    </p>
                </div>
                <div id="gridcontainer">
                    <div id="category">
                        <div id="dishtype">
                            <p>
                                <b>Dish Type</b>
                            </p>
                            <button class="dishbutton" id="allrecipes" onclick="window.location.href='/recipes'">
                                All recipes
                            </button>
                            <button class="dishbutton" id="breakfast" onclick="window.location.href='/breakfast'">
                                Breakfast
                            </button>
                            <button class="dishbutton" id="lunch" onclick="window.location.href='/lunch'">
                                Lunch
                            </button>
                            <button class="dishbutton" id="dinner" onclick="window.location.href='/dinner'">
                                Dinner
                            </button>
                            <button class="dishbutton" id="snacks" onclick="window.location.href='/snacks'">
                                Snacks
                            </button>
                            <button class="dishbutton" id="sweets" onclick="window.location.href='/sweets'">
                                Sweets
                            </button>
                            <button class="dishbutton" id="drinks" onclick="window.location.href='/drinks'">
                                Drinks
                            </button>
                        </div>
                        <div id="cuisine">
                            <p>
                                <b>Cuisine</b>
                            </p>
                            <button class="cuisinebutton" id="italian" onclick="window.location.href='/italian'">
                                Italian
                            </button>
                            <button class="cuisinebutton" id="japanese" onclick="window.location.href='/japanese'">
                                Japanese
                            </button>
                            <button class="cuisinebutton" id="mexican" onclick="window.location.href='/mexican'">
                                Mexican
                            </button>
                            <button class="cuisinebutton" id="indian" onclick="window.location.href='/indian'">
                                Indian
                            </button>
                            <button class="cuisinebutton" id="thai" onclick="window.location.href='/thai'">
                                Thai
                            </button>
                        </div>
                    </div>
                    <div id="grid">
                        ${recipeCardHTML}
                    </div>
                </div>
            </main>
        </body>
        </html>`);
                return res.end();
            });
        });
    })
}

// Navigate user to create page
exports.navigateToCreate = function(res)
{
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
    var description = formData.description;
    var image_src = formData.image_src;
    var short_description = formData.short_description;

    con = this.connectToDB();

    con.connect(function(err)
    {
        if (err) throw err;

        var sql_query = `INSERT INTO recipes (name, username, prep_time, serving_size, dish_type, cuisine, ingredients, instructions, description, image_src, short_description) VALUES ("${name}", "${username}", "${prep_time}", "${serving_size}", "${dish_type}", "${cuisine}", "${ingredients}", "${instructions}", "${description}", "${image_src}", "${short_description}")`
        
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

                // Updating JSON text file
                // Fetch all recipes from the database
                con.query("SELECT * FROM recipes", function(err, results) {
                    if (err) throw err;
    
                    // Prepare the data to be written to the JSON file
                    var recipes = results.map(function(row) {
                        return {
                            "name": row.name,
                            "username": row.username,
                            "prep_time": row.prep_time,
                            "serving_size": row.serving_size,
                            "dish_type": row.dish_type,
                            "cuisine": row.cuisine,
                            "ingredients": row.ingredients,
                            "instructions": row.instructions,
                            "description": row.description,
                            "image_src": row.image_src,
                            "short_description": row.short_description
                        };
                    });
                    // Convert the array to a JSON string with pretty formatting
                    let updatedData = JSON.stringify(recipes, null, 2);

                    // Write the updated JSON string to the file
                    fs.writeFile("../Data/recipes.txt", updatedData, 'utf8', function(writeErr)
                    {
                        if (err) throw err;
                        console.log("Database is upto date");
                    });

                    var alertScript = `<script>alert("Your recipe has been created"); window.location.href = "/recipes";</script>`;
                    res.writeHead(200, { 'Content-Type': 'text/html' });
                    res.write(alertScript);
                });
            }
        });
    });
}

// Navigate to user recipes
exports.navigateToUserRecipes = function(res, mySess)
{   
    var usernameToFind = mySess.username;

    con = exports.connectToDB();
    var recipeCardHTML = '';

    con.connect(function(err)
    {
        var sql_query = "SELECT * FROM recipes WHERE username = " + "'" + usernameToFind + "';";
        con.query(sql_query, function(err, results) {
            if (err) throw err;

            var recipes = results.map(function(row) {
                return {
                    "name": row.name,
                    "username": row.username,
                    "prep_time": row.prep_time,
                    "serving_size": row.serving_size,
                    "dish_type": row.dish_type,
                    "cuisine": row.cuisine,
                    "ingredients": row.ingredients,
                    "instructions": row.instructions,
                    "description": row.description,
                    "image_src": row.image_src,
                    "short_description": row.short_description
                };
            });

            recipes.forEach(function(recipe) {
                recipeCardHTML += `
                <a href="RecipesHTML/${recipe.name}.html">
                    <div class="recipecard">
                        <div class="manage">
                            <div class="managebuttonsdiv">
                                <button>
                                    <a href="edit">
                                        <img src="http://localhost:3333/?svg=../Icons/Edit.svg">
                                    </a>
                                </button>
                                <button onclick="delete">
                                    <a href="">
                                        <img src="http://localhost:3333/?svg=../Icons/Delete.svg">
                                    </a>
                                </button>
                            </div>
                        </div>
                        <div class="recipeimage">
                            <img src="http://localhost:3333/?jpg=/${recipe.image_src}">
                        </div>
                        <div class="recipedetails">
                            <div class="recipetype">
                                <div class="recipefilters">
                                    <div class="filter">
                                        ${recipe.cuisine}
                                    </div>
                                    <div class="filter">
                                        ${recipe.dish_type}
                                    </div>
                                </div>
                            </div>
                            <div class="recipeheading">
                                <h3>
                                    ${recipe.name}
                                </h3>
                                <p>
                                    ${recipe.short_description}
                                </p>
                            </div>
                        </div>
                    </div>
                    </a>`;
            });

            // Reading and displaying HTML file
            fs.readFile("../recipesgrid.html", function (err, data)
            {        
                if (err) throw err;
                
                res.writeHead(200, { 'Content-Type': 'text/html' });
                
                res.write(`
        <!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <!-- Importing Instrument Serif amd Josefin sans font -->
            <link rel="preconnect" href="https://fonts.googleapis.com">
            <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
            <link href="https://fonts.googleapis.com/css2?family=Josefin+Sans:wght@100..700&family=Merriweather:ital,wght@0,300;0,400;0,700;0,900;1,300;1,400;1,700;1,900&display=swap" rel="stylesheet">
            <!-- Linking favicon -->
            <link rel="icon" type="image/x-icon" href="http://localhost:3333/?svg=\recipes-svgrepo-com.svg">
            <!-- Linking CSS styles files -->
            <link rel="stylesheet" href="http://localhost:3333/?css=styles.css">    <!--Main styles sheet-->
            <link rel="stylesheet" href="http://localhost:3333/?css=header.css">
            <link rel="stylesheet" href="http://localhost:3333/?css=userrecipes.css">
            <title>My Recipes</title>
        </head>
        <body>
            <header>
                <div id="header_leftside">
                    <div class="companyname firstline">
                        128
                        <img src="http://localhost:3333/?svg=/recipes-svgrepo-com.svg" alt="128 Recipes logo icon">
                    </div>
                    <div class="companyname">
                        Recipes
                    </div>
                </div>
                <div id="header_rightside">
                    <div class="headerdivs">
                        <a class="headerlinks" href="home">
                            Home
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="recipes">
                            All Recipes
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="create">
                            Create
                        </a>
                    </div>
                    <div class="headerdivs">
                        <a class="headerlinks" href="userrecipes">
                            My Recipes
                        </a>
                    </div>
                    <div id="userbutton">
                        <a href="logout">
                            <img src="http://localhost:3333/?svg=/MaterialSymbolsPersonOutline.svg" alt="user icon" id="usericon">
                        </a>
                    </div>
                </div>
            </header>
            <main>
                <div id="myrecipes">
                    <h1>
                        Manage your culinary creations with ease - 
                        <br>
                        update, delete, and organize all your personal recipes in one place.
                    </h1>
                </div>
                <div id="cardcontainer">
                    ${recipeCardHTML}
                </div>
            </main>
        </body>
        </html>`);
                return res.end();
            });
        });
    })
}

exports.navigateToEdit = function(res, mySess)
{
    fs.readFile("../edit.html", function (err, data)
    {        
        if (err) {
            console.error('Error reading edit.html:', err);
            res.writeHead(500, { 'Content-Type': 'text/html' });
            res.write('Internal Server Error');
            return res.end();
        }
        res.writeHead(200, { 'Content-Type': 'text/html' });
        res.write(data);
        return res.end();
    });
}