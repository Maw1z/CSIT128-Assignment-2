var http = require('http');
var url = require('url');
var fs = require('fs');
var myModule = require('./module')
var mySess = require('./session')
querystring = require('querystring');

http.createServer(function(req, res)
{
    var body = '';
    var s;
    var signupbody = '';

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
                myModule.getUser(res, s, myModule.navigateToRecipes);                 
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
    else 
    {
        myModule.login(res);
    }
}).listen(8080);