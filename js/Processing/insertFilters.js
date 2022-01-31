import { filteringSearchbar } from "./filtering.js";

export function insertIngredients(totalIngredients){
    const itemsContainer = document.getElementById("select-ingredients--items");
    
    // récupération des éléments
    const searchInput = document.querySelector(".select-ingredients");
    const inputBox = searchInput.querySelector("input");
    const suggBoxtBox = searchInput.querySelector(".autocom-box");
    console.log(searchInput);

    let DOMfiltersIngredients = document.querySelector(".filters-ingredients");
    let DOMingredientsChoosen = DOMfiltersIngredients.querySelectorAll("filter-ingredients--item");

    inputBox.onkeyup = (key) =>{
        let userData = key.target.value;
        let emptyArray = [];
        if(userData){
            emptyArray = totalIngredients.filter((data)=>{
                return data.toLowerCase().includes(userData.toLowerCase());
            });
            emptyArray = emptyArray.map((data)=>{
                return data = '<li>'+ data +'</li>';
            });
            suggBoxtBox.style.display='flex';
        }else{

        }
        
        emptyArray = new Set(emptyArray);
        emptyArray = Array.from(emptyArray);
        
        showSuggestions(emptyArray);
    }

    function showSuggestions(list){
        let listData;
        if(!list.length){
            suggBoxtBox.style.display='none';
        }else{
            listData = list.join('');
        }
        suggBoxtBox.innerHTML= listData;
        chooseSuggestion();
    }

    
    let displayedIngredients = [];

    function chooseSuggestion(){
        let IngredientLists = suggBoxtBox.querySelectorAll("li");

        IngredientLists.forEach(element => {
            element.addEventListener("click", (li) =>{
                let ingredientChoosen = li.target.textContent;

                displayedIngredients.push(ingredientChoosen);

                displayedIngredients = new Set(displayedIngredients);
                displayedIngredients = Array.from(displayedIngredients);

                showIngredientsTag(displayedIngredients);
            })
        });
    }
    
    function showIngredientsTag(Ingredients){
        DOMfiltersIngredients.innerHTML ="";
        
        console.log(Ingredients);

        Ingredients.forEach(element => {
            DOMfiltersIngredients.innerHTML +=`<div class="filter-ingredients--item"><p>${element}</p><img src="img/cross.svg" alt=""></div>`;
            deleteIngredientTag();
        });
        console.log(displayedIngredients);
        filteringSearchbar(displayedIngredients);
        return displayedIngredients;
    }

    function deleteIngredientTag(){
        DOMingredientsChoosen = DOMfiltersIngredients.querySelectorAll(".filter-ingredients--item");

        DOMingredientsChoosen.forEach(ingredient => {
            let DOMdeleteIngredient = ingredient.querySelector("img");

            DOMdeleteIngredient.addEventListener("click", (ingredient)=>{

                let ingredientParent = ingredient.target.parentNode;
                let ingredientValue = ingredientParent.firstChild.innerHTML;
                
                let ingredientIndex = displayedIngredients.findIndex(element => element == ingredientValue);

                displayedIngredients.splice(ingredientIndex, 1);
                showIngredientsTag(displayedIngredients)
            })
        });
    }
}