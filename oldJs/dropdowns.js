
export class DropDowns {
    constructor(container, content, dropdownName) {
        this.container = container;
        this.content = content;
        this.dropdownName = dropdownName
        this.savedTags = [];
        this.callTaglist = [];
    }

    createDropdown(dropdownName) {
        const dropdown = document.createElement("div");
        const dropdownForm = document.createElement("form");
        const dropdownInput = document.createElement("input");
        const dropdownArrow = document.createElement("div");

        dropdown.classList.add("filter-container");
        dropdown.classList.add(`${dropdownName}`);
        dropdownInput.setAttribute("type", "text");
        dropdownInput.classList.add("dropdown-input")
        dropdownArrow.classList.add("icon");
        dropdownArrow.append(document.createTextNode("⌵"))
        if (dropdownName === 'ingredients') {
            dropdown.classList.add("blue");
            dropdownInput.setAttribute("placeholder", "Ingrédients")
        } else if (dropdownName === 'appareils') {
            dropdown.classList.add("green");
            dropdownInput.setAttribute("placeholder", "Appareils")
        } else if (dropdownName === 'ustensiles') {
            dropdown.classList.add("red");
            dropdownInput.setAttribute("placeholder", "Ustensiles")
        }

        dropdownForm.append(dropdownInput, dropdownArrow);
        dropdown.append(dropdownForm);
        this.container.appendChild(dropdown);
        this.createDropdownContent(dropdown, dropdownName)

        dropdown.addEventListener("click", () => {
            this.openDropdown(dropdown)
        })
        dropdown.addEventListener("mouseleave", () => {
            this.closeDropdown(dropdown)
        })
    }

    createDropdownContent(dropdown, dropdownName) {
        const tagList = this.content;
        const tagContainer = document.createElement("ul");

        const suggBox = document.createElement("div");
        suggBox.classList.add("autocom-box");
        tagContainer.classList.add("ul-container");
        if (dropdownName === 'ingredients') {
            suggBox.classList.add("blue");
        } else if (dropdownName === 'appareils') {
            suggBox.classList.add("green");
        } else if (dropdownName === 'ustensiles') {
            suggBox.classList.add("red");
        };
        tagList.forEach(Tag => {
            this.createContentTagDOM(Tag, tagContainer);
        });
        suggBox.append(tagContainer);
        dropdown.appendChild(suggBox);
    }

    createContentTagDOM(Tag, tagContainer) {
        const tag = document.createElement("li");
        tag.append(document.createTextNode(Tag));
        tagContainer.append(tag)

        tag.addEventListener("click", (element) => {
            let category = tagContainer.parentNode.parentNode.classList[1];
            console.log(category);
            console.log(this.callTaglist);
            this.callTaglist.forEach(cb => cb(element.target.innerHTML,category));
        })
    }

    openDropdown(dropdown) {
        const suggBox = dropdown.querySelector('.autocom-box');
        suggBox.classList.add("open")
    }
    closeDropdown(dropdown) {
        const suggBox = dropdown.querySelector('.autocom-box');
        suggBox.classList.remove("open")
    }

    onUserInterract(categoriesList) {
        let dropdownsInputs = [...document.querySelectorAll(".dropdown-input")];
        dropdownsInputs.forEach( dropdownInput => {
            dropdownInput.addEventListener("keyup",(input) => {
                let dataUser = dropdownInput.value;
                if( dataUser.length > 2){
                    let parent = dropdownInput.parentNode;
                    console.log(this.content);
                    console.log("---------------");
                }
            })
        })
        // let dropdownsInput = document.querySelectorAll(".dropdown-input");
        // 
    }

    setTags(recette) {
        let DOMDropDown = document.querySelector(`.filter-container.${this.dropdownName}`);
        let ulContainer = DOMDropDown.querySelector(".ul-container");
        while (ulContainer.firstChild) {
            ulContainer.removeChild(ulContainer.firstChild);
        }
        recette.forEach(tag => {
            this.createContentTagDOM(tag, ulContainer);
        });

    }
    resetTags() {
        let dropdowns = document.querySelector(".filters");
        while (dropdowns.firstChild) {
            dropdowns.removeChild(dropdowns.firstChild);
        };

        dropdowns = document.querySelector(".filters");
        for (let list in this.savedTags) {
            const categoryTags = this.savedTags[list];
            const dropdownName = list;
            this.content = categoryTags;

            this.createDropdown(list);
        }
    }
    saveData(categoriesList) {
        this.savedTags = categoriesList;
    }
    calltaglist(cb) {
        this.callTaglist.push(cb);
    }
}