// login.js

function login_action()
{
    const username = document.getElementById('text_username').value;
    const password = document.getElementById('text_password').value;
    validate_login();
}

function validate_login()
{
    // This node js function to exist in other file, have to run it as parameter, import it first
    // Connect to database
    // Send select statement, if query returns true, then load index.html
    window.location.href = "index.html";
}
