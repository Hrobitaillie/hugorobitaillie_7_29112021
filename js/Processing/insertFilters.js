export function insertIngredients(totalIngredients){
    const itemsContainer = document.getElementById("select-ingredients--items");
    
    // récupération des éléments
    const searchInput = document.querySelector(".select-labels");
    const inputBox = searchInput.querySelector("input");
    const suggBoxtBox = searchInput.querySelector(".autocom-box");


    inputBox.onkeyup = (key) =>{
        let userData = key.target.value;
        let emptyArray = [];
    
        if(userData){
            emptyArray = totalIngredients.filter((data)=>{
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