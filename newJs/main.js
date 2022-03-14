import { recipes } from "../oldJs/recipes.js";
import * as dropdown from "./dropdowns/base.js";

const dropdowns =  document.querySelectorAll(".filter-container");
const ingredientDropdown = document.querySelector(".filter-container.ingredients");
const ustensilstDropdown = document.querySelector(".filter-container.ustensils");
const appliancesDropdown = document.querySelector(".filter-container.appliances");
const ingredientInput = ingredientDropdown.querySelector("input");
const ustensilstInput = ustensilstDropdown.querySelector("input");
const appliancesInput = appliancesDropdown.querySelector("input");
let currentIngredientsKeywords = null;
let currentUstensilsKeywords = null;
let currentAppliancesKeywords = null;
const main = document.querySelector("main");
let dataSearchBar = [];
let keywordList = [];

const suggBox = document.querySelector(".filters").querySelectorAll('.autocom-box');
window.currentRecipes = recipes;


suggBox.forEach((suggBox)=> dropdown.createDropdownsContent(suggBox));


onload();
function onload(){
    displayRecipes(recipes)
}
//Evènements inputs
document.querySelector("#search-input").addEventListener("input",(e)=>{
    
    if (e.target.value.length > 2) {
        dataSearchBar = e.target.value;
    }else{
        dataSearchBar = [];
    }

    newSearch()
})


ingredientDropdown.addEventListener("click",(e)=>{
    dropdown.opendropdown(e.target);
})
ustensilstDropdown.addEventListener("click",(e)=>{
    dropdown.opendropdown(e.target);
})
appliancesDropdown.addEventListener("click",(e)=>{
    dropdown.opendropdown(e.target);
})

ingredientDropdown.addEventListener("keyup",(e)=>{
    dropdown.filterdropdown(e.target);
})
ustensilstDropdown.addEventListener("keyup",(e)=>{
    dropdown.filterdropdown(e.target);
})
appliancesDropdown.addEventListener("keyup",(e)=>{
    dropdown.filterdropdown(e.target);
})


function newSearch(){
    const filteredRecipes = filterRecipes(recipes,dataSearchBar,keywordList);

    if (filteredRecipes.length!==0){
        displayRecipes(filteredRecipes)
    }else{
        displayNoRecipes();
    }
    suggBox.forEach((suggBox)=> dropdown.createDropdownsContent(suggBox));
}

function filterRecipes(){
    let filteredRecipes = [];
    if( dataSearchBar.length){
        recipes.forEach(recipe => {
            let recipeIngredients = [];
            recipe.ingredients.forEach( ingredient => {
                recipeIngredients.push(ingredient.ingredient.toLowerCase());
            })

            if (recipeIngredients.includes(dataSearchBar.toLowerCase())
            || recipe.name.toLowerCase().includes(dataSearchBar.toLowerCase()) 
            || recipe.description.toLowerCase().includes(dataSearchBar.toLowerCase())) {
                filteredRecipes.push(recipe);
                window.currentRecipes = filteredRecipes;
            }
        })
        if (keywordList.length) {
            let keywordListReduced = [];
            filteredRecipes = [];
            keywordList.forEach(keyword => {keywordListReduced.push(keyword.keyword.toLowerCase())});

            console.log(window.currentRecipes);
            window.currentRecipes.forEach(recipe => {
                let recipeIngredients = [];
                recipe.ingredients.forEach( ingredient => {
                    recipeIngredients.push(ingredient.ingredient.toLowerCase());
                })
                let recipeUstensils = [];
                recipe.ustensils.forEach(ustensils => {
                    recipeUstensils.push(ustensils.toLowerCase());
                })

                let testIngredient = recipeIngredients.some(r=> keywordListReduced.indexOf(r) >= 0);
                let testUstensils = recipeUstensils.some(r=> keywordListReduced.indexOf(r) >= 0);
                let testAppliance = keywordListReduced.includes(recipe.appliance.toLowerCase());
                console.log(testAppliance);
                if (testIngredient || testUstensils || testAppliance){
                    filteredRecipes.push(recipe);
                }
            })
        }
    }else if(!dataSearchBar.length && !keywordList.length){
        filteredRecipes = recipes;
    }else if (keywordList.length == 0) {
        console.log("true");
        filteredRecipes = recipes;
    }else{
        let keywordListReduced = [];
        keywordList.forEach(keyword => {keywordListReduced.push(keyword.keyword.toLowerCase())});

        recipes.forEach(recipe => {
            let recipeIngredients = [];
            recipe.ingredients.forEach( ingredient => {
                recipeIngredients.push(ingredient.ingredient.toLowerCase());
            })
            let recipeUstensils = [];
            recipe.ustensils.forEach(ustensils => {
                recipeUstensils.push(ustensils.toLowerCase());
            })

            let testIngredient = recipeIngredients.some(r=> keywordListReduced.indexOf(r) >= 0);
            let testUstensils = recipeUstensils.some(r=> keywordListReduced.indexOf(r) >= 0);
            let testAppliance = keywordListReduced.includes(recipe.appliance.toLowerCase());
            if (testIngredient || testUstensils || testAppliance){
                filteredRecipes.push(recipe);
            }
        })
    }
    window.currentRecipes = filteredRecipes;
    return filteredRecipes;
}

function displayRecipes(filteredRecipes){
    main.innerHTML='';
    let recipeCard;
    
    filteredRecipes.forEach(recipe =>{
        let recipeIngredients = [];

        const ingredients = recipe.ingredients;

        let ingredientName;
        let ingredientQty;
        let ingredientUnit;

        ingredients.forEach(ingredient => {
            ingredientName = ingredient.ingredient;
            ingredientQty = ingredient.quantity;
            ingredientUnit = ingredient.unit;
            let ingredientLine;

            if(ingredientQty === undefined){
                ingredientQty = "";
            }else{
                ingredientQty = " : "+ ingredientQty;
            };

            if (ingredientUnit === undefined) {
                ingredientUnit = "";
                ingredientLine = `<li><strong>${ingredientName}${ingredientQty}</strong></li>`
            }else{
                ingredientLine = `<li><strong>${ingredientName}${ingredientQty}${ingredientUnit}</strong></li>`
            }
            recipeIngredients += (ingredientLine);
        });
        recipeCard = `
        <article class="recette">
                <figure>
                    <img>
                    <figcaption>
                        <div class="row">
                            <p class="recepeTitle">${recipe.name}</p>
                            <div class="time">
                                <img src="img/vector.svg" alt="Time clock pictogram">
                                <p>${recipe.time} min</p>
                            </div>
                        </div>
                        <div class="row">
                            <ul class="ingredients">${recipeIngredients}</ul>
                            <p class="recepeDescription">${recipe.description}</p>
                        </div>
                    </figcaption>
                </figure>
            </article>
        `
        main.innerHTML += recipeCard;
    })
}

export function triggerNewSearch(keywordListFresh){
    keywordList = keywordListFresh;
    newSearch();
}

function displayNoRecipes(){
    console.log("no recipes");
    const main = document.querySelector("main");
    while (main.firstChild) {
        main.removeChild(main.firstChild);
    };
    main.innerHTML = "<h2 style='text-align:center;'> Acunes recettes trouvées, vous pouvez essayer : Coco, Thon etc ... </h2>"
}