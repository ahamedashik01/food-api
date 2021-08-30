const searchFood = () => {
    const searchfield = document.getElementById('search-field');
    const searchText = searchfield.value;
    searchfield.value = '';
    if (searchText == '') {
        // error message 
    } else {
        // load api 
        const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${searchText}`
        fetch(url)
            .then(res => res.json())
            .then(data => displayMeals(data.meals));
    }
};

const displayMeals = meals => {

    if (meals.lenght == 0) {
        // error message
    }
    else {
        meals.forEach(meal => {
            // console.log(meal);
            const mealContainer = document.getElementById('meal-container');
            const div = document.createElement('div');
            mealContainer.textContent = '';
            div.classList.add('col');
            div.innerHTML = `
                <div onclick ="loadDetails(${meal.idMeal})" class="card h-100">
                    <img src="${meal.strMealThumb}" class="card-img-top" alt="...">
                     <div class="card-body">
                         <h5 class="card-title">${meal.strMeal}</h5 >
                <p class="card-text">${meal.strInstructions.slice(0, 200)}</p>
                     </div >
                </div >
    `;
            mealContainer.appendChild(div);
        });
    }
}

const loadDetails = mealId => {

    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`

    fetch(url)
        .then(res => res.json())
        .then(data => displayMealDetails(data.meals[0]));
};

const displayMealDetails = meals => {
    console.log(meals);
    const displaydiv = document.getElementById('meal-details');
    const div = document.createElement('div');
    div.classList.add('card');
    displaydiv.textContent = '';
    div.innerHTML = `
            <img src="${meals.strMealThumb}" class="card-img-top" alt="...">
            <div class="card-body">
                <h5 class="card-title">${meals.strMeal}</h5>
                <p class="card-text">${meals.strInstructions.slice(0, 250)}</p>
                <a href="${meals.strYoutube}" class="btn btn-primary">Open video</a>
            </div>
    `;
    displaydiv.appendChild(div);
};
