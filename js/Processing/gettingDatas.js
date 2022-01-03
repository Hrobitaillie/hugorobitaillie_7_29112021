import {recipes} from "./recipes.js";

export function gettingDatas(totalIngredients){

    gettingIngredients(totalIngredients)

    function gettingIngredients(totalIngredients){
        // Récupération de la liste des ingrédients totaux
        recipes.forEach(recipe => {
            recipe.ingredients.forEach(ingredient => {
                totalIngredients.push(ingredient.ingredient);
            });
        });

        // On supprime les doublons
        totalIngredients = new Set(totalIngredients);
        totalIngredients = Array.from(totalIngredients);
    }
}
