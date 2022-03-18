import { triggerNewSearch } from "../main.js";

let IngredientsUniques = [];
let AppliancesUniques = [];
let UstensilsUniques = [];

let keywordList = [];

export function opendropdown(e){
    let dropdown = document.querySelector(`.filter-container[data-name='${e.dataset.name}']`)
    const suggBox = dropdown.querySelector('.autocom-box');
    suggBox.classList.add("open");
    //ajout de l'event de fermeture
    suggBox.parentNode.addEventListener("mouseleave",(e)=>{
        closedropdown(e.target);
    })
}

export function closedropdown(e){
    const suggBox = e.querySelector('.autocom-box');
    suggBox.classList.remove("open");
}

export function createDropdownsContent(suggBox){
    let keywordsContainer = suggBox.querySelector("ul");    
    keywordsContainer.innerHTML ='';

    if(suggBox.dataset.name === "ingredients"){
        IngredientsUniques = [];
        window.currentRecipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                if(IngredientsUniques.includes(ingredient.ingredient)){}
                else{
                    let type = ingredient.ingredient;
                    let category = "ingredients";
                    createKeyword(type, category, keywordsContainer);
                    IngredientsUniques.push(ingredient.ingredient);
                }
                
            });
        })
    }else if(suggBox.dataset.name === "ustensils"){
        UstensilsUniques = [];
        window.currentRecipes.forEach(recipe => {
            recipe.ustensils.forEach(ustensils => {
                if(UstensilsUniques.includes(ustensils)){}
                else{
                    let type = ustensils;
                    let category = "ustensils";
                    createKeyword(type, category, keywordsContainer);
                    UstensilsUniques.push(ustensils);
                }
            });
        })
    AppliancesUniques = [];
    }else if(suggBox.dataset.name === "appliances"){
        AppliancesUniques = [];
        window.currentRecipes.forEach(recipe => {
            if(AppliancesUniques.includes(recipe.appliance)){}
            else{
                let type = recipe.appliance;
                let category = "appliance";
                createKeyword(type, category, keywordsContainer);
                AppliancesUniques.push(type);
            }
        })
    }

    
}
function createKeyword(type, category, keywordsContainer){

    const tag = document.createElement("li");
    tag.setAttribute("data-name",category);
    tag.append(document.createTextNode(type));
    tag.addEventListener("click", (e) => {selectNewTag(e)});
    keywordsContainer.append(tag);
}

function selectNewTag(e){
    
    let filtersSelectedContainer = document.querySelector(`.filters-selected`);
    while (filtersSelectedContainer.firstChild) {
        filtersSelectedContainer.removeChild(filtersSelectedContainer.firstChild);
    };


    if (keywordList.filter((k)=>{ return k.keyword === `${e.target.innerHTML}`}).length > 0) {
    }else{
        keywordList.push({keyword:e.target.innerHTML,category:e.target.dataset.name});
    }


    keywordList.forEach(keyword =>{
        const tag = document.createElement("div");
        const cross = document.createElement("img");

        tag.classList.add(`filter-${keyword.category}--item`);
        tag.setAttribute("data-name",`${keyword.keyword}`)
        cross.setAttribute("src","img/cross.svg");
        cross.addEventListener("click",(e) => {deleteKeyword(e)});
        
        tag.append(document.createTextNode(keyword.keyword));
        tag.append(cross);
        filtersSelectedContainer.append(tag);
    })
    triggerNewSearch(keywordList);
}

function deleteKeyword(e){

    let keywordDOM = e.target.parentNode;
    if (keywordList.length >1) {
        let indexOfKeyword = keywordList.findIndex(keyword => keyword.keyword === keywordDOM.dataset.name);
        keywordList.splice(indexOfKeyword,1);
    }else{
        keywordList = [];
    }

    keywordDOM.remove();
    triggerNewSearch(keywordList);;
}

export function filterdropdown(e){
    let dropdownName = e.dataset.name;
    let data = e.value
    let dropdown = document.querySelector(`.autocom-box[data-name="${dropdownName}"`);
    let dropdownContainer = dropdown.querySelector(".ul-container")

    let filteredKeywords;

    if (data.length) {
        if (dropdownName == "ingredients") {
            filteredKeywords = IngredientsUniques.filter(key => key.includes(data));
        }else if (dropdownName == "ustensils") {
            filteredKeywords = UstensilsUniques.filter(key => key.includes(data));
        }else if (dropdownName == "appliances") {
            filteredKeywords = AppliancesUniques.filter(key => key.includes(data));
        }
        while (dropdownContainer.firstChild) {
            dropdownContainer.removeChild(dropdownContainer.firstChild);
        };
    }else{
        if (dropdownName == "ingredients") {
            filteredKeywords = IngredientsUniques
        }else if (dropdownName == "ustensils") {
            filteredKeywords = UstensilsUniques
        }else if (dropdownName == "appliances") {
            filteredKeywords = AppliancesUniques
        }
        while (dropdownContainer.firstChild) {
            dropdownContainer.removeChild(dropdownContainer.firstChild);
        };
    }

    filteredKeywords.forEach(keyword => createKeyword(keyword,dropdownName,dropdownContainer))
}