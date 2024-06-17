function create_action()
{
    // Handling image input
    let fileinput = document.getElementById('fileinput');
    let filename = '';

    if (fileinput && fileinput.files && fileinput.files.length > 0) {
        let file = fileinput.files[0];
        
        // to write image into folder using node js over here
        filename = file.name;
    }

    // Dish type
    const dish_type_val = document.getElementById('dish_type').value;

    // Cuisine
    const cuisine_val = document.getElementById('cuisine').value;

    // Recipe name
    const recipe_name_val = document.getElementById('rec_name').value;

    // Recipe about
    const recipe_about_val = document.getElementById('rec_about').value;

    // Prep time
    const prep_time_val = document.getElementById('rec_time').value;

    // Serving size
    const serving_size_val = document.getElementById('rec_size').value;

    // Recipe description
    const recipe_description_val = document.getElementById('rec_desc').value;

    // Recipe ingredients
    const ingredients_val = document.getElementById('rec_ingred').value;

    // Recipe instructions
    const instructions_val = document.getElementById('rec_instruc').value;
    
    let recipeObj = {
        name: recipe_name_val,
        username: "foo",
        prep_time: prep_time_val,
        serving_size: serving_size_val,
        dish_type: dish_type_val,
        cuisine: cuisine_val, 
        ingredients: ingredients_val,
        instructions: instructions_val,
        description: recipe_description_val,
        image_src: filename,
        short_description: recipe_about_val
    }

    console.log(recipeObj);
    // add this recipeObj to recipes.txt using node.js by appending
}