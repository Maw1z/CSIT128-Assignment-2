var fs = require('fs');

function writeRecipeFiles(recipeObj) {
    if (typeof recipeObj.ingredients !== 'string') {
        console.error('Error: ingredients property is not a valid string');
        return;
    }

    let recipeIngredientArray = recipeObj.ingredients.split(", ");
    let numberOfIngredients = recipeIngredientArray.length;
    let ingredientHTML = '';

    for (let index = 0; index < recipeIngredientArray.length; index++) {
        ingredientHTML += `                    
                    <div class="ingredientitem">
                        <p>
                            &bull; ${recipeIngredientArray[index]}
                        </p>
                    </div>`;
    }
    fs.writeFile(`../RecipesHTML/${recipeObj.name}.html`, 
`<!DOCTYPE html>
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
    <link rel="stylesheet" href="http://localhost:3333/?css=item.css">
    <title>Recipe Item</title>
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
        <div id="itemdetails">
            <div id="ownerdetails">
                <p>
                    Recipe By:
                </p>
                <p>
                    <span id="recipeowner">
                        ${recipeObj.username}
                    </span>
                </p>
            </div>
            <div id="ingredientlist">
                <p>
                    <b>
                        Ingredients:
                    </b>
                </p>
                <div id="ingredientscontainer">
                    ${ingredientHTML}                  
                </div>
            </div>
            <div id="instructions">
                <p>
                    <b>
                        Instructions:
                    </b>
                </p>
                <p id="instructiontext">
                    ${recipeObj.instructions}
                </p>
            </div>
        </div>
        <div id="item">
            <div id="itemname">
                <h1 id="recipename">
                    ${recipeObj.name}
                </h1>
            </div>
            <div id="itemprep">
                <div id="preptime">
                    <p>
                        <b>
                            Prep time:
                        </b>
                        <span id="preptimevar">
                            ${recipeObj.prep_time}
                        </span> 
                    </p>
                </div>
                <div id="servingsize">
                    <p>
                        <b>
                            Serving size:
                        </b>
                        <span id="servingsizevar">
                            ${recipeObj.serving_size}
                        </span>
                    </p>
                </div>
                <div id="ingredients">
                    <p>
                        <b>
                            Ingredients:
                        </b>
                        <span id="ingredientsvar">
                            ${numberOfIngredients}
                        </span>
                    </p>
                </div>
            </div>
            <div id="itemabout">
                <img src="${recipeObj.image_src}">
                <p id="itemtextabout">
                    ${recipeObj.description}
                </p>
            </div>
        </div>
    </main>
</body>
</html>`, function(err) {
    if (err) throw err;
    console.log("Recipe page created!");
});
}

// <img src="http://localhost:3333/?svg=${recipeObj.image_src}">

function readData(filepath) {
    fs.readFile(filepath, 'utf-8', function(err, data) {
        if (err) throw err;
        dataArray = JSON.parse(data);
        for (let index = 0; index < dataArray.length; index++) {
            writeRecipeFiles(dataArray[index]);
        }
    });
}

readData('../Data/recipes.txt');
