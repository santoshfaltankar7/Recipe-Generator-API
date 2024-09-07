 const generateinp = document.getElementById('inge');
const submitbtn = document.getElementById('submit');
const showData = document.getElementById('show');

submitbtn.addEventListener("click", fetchData);

function fetchData() {
    fetch(`https://www.themealdb.com/api/json/v1/1/filter.php?i=${generateinp.value}`)
        .then(function(res) {
            return res.json();
        })
        .then(function(data) {
            showData.innerHTML = '';
            if (!data.meals) {
                showData.innerHTML = '<h2>No meals found</h2>';
                return;
            }
            data.meals.forEach(function(meal) {
               
                fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${meal.idMeal}`)
                    .then(function(res) {
                        return res.json();
                    })
                    .then(function(detailData) {
                        showMealDetails(detailData.meals[0]); 
                    });
            });
        })
        generateinp.value=""
}

function showMealDetails(meal) {
    const shDiv = document.createElement('div');
    shDiv.classList.add("col-md-12","col-lg-6",'mb-4')
    const carddiv=document.createElement('div')
    carddiv.classList.add('card','h-100')
    
    const cardbody=document.createElement('div')
    cardbody.classList.add('card-body')


   
    const shimg = document.createElement('img');
    shimg.src = meal.strMealThumb;

  
    const shtitle = document.createElement('h1');
    shtitle.textContent = meal.strMeal;
    shtitle.classList.add("Title")
     const heading = document.createElement('h2')
        heading.textContent="Ingredients You’ll Need"
        heading.classList.add("heading")
        

  
    const sharea = document.createElement('h3');
    sharea.textContent = `Area: ${meal.strArea+" Food" || "Not available"}`;
   sharea.classList.add('areaf')

   const parahead=document.createElement('h2')
   parahead.textContent="Let’s Get Cooking!"
   parahead.classList.add("parahead")
    const shinstruction = document.createElement('p');
    shinstruction.textContent = `Instructions: ${meal.strInstructions || "Not available"}`;
    shinstruction.classList.add("inst")

   
    const ingrUl = document.createElement('ul');
    for (let i = 1; i <= 20; i++) {
        const ing = meal[`strIngredient${i}`];
        const measure = meal[`strMeasure${i}`];
        if (ing && ing.trim() !== '') {
            const item = document.createElement('li');
            item.textContent = `${measure} ${ing}`;
            ingrUl.appendChild(item);
        }
    }

    cardbody.append(shtitle, sharea,heading, ingrUl,parahead,shinstruction)
    carddiv.append(shimg,cardbody)
    shDiv.append(carddiv);
    showData.appendChild(shDiv);
}


 
 