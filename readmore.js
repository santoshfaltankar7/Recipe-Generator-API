const maDiv=document.getElementById("readmore")
const param=new URLSearchParams(window.location.search)
let id=param.get("id")

function fetchData(id){
    fetch (`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${id}`)
    .then (function(res){
        console.log(res)
        return res.json()
    })
    .then (function(data){
        console.log(data.meals)
        displayData(data.meals)
    })
}

function displayData(meals){
    
   
    meals.forEach(s => {
        const reDiv=document.createElement('div')
        reDiv.classList.add("card")
        
        const reimg=document.createElement('img')
        reimg.src=s.strMealThumb

        const retitle=document.createElement('h1')
        retitle.textContent=s.strMeal

        const rearea=document.createElement('h3')
        rearea.textContent=s.strArea+" Food"
        
        const parahead=document.createElement('h2')
        parahead.textContent="Let’s Get Cooking!"
        parahead.classList.add("parahead")

        const reinstruction=document.createElement('p')
            reinstruction.textContent=s.strInstructions
            
            const heading = document.createElement('h2')
        heading.textContent="Ingredients You’ll Need"
        heading.classList.add("heading")
            const ingUl=document.createElement('ul')
        ingUl.classList.add("list-unstyled")
        for(let i=1;i<=20;i++){
            const ing=s[`strIngredient${i}`];
            const measure=s[`strMeasure${i}`]
            if(ing && ing.trim() !== ''){
                const item=document.createElement('li')
                item.classList.add("text-decoration-none")
                item.textContent=`${measure} ${ing}`
                ingUl.appendChild(item)
            }
        }
        
        
        const youtubeUrl = new URL(s.strYoutube);
        const videoId = youtubeUrl.searchParams.get('v');
        
        const yVideo = document.createElement('iframe');
        yVideo.src = `https://www.youtube.com/embed/${videoId}`;
        yVideo.width = "560";
        yVideo.height = "315";
        yVideo.frameBorder = "0";
        yVideo.allow = "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture";
        yVideo.allowFullscreen = true;


        


        reDiv.append(retitle,reimg,rearea,heading,ingUl,parahead,reinstruction,yVideo)
        maDiv.appendChild(reDiv)


    })
    
}

fetchData(id)