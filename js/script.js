const recipeResultDiv = document.getElementById('recipeResultDiv');

const searchBtn = async () => {
  const query = document.getElementById('searchInput').value.trim();
  if(!query){
    alert('Please enter a recipe name!');
    return;
  }

  const apiUrl = `https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`;

  try
  {
    const response = await fetch(apiUrl);

    if(!response.ok)
    {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const data = await response.json();
    const recipes = data.meals;

    recipeResultDiv.innerHTML = '';

    if(!recipes)
    {
      recipeResultDiv.innerHTML = '<p>No recipes found!</p>';
      return;
    }

    const resultHeading = document.createElement('h2');
    resultHeading.textContent = `Results for "${query}"`;
    resultHeading.style.marginBottom = '10px';
    recipeResultDiv.appendChild(resultHeading);

    recipes.forEach(recipe => {
      const recipeDiv = document.createElement('div');
      recipeDiv.style.border = '1px solid black';
      recipeDiv.style.borderRadius = '8px';
      recipeDiv.style.padding = '8px';
      recipeDiv.style.margin = '8px';
      recipeDiv.innerHTML = `
        <h3>${recipe.strMeal}</h3>
        <img src=${recipe.strMealThumb} width='100%'>
        <p>${recipe.strInstructions}</p>
      `;
      recipeResultDiv.appendChild(recipeDiv);
    });

    document.getElementById('searchInput').value = '';
  }
  catch(error)
  {
    console.error('Error fetching recipes:', error);
    recipeResultDiv.innerHTML = '<p>An error occurred. Please try again.</p>';
  }
};
