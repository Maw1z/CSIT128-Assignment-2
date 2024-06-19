var http = require('http');
var url = require('url');
var fs = require('fs');
var myModule = require('./module');
var mySess = require('./session');
var multer = require('multer');
querystring = require('querystring');

http.createServer(function(req, res)
{
    var body = '';
    var s;
    var signupbody = '';
    var createformbody1 = '';
    var createformbody = {};

    // Handling login
    if (req.url == "/login") 
    {
        // read chunks of POST data
        req.on('data', chunk => {
            body += chunk.toString();
        });

        // when complete POST data is received
        req.on('end', () => {
            // use parse() method
            body = querystring.parse(body);

            // Authonticate user credentials.
            myModule.authenticateUser(res,body,mySess, myModule.preAuthentication);  
        });    
    }
    // Redirecting user to signup.html
    else if (req.url == "/signup_redirect") 
    {
        fs.readFile("../signup.html", function (err, data)
        {        
            res.writeHead(200, { 'Content-Type': 'text/html' });
            res.write(data);
            return res.end();
        });
    }
    // Handling signup
    else if (req.url == "/signup")
    {
        // read chunks of POST data
        req.on('data', chunk => {
            signupbody += chunk.toString();
        });

        // when complete POST data is received
        req.on('end', () => {
            // use parse() method
            signupbody = querystring.parse(signupbody);

            // Create new user
            myModule.createUser(res, signupbody);
        });  
    }
    else if (req.url == "/logout") 
    {
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                mySess.deleteSession();
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        }
        myModule.logout(res); 
    }
    else if (req.url == "/home") 
    {         
        s = mySess.getMySession();
        console.log(s);
        if (s !== undefined) 
        {
            if (s.userName != "" && s.userName !== undefined) 
            {
                console.log(mySess.getMySession.username);
                myModule.navigateToHome(res);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        }
    }
    else if (req.url == "/recipes")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToAllRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/breakfast")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToBreakfastRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/lunch")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToLunchRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/dinner")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToDinnerRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/snacks")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToSnacksRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/sweets")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToSweetsRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/drinks")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToDrinksRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/italian")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToItalianRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }        
    else if (req.url == "/japanese")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToJapaneseRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }   
    else if (req.url == "/mexican")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToMexicanRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }   
    else if (req.url == "/indian")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToIndianRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }   
    else if (req.url == "/thai")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToThaiRecipes);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }     
    else if (req.url == "/create")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToCreate);
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    else if (req.url == "/create_form") {
        const storage = multer.diskStorage({
            destination: function (req, file, cb) {
                cb(null, '../Recipe pics'); // Destination folder for uploads
            },
            filename: function (req, file, cb) {
                cb(null, file.originalname);
            }
        });
            
        // Create an instance of multer upload middleware
        const upload = multer({ storage: storage }).single('fileinput');

        upload(req, res, function (err) {
            // Check for multer errors
            if (err instanceof multer.MulterError) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("Error uploading file.");
                return;
            } else if (err) {
                console.log(err);
                res.writeHead(500, { 'Content-Type': 'text/html' });
                res.end("Error uploading file.");
                return;
            }    

            var name = req.body.name;
            var prep_time = req.body.prep_time;
            var serving_size = req.body.serving_size;
            var dish_type = req.body.dish_type;
            var cuisine = req.body.cuisine;
            var ingredients = req.body.ingredients;
            var instructions = req.body.instructions;
            var short_description = req.body.short_description;

            var image_src = req.name;
            
            s = mySess.getMySession();
            myModule.createRecipe(res, { name, prep_time, serving_size, dish_type, cuisine, ingredients, instructions, image_src, short_description }, s);
        });
    }
    else if (req.url == "/userrecipes")
    {        
        s = mySess.getMySession();
        if (s !== undefined) 
        {
            if (s.username != "" && s.username !== undefined) 
            {
                myModule.getUser(res, s, myModule.navigateToUserRecipes);            
            }
        } 
        else 
        {
            // Redirect to the login page.
            myModule.login(res);
        } 
    }
    // Edit page
    else 
    {
        myModule.login(res);
    }
}).listen(8080);