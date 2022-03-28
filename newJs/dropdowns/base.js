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

        for (let i = 0; i < window.currentRecipes.length; i++) {
            let recipe = window.currentRecipes[i];

            for (let j = 0; j < recipe.ingredients.length; j++) {
                let ingredient = recipe.ingredients[j];

                if(IngredientsUniques.includes(ingredient.ingredient)){}
                else{
                    let type = ingredient.ingredient;
                    let category = "ingredients";
                    createKeyword(type, category, keywordsContainer);
                    IngredientsUniques.push(ingredient.ingredient);
                }
            };
        }
    }else if(suggBox.dataset.name === "ustensils"){
        UstensilsUniques = [];

        for (let i = 0; i < window.currentRecipes.length; i++) {
            let recipe = window.currentRecipes[i];

              for (let j = 0; j < recipe.ustensils.length; j++) {
                let ustensils = recipe.ustensils[j];
                if(UstensilsUniques.includes(ustensils)){}
                else{
                    let type = ustensils;
                    let category = "ustensils";
                    createKeyword(type, category, keywordsContainer);
                    UstensilsUniques.push(ustensils);
                }
            };
        }
    AppliancesUniques = [];
    }else if(suggBox.dataset.name === "appliances"){
        AppliancesUniques = [];


         for (let i = 0; i < window.currentRecipes.length; i++) {
            let recipe = window.currentRecipes[i];

            if(AppliancesUniques.includes(recipe.appliance)){}
            else{
                let type = recipe.appliance;
                let category = "appliance";
                createKeyword(type, category, keywordsContainer);
                AppliancesUniques.push(type);
            }
        }
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

    let filteredKeywordsList = [];
    for (let i = 0; i < keywordList.length; i++) {
        const key = keywordList[i];
        if (key.keyword === `${e.target.innerHTML}`) {
            filteredKeywordsList.push(key.keyword);
        }
    }
    if (filteredKeywordsList.length > 0) {
    }else{
        keywordList.push({keyword:e.target.innerHTML,category:e.target.dataset.name});
    }


    for (let i = 0; i < keywordList.length; i++) {
        let keyword = keywordList[i];

        const tag = document.createElement("div");
        const cross = document.createElement("img");

        tag.classList.add(`filter-${keyword.category}--item`);
        tag.setAttribute("data-name",`${keyword.keyword}`)
        cross.setAttribute("src","img/cross.svg");
        cross.addEventListener("click",(e) => {deleteKeyword(e)});
        
        tag.append(document.createTextNode(keyword.keyword));
        tag.append(cross);
        filtersSelectedContainer.append(tag);
    }
    triggerNewSearch(keywordList);
}

function deleteKeyword(e){

    let keywordDOM = e.target.parentNode;
    if (keywordList.length >1) {

        let indexOfKeyword = findIndexOfKeyword(keywordList)

        function findIndexOfKeyword(keywordList){
            for (let i = 0; i < keywordList.length; i++) {
                let keyword = keywordList[i];
                if (keyword.keyword === keywordDOM.dataset.name) {
                    return i;
                }
            }
        }

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

    let filteredKeywords = [];

    if (data.length) {
        if (dropdownName == "ingredients") {
            console.log(IngredientsUniques);

            for (let i = 0; i < IngredientsUniques.length; i++) {
                const key = IngredientsUniques[i];
                if (key.includes(data)) {
                    filteredKeywords.push(key);
                }
            }

        }else if (dropdownName == "ustensils") {
            for (let i = 0; i < UstensilsUniques.length; i++) {
                const key = UstensilsUniques[i];
                if (key.includes(data)) {
                    filteredKeywords.push(key);
                }
            }
        }else if (dropdownName == "appliances") {
            for (let i = 0; i < AppliancesUniques.length; i++) {
                const key = AppliancesUniques[i];
                if (key.includes(data)) {
                    filteredKeywords.push(key);
                }
            }
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

    for (let i = 0; i < filteredKeywords.length; i++) {
        let keyword = filteredKeywords[i];
        createKeyword(keyword,dropdownName,dropdownContainer)
    }
}