import {recipes} from "./Processing/recipes.js";

export let articleBuilder = class articleBuilder{
    constructor(name, id, time, ingredients, description, appliance, ustensils){
    this.name = name;
    this.id = id;
    this.time = time;
    this.ingredients = ingredients;
    this.description = description;
    this.appliance = appliance;
    this.ustensils = ustensils;
    }
};

export function createArticles(){
    recipes.forEach(recipe => {
        let article = new articleBuilder(recipe.name, recipe.id, recipe.time, recipe.ingredients, recipe.description, recipe.appliance, recipe.ustensils)

        let main = document.querySelector("main");

        let ingredients = "";
        article.ingredients.forEach(ingredient => {
            if(ingredient.unit){
                ingredients += `<li><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity} ${ingredient.unit}</li>`
            }else if(ingredient.quantity){
                ingredients += `<li><strong>${ingredient.ingredient}:</strong> ${ingredient.quantity}</li>`
                
            }else {
                ingredients += `<li><strong>${ingredient.ingredient}</strong></li>`
            }
        });

        main.innerHTML +=`
        <article class="recette" 
            data-id = "${article.is}"
            data-appliance = "${article.appliance}"
            data-ustensils = "${article.ustensils}">
                <figure></figure>
                <figcaption>
                    <div class="row">
                        <p class="recepeTitle">${article.name}</p>
                        <div class="time">
                            <img src="img/Vector.svg" alt="pictogram time">
                            <p>${article.time} min</p>
                        </div>
                    </div>
                    <div class="row">
                        <ul class="ingredients">
                            ${ingredients}
                        </ul>
                        <p class="recepeDescription">
                            ${article.description}
                        </p>
                    </div>
                </figcaption>
            </article>
        `
    });
}