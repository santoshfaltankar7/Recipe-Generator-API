const mealContainer = document.getElementById('recipe');
const params=new URLSearchParams(window.location.search)
let mealdetails = params.get('mealdetails')

const fetchMeals=async () => {
    if(!mealdetails) return;
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealdetails}`)

    const data = await res.json()
    displayMeals(data)
}
const displayMeals = (data) => {
   
    mealContainer.innerHTML = '';                                               
    data.meals.forEach(detail => {
        const mealDiv = document.createElement('div');
        mealDiv.classList.add('card', 'col-md-8', 'col-lg-12', 'mb-4')

        const cardbody=document.createElement('div')
        cardbody.classList.add('card-body');
        

        

        
        const img = document.createElement('img');
        img.src = detail.strMealThumb;
        

        const area=document.createElement('h3')
        area.textContent=detail.strArea+" Food"
        area.classList.add('areaf')

        const parahead=document.createElement('h2')
        parahead.textContent="Let’s Get Cooking!"
        parahead.classList.add("parahead")

        const instruction=document.createElement('p')
        instruction.textContent=detail.strInstructions
        instruction.classList.add("inst")

        const cat=document.createElement('p')
        cat.textContent=detail.strCategory

        const heading = document.createElement('h2')
        heading.textContent="Ingredients You’ll Need"
        heading.classList.add("heading")

        const ingredientcontainer=document.createElement('ul')
        ingredientcontainer.classList.add("list-unstyled")
        for(let i=1;i<=20;i++){
            const ing=detail[`strIngredient${i}`];
            const measure=detail[`strMeasure${i}`]
            if(ing && ing.trim() !== ''){
                const item=document.createElement('li')
                item.classList.add("text-decoration-none")
                item.textContent=`${measure} ${ing}`
                ingredientcontainer.appendChild(item)
            }
        }


        const title = document.createElement('h2');
        title.textContent = detail.strMeal;
        title.classList.add("Title") //for using in css for color
        const buttonlink=document.createElement('a')
        buttonlink.href=`./Eachcat.html?category=${encodeURIComponent(cat.textContent)}`;
        const button=document.createElement('button')
        button.textContent=" <<back"
        button.classList.add("backbtn","btn-left")


         const youtubeUrl = new URL(detail.strYoutube);
        const videoId = youtubeUrl.searchParams.get('v');
        
        const yVideo = document.createElement('iframe');
        yVideo.src = `https://www.youtube.com/embed/${videoId}`;
        yVideo.width = "560";
        yVideo.height = "315";
        yVideo.frameBorder = "0";
        yVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        yVideo.allowFullscreen = true;
       
        const videoContainer = document.createElement('div');
videoContainer.classList.add('embed-responsive', 'embed-responsive-16by9'); 
videoContainer.appendChild(yVideo);

        buttonlink.appendChild(button)
        cardbody.append(title,area,heading,ingredientcontainer,parahead,instruction)
        mealDiv.append(img,cardbody,videoContainer,buttonlink);
        mealContainer.appendChild(mealDiv);
    });
};
fetchMeals()
