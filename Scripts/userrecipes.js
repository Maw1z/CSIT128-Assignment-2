// get queryResult here

function get_user_recipes(queryResult)
{
    // do something with the queryresult here depending on how its returned
    load_recipes_object(queryResult)
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
                                    <img src="${JSONObj.image_src}">
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
                                            ${JSONObj.short_description}
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </a>
            `;
        }
    document.getElementById('grid').innerHTML = RecipeCardHTML;
}