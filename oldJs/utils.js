import { DropDowns } from "./dropdowns.js";


function getIngredients(recipes){
    let ingredientsList = [];
    // Récupération de la liste des ingrédients totaux
    recipes.forEach(recipe => {
        recipe.ingredients.forEach(ingredient => ingredientsList.push(ingredient.ingredient));
    });
    // On supprime les doublons
    ingredientsList = new Set(ingredientsList);
    return ingredientsList;
}

function getUstensils(recipes){
    let ustensilsList = [];
    // Récupération de la liste des ingrédients totaux
    recipes.forEach(recipe => {
        recipe.ustensils.forEach(ustensil => ustensilsList.push(ustensil));
    });
    // On supprime les doublons
    ustensilsList = new Set(ustensilsList);
    return ustensilsList;
}

function getAppliances(recipes){
    let appliancesList = [];
   // Récupération de la liste des ingrédients totaux
   recipes.forEach(recipe => {
       appliancesList.push(recipe.appliance);
  });
  // On supprime les doublons
  appliancesList = new Set(appliancesList);
  return appliancesList;
}

export function getDataList(recipes){
    const AppliancesListing = getAppliances(recipes);
    const UstensilsListing = getUstensils(recipes);
    const IngredientsListing = getIngredients(recipes);

    const DataArray = {
        ingredients : IngredientsListing,
        appareils : AppliancesListing,
        ustensiles : UstensilsListing,
    };

    return DataArray
}

export function filterTags(dropdown){
    console.log("test");
    dropdown.onUserInterract();
}


export function updateWithNewResult(result,dropdown){
    const newList = getDataList(result);
    for (let [key, value] of Object.entries(newList)) {
        if(key === dropdown.dropdownName){
            dropdown.setTags(value, dropdown);
        }
    }
}



