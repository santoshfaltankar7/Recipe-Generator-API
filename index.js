const mainDiv = document.querySelector('#recp .row');

const fetchData=async()=>{
    const res=await fetch(`https://www.themealdb.com/api/json/v1/1/categories.php`)
    const data=await res.json()
    displayfood(data)
    }
    fetchData()
    const  displayfood=(data)=>{
        data.categories.forEach(f => {
        const resDiv=document.createElement('div')
        resDiv.classList.add("foores",'col-xs-12','col-sm-6', 'col-md-4', 'mb-4')
        const cardDiv=document.createElement('div')
        cardDiv.classList.add('card','h-100','cart1')
        const cardBody = document.createElement('div');
    cardBody.classList.add('card-body');
        const img=document.createElement('img')
        const tittle=document.createElement('h3')
        const dis=document.createElement('p')
         const heading = document.createElement('h2')
        heading.textContent="Ingredients You’ll Need"
        const nextpage=document.createElement('a')
        nextpage.classList.add('text-decoration-none')
        nextpage.href=`./Eachcat.html?category=${f.strCategory}`
        nextpage.target='_blank'
        dis.textContent=f.strCategoryDescription
        img.src=f.strCategoryThumb
        tittle.textContent=f.strCategory
        tittle.classList.add("Title")
        cardBody.append(tittle,dis)
        cardDiv.append(img,cardBody)
        resDiv.appendChild(nextpage)
        nextpage.appendChild(cardDiv)
        mainDiv.appendChild(resDiv)
        
    });}
    fetchData()
    
