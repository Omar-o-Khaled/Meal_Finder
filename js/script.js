let inputSearch=document.getElementById("searchField")
let search_btn=document.getElementById("search_btn")
let random_btn=document.getElementById("random_btn")
let mealContainer=document.querySelector(".mealContainer")

search_btn.addEventListener("click",()=>{
    if(inputSearch.value.trim()){
        mealContainer.id="allResults";
    }
    else{
        mealContainer.id="";
    }
})
random_btn.addEventListener("click",()=>{
    mealContainer.id="single";
    
})
search_btn.addEventListener("click",createMeals)
random_btn.addEventListener("click",createMeals)

window.addEventListener("load",()=>{
    inputSearch.focus()
})

function createMeals(btn){
    let inputValue=inputSearch.value.trim();
    let myArray;
    if(inputValue&& mealContainer.id=="allResults"){
        myArray=fetchFunction().then(result=>{
            myArrayLoop(result.meals)
            inputSearch.value="";
        });
    }else if(mealContainer.id=="single"){
            myArray=fetchFunction().then(result=>{
            myArrayLoop(result.meals)
        });
    }else if(!inputValue){
        alert("Not Valied Input Value")
    }
}
async function fetchFunction(mealname){
    let mypromise;
    if(mealContainer.id=="allResults"){
        mypromise= await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${inputSearch.value.trim()||mealname}`)
        return await mypromise.json()
    }else if(mealContainer.id=="single"){
        mypromise= await fetch(`https://www.themealdb.com/api/json/v1/1/random.php`);
        return await mypromise.json()
    }
}
function myArrayLoop(mainArray){
    mealContainer.innerHTML="";
    if(mainArray){
    mainArray.map((singleMeal,i)=>{
        let headingAndImg=document.createElement("div")
        let h2=document.createElement("h2")
        let imgMeal=document.createElement("img")
        let mealInfo=document.createElement("div")
        let mealcategory=document.createElement("p")
        let mealcountry=document.createElement("p")
        let cookWay=document.createElement("div")
        let h3=document.createElement("h3")
        let ul=document.createElement("ul")
        let a=document.createElement("a");
        let youtubeIMG=document.createElement("div")

        headingAndImg.className="headingAndImg";
        h2.className="mealName";
        imgMeal.id="mealImg";
        mealInfo.className="mealInfo";
        mealcategory.className="mealcategory";
        mealcountry.className="mealcountry";
        cookWay.className="cookWay";
        ul.className="ingredients";
        a.className="video";
        youtubeIMG.id="youTube";

        imgMeal.src=singleMeal.strMealThumb;
        headingAndImg.id=singleMeal.idMeal
        h2.innerHTML=singleMeal.strMeal;
        mealcategory.innerHTML=singleMeal.strCategory;
        mealcountry.innerHTML=singleMeal.strArea;
        cookWay.innerHTML=singleMeal.strInstructions;
        h3.innerHTML="Ingredients";
        a.href=singleMeal.strYoutube
        a.target="_blank"
        youtubeIMG.innerHTML="YouTube";

        for(let k=1;k<=20;k++){
            let li=document.createElement("li")
            if(mainArray[i][`strIngredient${k}`]){
                li.innerHTML=mainArray[i][`strMeasure${k}`]+" "+mainArray[i][`strIngredient${k}`]
                ul.append(li)
            }    
        }
        a.append(youtubeIMG)
        headingAndImg.append(h2,imgMeal)
        mealInfo.append(mealcategory,mealcountry)
        if(mealContainer.id=="allResults"){
            mealContainer.append(headingAndImg)
            headingAndImg.onclick=()=>{
                if(mealContainer.id=="allResults"){
                    mealContainer.innerHTML="";
                    fetchFunction(headingAndImg.children[0].innerHTML).then(result=>{
                        mealContainer.removeAttribute("id")
                        myArrayLoop(result.meals)
                        mealContainer.append(headingAndImg,mealInfo,cookWay,h3,ul,singleMeal.strYoutube?a:"")
                    });
                }
            }
        }else if(mealContainer.id=="single"){mealContainer.append(headingAndImg,mealInfo,cookWay,h3,ul,singleMeal.strYoutube?a:"")}
        })
    }else{mealContainer.append("Not Founded your Oreder")}
}