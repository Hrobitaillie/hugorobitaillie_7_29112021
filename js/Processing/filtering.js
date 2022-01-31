import { createArticles } from "../articlesBuilder.js";
import {recipes} from "./recipes.js";

//on initialises les variables des tableaux
let arrayStape1;
let filteredArticles;
let Stape1State = false;
let displayedIngredients;
//on comment la fonction de filtrage de la searchbar
export function filteringSearchbar(searchValue){
    //on initrialise le tableau d'étape une (searchbar)
    //si l'utilisateur a rentré une valeur dans la searchbar alors opn filtre les recettes
    //sinon, on passe au filtrage suivant
    if (searchValue){
        arrayStape1= [];
        recipes.forEach(element => {
            //on passe le nom de la recette en minuscule pour ne pas avoir de Case Sensitive
            let name = element.name.toLowerCase();
            //on passe la description de la recette en minuscule pour ne pas avoir de Case Sensitive
            let desc = element.description.toLowerCase();
            //Pour chaque ingrédient, on récupère le nom de l'ingrédient, qu'on passe en minuscule et qu'on
            //enregistre dans un tableau qu'on va comparer par la suite
            let ingredient = element.ingredients;
            let ingredientLowerCase;
            ingredient.forEach(element =>{
                ingredientLowerCase=[];
                let elementLowerCase = element.ingredient.toLowerCase();
                ingredientLowerCase.push(elementLowerCase);
            })

            //on verrifie si au moins, le nom, la description, ou les ingrédients contiennent la valeur
            //entrée par l'utilisateur. Si c'est le cas, on enregistre la recette dans un tableau pour l'étape suivante
            if(name.includes(searchValue)){
                arrayStape1.push(element);
            }else if(desc.includes(searchValue)){
                arrayStape1.push(element);
            }else if(ingredientLowerCase.includes(searchValue)){
                arrayStape1.push(element);
            }
        });
        Stape1State = true;
        filteringIngredients(arrayStape1);
    }else{
        filteringIngredients(arrayStape1);
    }

    //on enregistre le dernier filtrage fait, dans le tableau d'affichage final
    filteredArticles = arrayStape1;
    //on appelle la fontion de création des articles sur la page
    createArticles(filteredArticles);
}

function filteringIngredients(arrayStape1){

    console.log(showIngredientsTag());

    if(displayedIngredients){
        if (Stape1State = true) {
            arrayStape1.forEach(element => {
                let ingredient = element.ingredients;
                console.log(ingredient);
            }); 
        }else{
            console.log("Filtrage dans toutes les recettes");
        }
        
    }else{
        console.log("Pas d'ingrédients choisis");
    }
}