import {recipes} from "./recipes.js";

export function suggBox(){
    const searchBar = document.querySelector('#search-bar-container');
    const searchBarInput = searchBar.querySelector('input');
    
    const suggBoxtBox = searchBar.querySelector('.autocom-box')
    
    
    searchBarInput.onkeyup = (key) =>{
        let userData = key.target.value;
        let emptyArray = [];
    
        if(userData){
            emptyArray = recipes.filter((data)=>{
                return data.toLowerCase().includes(userData.toLowerCase());
            });
            emptyArray = emptyArray.map((data)=>{
                return data = '<li>'+ data +'</li>';
            });
            suggBoxtBox.style.display='flex';
        }else{
    
        }
        
        emptyArray = new Set(emptyArray);
        emptyArray = Array.from(emptyArray);
        
        showSuggestions(emptyArray);
    }
    function showSuggestions(list){
        let listData;
        if(!list.length){
            suggBoxtBox.style.display='none';
        }else{
            listData = list.join('');
        }
        suggBoxtBox.innerHTML= listData;
    }
}
