import {recipes} from './recipes.js';

export class Card{
    constructor(container){
        this.container = container;
    }
    createCard(recipe){

        const cardContainer = document.createElement("article");
        const cardFig = document.createElement("figure");
        const cardImg = document.createElement("img");
        const cardCaption = document.createElement("figcaption");

        const firstRow = document.createElement("div");
        const recipeTitle = document.createElement("p")
        const recipeTimeClock = document.createElement("div");
        const recipeTime = document.createElement("p")
        const recipeClock = document.createElement("img")
        const secondRow = document.createElement("div")
        const recipeIngredients = document.createElement("ul")
        const recipeDescription = document.createElement("p")

        cardContainer.classList.add("recette");
        firstRow.classList.add("row");
        secondRow.classList.add("row");
        recipeTitle.classList.add("recepeTitle");
        recipeTimeClock.classList.add("time");
        recipeIngredients.classList.add("ingredients");
        recipeDescription.classList.add("recepeDescription");

        recipeTitle.appendChild(document.createTextNode(recipe.name));
        recipeTime.appendChild(document.createTextNode(`${recipe.time} min`));
        recipeClock.setAttribute("src","img/Vector.svg");
        recipeClock.setAttribute("alt","Time clock pictogram");

        const ingredients = recipe.ingredients;

        let ingredientName;
        let ingredientQty;
        let ingredientUnit;

        ingredients.forEach(ingredient => {
            ingredientName = ingredient.ingredient;
            ingredientQty = ingredient.quantity;
            ingredientUnit = ingredient.unit;
            let ingredientLine = document.createElement('li');
            let ingredientStrong = document.createElement('strong');

            ingredientStrong.appendChild(document.createTextNode(ingredientName));

            if(ingredientQty === undefined){
                ingredientQty = "";
            }else{
                ingredientQty = " : "+ ingredientQty;
            };

            if (ingredientUnit === undefined) {
                ingredientUnit = "";
                ingredientLine.append(ingredientStrong);
                ingredientLine.append(document.createTextNode(ingredientQty))
            }else{
                ingredientLine.append(ingredientStrong);
                ingredientLine.append(document.createTextNode(ingredientQty))            }

            recipeIngredients.append(ingredientLine)
        });

        recipeDescription.appendChild(document.createTextNode(recipe.description));

        secondRow.append(recipeIngredients, recipeDescription)

        firstRow.append(recipeTitle, recipeTimeClock);
        recipeTimeClock.append(recipeClock, recipeTime);

        cardCaption.append(firstRow, secondRow);
        cardFig.append(cardImg, cardCaption);
        cardContainer.append(cardFig);
        this.container.append(cardContainer);
    }
    removeAllCards(){
        while (this.container.firstChild) {
            let cardRestante = this.container.firstChild;
            cardRestante.remove();
        }
    }
    createNewCards(result){
        result.forEach(recette => {
            this.createCard(recette);
        });
    }
}