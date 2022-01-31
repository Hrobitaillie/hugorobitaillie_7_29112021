export class Search{
    constructor(){
        this.searchValuelue;
    }
    
    gettingUserData(){
        let searchbar = document.querySelector("#search-bar--input");
        console.log(searchbar);
        searchbar.addEventListener("keyup",(searchbar) => {
            //récupération de la valeur entrée dans par le user dans la searchbar
            let dataUser = searchbar.target.value;
            // on continue le filtrage, seulement si le champ rentré est supperieur a 2 caractères
            // sinon on affiche toutes les recettes
            console.log(dataUser);
            if (dataUser.length > 2){
                // on met la valeur de la searchbar en minuscule
                searchValue = dataUser.toLowerCase()
                // on exécute la fonction de filtrage de la searchbar
            }else{
               
            }
        });

    }
}