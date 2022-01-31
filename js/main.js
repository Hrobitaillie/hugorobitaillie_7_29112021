import { createArticles } from "./articlesBuilder.js";
import { gettingDatas } from "./Processing/gettingDatas.js";
import { insertIngredients } from "./Processing/insertFilters.js";
import { searching } from "./Processing/searching.js";

let totalIngredients = [];


gettingDatas(totalIngredients);

insertIngredients(totalIngredients)

createArticles()

searching()