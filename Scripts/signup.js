// signup.js

function signup_action()
{
    const username = document.getElementById('text_new_username').value;
    const password = document.getElementById('text_new_password').value; 
    add_new_user();
}

function add_new_user()
{
    // This node js function to exist in other file, have to run it as parameter, import it first
    // Connect to database
    // Insert into database, if error comes back, alert saying user exists, else load login.html
    window.location.href = "login.html";
}
