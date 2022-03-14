export class SearchBar{
    // getSearchBar(){
    //     const searchBarInput = document.getElementById("search-bar--input");
    //     return searchBarInput;
    // }

    searchBarOnChange(cb){
        let dataUser;
        const searchBarInput = document.getElementById("search-input");

        searchBarInput.addEventListener("keyup",(searchbar) => {
            //récupération de la valeur entrée dans par le user dans la searchbar
            dataUser = searchbar.target.value;
            // on continue le filtrage, seulement si le champ rentré est supperieur a 2 caractères
            // sinon on affiche toutes les recettes
            cb(dataUser)
        }); 
    }
    keywordOnChange(cb){
        const searchBarInput = document.getElementById("search-bar--input");
        let dataUser = searchBarInput.value;
        cb(dataUser);
    }
}