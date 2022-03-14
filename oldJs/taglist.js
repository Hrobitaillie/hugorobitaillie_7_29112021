export class TagList{
    constructor(taglistContainer){
        this.container = taglistContainer;
        this.callbacks = [];
        this.keywords = [];
    }
    createChoosenTag(keyword, category){
        console.log(category);
        const domTagContainer = document.querySelector(`.filters-${category}`);
        if(this.keywords.includes(keyword)){
        }else{
            this.keywords.push(keyword);
            const tag = document.createElement("div");
            const closeCross = document.createElement("img");
            closeCross.setAttribute("src","img/cross.svg");
            tag.append(document.createTextNode(keyword));
            tag.classList.add(`filter-${category}--item`);
            tag.setAttribute("data-name",`${keyword}`)
            tag.append(closeCross);
            domTagContainer.append(tag);
            console.log(this.callbacks );
            this.executeCallbacks();

            closeCross.addEventListener("click",(e)=>{
                this.deleteChoosenTag(e);
                
            })
        }
    }
    deleteChoosenTag(e){
        console.log("Keylist = "+ this.keywords);
        console.log(e.target.parentNode.dataset.name);
        let tag =  e.target.parentNode;
        tag.remove();
        
        let tagData= e.target.parentNode.dataset.name
        for( var i = 0; i < this.keywords.length; i++){ 
        
            if ( this.keywords[i] === tagData) { 
        
                this.keywords.splice(i, 1); 
            }
        
        }
        console.log("Keylist = "+ this.keywords);
        this.executeCallbacks();
    }
    onNewTag(cb){
        this.callbacks.push(cb);
    }
    executeCallbacks(){
        this.callbacks.forEach(cb => cb(this.keywords));
    }
}