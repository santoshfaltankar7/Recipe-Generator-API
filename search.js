const sbtninp = document.getElementById('sbtninp')
const sbtn=document.getElementById('sbtn')
const recp=document.getElementById('result')


function searchData(){
    fetch (`https://www.themealdb.com/api/json/v1/1/search.php?s=${sbtninp.value}`)
    .then (function(res){
        console.log(res)
        return res.json()
    })
    .then (function(data){
        
        console.log(data.meals)
        displaySearchData(data.meals)

    })
}
sbtn.addEventListener("click",searchData)

function  displaySearchData(meals){
    meals.forEach(m => {
       const sDiv=document.createElement('div')
       sDiv.classList.add("col-md-12","col-lg-4",'mb-4')
       const carddiv=document.createElement('div')
       carddiv.classList.add('card','h-100')
       
       const cardbody=document.createElement('div')
       cardbody.classList.add('card-body')

       const title=document.createElement('h1')
       title.textContent=m.strMeal
       title.classList.add("Title")
       
       const area=document.createElement('h2')
       area.textContent=m.strArea
       area.classList.add('areaf')

       const instruction=document.createElement('p')
        instruction.textContent=m.strInstructions
        instruction.classList.add("inst")
       const img=document.createElement('img')
       img.src=m.strMealThumb
       const readbutton=document.createElement('button')
       readbutton.textContent="Read recipe"
       readbutton.classList.add("Rbtn")
       readbutton.addEventListener("click", ()=> {
        window.location.href=`readmore.html?id=${m.idMeal}`
        
       })

       const videos=document.createElement('video')
       videos.src=m.strYoutube
      cardbody.append(title,area,readbutton)
      carddiv.append(img,cardbody)
       sDiv.appendChild(carddiv)
       recp.appendChild(sDiv)





       sbtninp.value='';
        
    });
}

