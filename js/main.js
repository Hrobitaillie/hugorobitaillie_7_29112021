import { createArticles } from "./articlesBuilder.js";
import { gettingDatas } from "./Processing/gettingDatas.js";
import { insertIngredients } from "./Processing/insertFilters.js";

let totalIngredients = [];


gettingDatas(totalIngredients);

insertIngredients(totalIngredients)

createArticles()