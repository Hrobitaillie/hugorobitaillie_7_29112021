export class DropDowns{
    constructor(container, content){
        this.container = container;
        this.content = content;
    }
    createDropdown(dropdownName){
        const dropdown = document.createElement("div");
        const dropdownForm = document.createElement("form");
        const dropdownInput = document.createElement("input");
        const dropdownArrow = document.createElement("div");

        dropdown.classList.add("filter-container");
        dropdownInput.setAttribute("type","text");
        dropdownArrow.classList.add("icon");
        dropdownArrow.append(document.createTextNode("⌵"))

        if(dropdownName === 'Ingredients'){
            dropdown.classList.add("blue");
            dropdownInput.setAttribute("placeholder","Ingrédients")
        }else if(dropdownName === 'Ustensils'){
            dropdown.classList.add("green");
            dropdownInput.setAttribute("placeholder","Ustensiles")
        }else if(dropdownName === 'Appliance'){
            dropdown.classList.add("red");
            dropdownInput.setAttribute("placeholder","Appareils")
        }
        
        dropdownForm.append(dropdownInput, dropdownArrow);
        dropdown.append(dropdownForm);
        this.container.appendChild(dropdown);

        this.createDropdownContent(dropdown,dropdownName)

        dropdown.addEventListener("click", ()=>{
            this.openDropdown(dropdown)
        })
        dropdown.addEventListener("mouseleave", (position)=>{
            this.closeDropdown(dropdown)
        })
    }
    createDropdownContent(dropdown, dropdownName){
        const tagList = this.content[1];
        const tagContainer = document.createElement("ul");

        const suggBox = document.createElement("div");
        suggBox.classList.add("autocom-box");
        if(dropdownName === 'Ingredients'){
            suggBox.classList.add("blue");
        }else if(dropdownName === 'Ustensils'){
            suggBox.classList.add("green");
        }else if(dropdownName === 'Appliance'){
            suggBox.classList.add("red");
        };

        tagList.forEach(Tag => {
            this.createContentTagDOM(Tag, tagContainer);
        });
        suggBox.append(tagContainer);
        dropdown.appendChild(suggBox);
    }

    createContentTagDOM(Tag,tagContainer){
        const tag = document.createElement("li");
        tag.append(document.createTextNode(Tag));
        tagContainer.append(tag)
    }

    openDropdown(dropdown){
        const suggBox = dropdown.querySelector('.autocom-box');
        suggBox.classList.add("open")
    }
    closeDropdown(dropdown){
        const suggBox = dropdown.querySelector('.autocom-box');
        suggBox.classList.remove("open")
    }
}