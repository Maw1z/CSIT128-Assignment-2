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
    console.log('test');
}

getRecipesAJAX();

// document.addEventListener('DOMContentLoaded', function() {
//     const recipes = [
//         {
//             image: '1.jpg',
//             cuisine: 'Italian',
//             dishType: 'Breakfast',
//             isVegetarian: true,
//             title: 'Salad',
//             description: 'A fresh and healthy Italian salad perfect for breakfast.',
//         },
//         {
//             image: '2.jpg',
//             cuisine: 'Japanese',
//             dishType: 'Lunch',
//             isVegetarian: false,
//             title: 'Sushi',
//             description: 'Delicious and authentic Japanese sushi rolls.',
//         },
//         // Add more recipes here
//     ];

//     const gridContainer = document.getElementById('grid');

//     recipes.forEach(recipe => {
//         const recipeCard = document.createElement('div');
//         recipeCard.className = 'recipecard';

//         const recipeImage = document.createElement('div');
//         recipeImage.className = 'recipeimage';
//         const img = document.createElement('img');
//         img.src = recipe.image;
//         recipeImage.appendChild(img);

//         const recipeDetails = document.createElement('div');
//         recipeDetails.className = 'recipedetails';

//         const recipeType = document.createElement('div');
//         recipeType.className = 'recipetype';

//         const recipeFilters = document.createElement('div');
//         recipeFilters.className = 'recipefilters';
        
//         const filterCuisine = document.createElement('div');
//         filterCuisine.className = 'filter';
//         filterCuisine.textContent = recipe.cuisine;
//         recipeFilters.appendChild(filterCuisine);

//         const filterDishType = document.createElement('div');
//         filterDishType.className = 'filter';
//         filterDishType.textContent = recipe.dishType;
//         recipeFilters.appendChild(filterDishType);

//         recipeType.appendChild(recipeFilters);

//         const recipeVeg = document.createElement('div');
//         recipeVeg.className = 'recipeveg';
//         const vegImg = document.createElement('img');
//         vegImg.src = recipe.isVegetarian ? 'veg.png' : 'non-veg.png';
//         recipeVeg.appendChild(vegImg);
//         recipeType.appendChild(recipeVeg);

//         recipeDetails.appendChild(recipeType);

//         const recipeHeading = document.createElement('div');
//         recipeHeading.className = 'recipeheading';
//         const h3 = document.createElement('h3');
//         h3.textContent = recipe.title;
//         const p = document.createElement('p');
//         p.textContent = recipe.description;

//         recipeHeading.appendChild(h3);
//         recipeHeading.appendChild(p);

//         recipeDetails.appendChild(recipeHeading);

//         recipeCard.appendChild(recipeImage);
//         recipeCard.appendChild(recipeDetails);

//         gridContainer.appendChild(recipeCard);
//     });
// });
