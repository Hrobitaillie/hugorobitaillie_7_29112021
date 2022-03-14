import { Card } from "./card.js";
import { DropDowns } from "./dropdowns.js";
import { recipes } from "./recipes.js";

export class Search{
    constructor(main){
        this.callback = [];
        this.secondCallback=[];
        this.result=[];
        this.dataUser;
        this.main = main;
        this.keywordList = [];
        this.newsearch = [];
    }
    setTagList(){
        console.log("Cliqué");
    }
    setKeywordList(keywordList){
        this.keywordList = keywordList;
        this.newsearch.forEach(cb => cb());
    }
    getSearchRecipes(dataUser){
        
        let result = [];
        let resultSearchBar = [];
        let resultKeywords = [];
        let resultKeywordsSearchBar = [];
        
        if (dataUser.length > 2){
            console.log("Data user > 2");
            this.dataUser = dataUser;
            recipes.forEach(recette => {
                let ingredientLowerCase=[];
                let ingredients = recette.ingredients.forEach(element =>{
                    let elementLowerCase = element.ingredient.toLowerCase();
                    ingredientLowerCase.push(elementLowerCase);
                })
                if (recette.name.toLowerCase().includes(dataUser.toLowerCase())||ingredientLowerCase.includes(dataUser.toLowerCase())||recette.description.toLowerCase().includes(dataUser.toLowerCase())) {
                    resultSearchBar.push(recette);
                    result = resultSearchBar;
                    if(this.keywordList !== null){
                        // tagList.forEach( tag => {
                            console.log("recherche avec keywords");
                        console.log(this.keywordList);
                        // });
                    }
                }else{
                }
            });
            this.result=result;
            this.triggerCallbacks()
        }else if(this.keywordList.length != 0){
            console.log(this.keywordList);
            recipes.forEach(recette => {
                let recetteIngredients = [];
                recette.ingredients.forEach( ingredient => {
                    recetteIngredients.push(ingredient.ingredient);
                })
                // || recette.appliance.includes(this.keywordList) || recette.ustensils.includes(this.keywordList)
                if (recetteIngredients.some(i=> this.keywordList.indexOf(i) >= 0)
                    || this.keywordList.includes(recette.appliance) 
                    || recette.ustensils.some(i=> this.keywordList.indexOf(i) >= 0)){
                    resultSearchBar.push(recette);
                    result = resultSearchBar;
                }else{
                }
            });
            this.result=result;
            this.triggerCallbacks()
        }
        else if (dataUser.length < 1) {
            console.log("Data user < 1");
            const card = new Card(this.main);
            card.removeAllCards();
            recipes.forEach(recipe => {card.createCard(recipe)});
            this.secondCallback[0]();
        }
    }
    newSearch(cb){
        this.newsearch.push(cb);
    }
    resetTags(cb){
        this.secondCallback.push(cb);
    }
    ifNewResult(cb){
        this.callback.push(cb);
    }
    triggerCallbacks(){
        this.callback.forEach(cb => cb(this.result));
    }
}