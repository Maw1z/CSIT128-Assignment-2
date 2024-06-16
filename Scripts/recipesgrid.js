function getRecipesAJAX()
{
    var xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function()
    {
        if (xhttp.readyState == 4 && xhttp.status == 200)
            {
                var JSONText = JSON.parse(xhttp.responseText);
                load_recipes_object(JSONText);
            }
    }
    xhttp.open("GET", "../Data/recipes.txt", true);
    xhttp.send();
}

function load_recipes_object(JSONText)
{
    let RecipeCardHTML = '';
    for (let index = 0; index < JSONText.length; index++)
        {
            let JSONObj = JSONText[index];
            RecipeCardHTML += `
                        <a href="RecipesHTML/${JSONObj.name}.html">
                            <div class="recipecard">
                                <div class="recipeimage">
                                    <img src="${JSONObj.about.image_src}">
                                </div>
                                <div class="recipedetails">
                                    <div class="recipetype">
                                        <div class="recipefilters">
                                            <div class="filter">
                                                ${JSONObj.cuisine}
                                            </div>
                                            <div class="filter">
                                                ${JSONObj.dish_type}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="recipeheading">
                                        <h3>
                                            ${JSONObj.name}
                                        </h3>
                                        <p>
                                            ${JSONObj.about.short_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
            `;
        }
    document.getElementById('grid').innerHTML = RecipeCardHTML;
}

getRecipesAJAX();

function filter_grid(returnQueryResult)
{
    let FilterRecipeCardHTML = '';
    for (let index = 0; index < returnQueryResult.length; index++)
        {
            let JSONObj = JSONText[index];
            FilterRecipeCardHTML += `
                        <a href="RecipesHTML/${returnQueryResult.name}.html">
                            <div class="recipecard">
                                <div class="recipeimage">
                                    <img src="${returnQueryResult.about.image_src}">
                                </div>
                                <div class="recipedetails">
                                    <div class="recipetype">
                                        <div class="recipefilters">
                                            <div class="filter">
                                                ${returnQueryResult.cuisine}
                                            </div>
                                            <div class="filter">
                                                ${returnQueryResult.dish_type}
                                            </div>
                                        </div>
                                    </div>
                                    <div class="recipeheading">
                                        <h3>
                                            ${returnQueryResult.name}
                                        </h3>
                                        <p>
                                            ${returnQueryResult.about.short_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
            `;
        }
    document.getElementById('grid').innerHTML = FilterRecipeCardHTML;
}

// Each display function will fetch result from database and then pass the result to filter_grid()


// select * from recipes
document.getElementById('allrecipes').addEventListener("click", getRecipesAJAX());

// select dishtype = "breakfast" from recipes;
document.getElementById('breakfast').addEventListener("click", display_breakfast());

// select dishtype = "lunch" from recipes;
document.getElementById('lunch').addEventListener("click", display_lunch());

// select dishtype = "dinner" from recipes;
document.getElementById('dinner').addEventListener("click", display_dinner());

// select dishtype = "snacks" from recipes;
document.getElementById('snacks').addEventListener("click", display_snacks());

// select dishtype = "sweets" from recipes;
document.getElementById('sweets').addEventListener("click", display_sweets());

// select dishtype = "drinks" from recipes;
document.getElementById('drinks').addEventListener("click", display_drinks());

// select cuisine = "italian" from recipes;
document.getElementById('italian').addEventListener("click", display_italian());

// select cuisine = "japanese" from recipes;
document.getElementById('japanese').addEventListener("click", display_japanese());

// select cuisine = "mexican" from recipes;
document.getElementById('mexican').addEventListener("click", display_mexican());

// select cuisine = "indian" from recipes;
document.getElementById('indian').addEventListener("click", display_indian());

// select cuisine = "thai" from recipes;
document.getElementById('thai').addEventListener("click", display_thai());
