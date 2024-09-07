const params=new URLSearchParams(window.location.search)
let category = params.get('category')

const fetchMeals=async () => {
    if(!category) return;
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?c=${category}`)

    const data = await res.json()
    displayMeals(data)
}
const displayMeals = (data) => {
    const mealContainer = document.getElementById('Each');
    mealContainer.innerHTML = ''; 
    data.meals.forEach(meal => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('col-12', 'col-md-4', 'mb-4');
        
        const recAdd=document.createElement('a')
        recAdd.classList.add('text-decoration-none')
        recAdd.href=`./recinfo.html?mealdetails=${meal.idMeal}`
     
        const card = document.createElement('div');
        card.classList.add('card', 'h-100');

        const img = document.createElement('img');
        img.src = meal.strMealThumb;
        img.classList.add('card-img-top', 'rounded-circle', 'mx-auto', 'd-block');

        const cardBody = document.createElement('div');
        cardBody.classList.add('card-body');

        const title = document.createElement('h5');
        title.textContent = meal.strMeal;
        title.classList.add("Title")
        cardBody.appendChild(title);

        card.append(img,cardBody);
         recAdd.appendChild(card)
        mealDiv.appendChild(recAdd);
        mealContainer.appendChild(mealDiv);
    });
};
fetchMeals()
