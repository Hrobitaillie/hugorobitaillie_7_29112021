import { Card } from './card.js';
import { DropDowns } from './dropdowns.js';
import { recipes } from './recipes.js';
import { Search } from './search.js';
import { SearchBar } from './searchbar.js';
import { TagList } from './taglist.js';
import * as Utils from './utils.js';

const dropdowns = document.querySelector(".filters");
const taglistContainer= document.querySelector(".filters-selected");

onload();

function onload(){
    const main = document.querySelector("main");
    const search = new Search(main);
    const searchBar = new SearchBar();
    const tagList = new TagList(taglistContainer);
    const categoriesList = Utils.getDataList(recipes);

    searchBar.searchBarOnChange(dataUser => search.getSearchRecipes(dataUser));

    for (let list in categoriesList) {
        const categoryTags = categoriesList[list];
        const dropdownName = list;
        const dropdown = new DropDowns(dropdowns, categoryTags, dropdownName);

        dropdown.saveData(categoriesList);
        dropdown.createDropdown(list);
        search.resetTags(callback =>{dropdown.resetTags(dropdowns);});
        search.ifNewResult(result => {Utils.updateWithNewResult(result,dropdown)});
        dropdown.calltaglist((keyword,category) => {tagList.createChoosenTag(keyword, category);});
        
        dropdown.onUserInterract(dropdown);
        if (list == "ustensiles") {
        }
    }
    search.newSearch(() => {searchBar.keywordOnChange(dataUser => search.getSearchRecipes(dataUser))});

    tagList.onNewTag(keywordList => search.setKeywordList(keywordList));
    search.ifNewResult(result => {card.removeAllCards();card.createNewCards(result);})

    const card = new Card(main);
    recipes.forEach(recipe => {card.createCard(recipe)});

}