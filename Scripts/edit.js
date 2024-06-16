// retrieve data from database and pass to first function
// and then normal form but instead of adding, update instead

var old_dishtype = '';
document.getElementById('dishtype_prev').innerHTML = old_dishtype;

var old_cuisine = '';
document.getElementById('cuisine_prev').innerHTML = old_cuisine;

var old_name = '';
document.getElementById('name_prev').innerHTML = old_name;

var old_about = '';
document.getElementById('about_prev').innerHTML = old_about;

var old_preptime = '';
document.getElementById('preptime_prev').innerHTML = old_preptime;

var old_size = '';
document.getElementById('size_prev').innerHTML = old_size;

var old_description = '';
document.getElementById('description_prev').innerHTML = old_description;

var old_ingredients = '';
document.getElementById('ingredients_prev').innerHTML = old_ingredients;

var old_instructions = '';
document.getElementById('instructions_prev').innerHTML = old_instructions;

function update_action()
{
    // Dish type
    const dish_type_val = document.getElementById('dish_type').value;

    // Cuisine
    const cuisine_val = document.getElementById('cuisine').value;

    // Recipe about
    const recipe_about_val = document.getElementById('rec_about').value;

    // Prep time
    const prep_time_val = document.getElementById('rec_time').value;

    // Serving size
    const serving_size_val = document.getElementById('rec_size').value;

    // Recipe description
    const recipe_description_val = document.getElementById('rec_desc').value;

    // Recipe ingredients
    let ingredients_text = document.getElementById('rec_ingred').value;
    const ingredients_val = ingredients_text.split(', ');

    // Recipe instructions
    const instructions_val = document.getElementById('rec_instruc').value;
    
    let recipeObj = {
        name: old_name,
        username: "foo",
        prep_time: prep_time_val,
        serving_size: serving_size_val,
        dish_type: dish_type_val,
        cuisine: cuisine_val, 
        ingredients: ingredients_val,
        instructions: instructions_val,
        about: {
            description: recipe_description_val,
            image_src: filename,
            short_description: recipe_about_val
        }
    }

    console.log(recipeObj);
    // update this recipeObj to recipes.txt using node.js where name is same
}