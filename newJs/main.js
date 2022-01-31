import { Card } from './card.js';
import { DropDowns } from './dropdowns.js';
import { recipes } from './recipes.js';

const main = document.querySelector("main");
const dropdowns = document.querySelector(".filters");

let ingredientsList = [];
let ustensilsList = [];
let appliancesList = [];

onload();

function getIngredients(){
     // Récupération de la liste des ingrédients totaux
     recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientsList.push(ingredient.ingredient));
    });
    // On supprime les doublons
    ingredientsList = new Set(ingredientsList);
    return ingredientsList;
}

function getUstensils(){
    // Récupération de la liste des ingrédients totaux
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => ustensilsList.push(ustensil));
   });
   // On supprime les doublons
   ustensilsList = new Set(ustensilsList);
   return ustensilsList;
}

function getAppliances(){
    // Récupération de la liste des ingrédients totaux
    recipes.forEach(recipe => {
        appliancesList.push(recipe.appliance);
   });
   // On supprime les doublons
   appliancesList = new Set(appliancesList);
   return appliancesList;
}
function onload(){
    const AppliancesListing = getAppliances();
    const UstensilsListing = getUstensils();
    const IngredientsListing = getIngredients();

    let DataArray = new Map();

    DataArray.set('Ingredients', IngredientsListing);
    DataArray.set('Ustensils', UstensilsListing);
    DataArray.set('Appliance', AppliancesListing);

    DataArray = Array.from(DataArray);

    DataArray.forEach(category =>{
        const dropdown = new DropDowns(dropdowns, category);
        dropdown.createDropdown(category[0]);
    })


    const card = new Card;
    recipes.forEach(recipe => {card.createCard(recipe,main)});
}