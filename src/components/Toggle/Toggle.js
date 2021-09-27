import create from "../../utils/create.utils.js";
import s from "./Toggle.module.scss";

class Toggle {
  constructor(innerTextArr, selectedItem, localStorageKey, containerClass ) {
    this.innerTextFirstItem = innerTextArr[0];
    this.innerTextSecondtItem = innerTextArr[1];
    this.selectedItem = selectedItem;
    this.localStorageKey = localStorageKey;
    this.containerClass = containerClass
  }
  generateLayout() {
    const firstItem = create("div", s.toggle_item, this.innerTextFirstItem, null, ["data-value", 0]);
    const secondtItem = create("div", s.toggle_item, this.innerTextSecondtItem,  null, ["data-value", 1]);
    if(this.selectedItem === "0"){
      firstItem.classList.add("toggle_item_selected")
    } else {
      secondtItem.classList.add("toggle_item_selected")
    }
    this.toggleContainer = create("div", s.toggle_container, [
      firstItem,
      secondtItem,
    ]);
    this.toggleContainer.classList.add(this.containerClass )
    this.togglerContainerEventListener();
    return this.toggleContainer;
  }
  togglerContainerEventListener() {
  
    this.toggleContainer.addEventListener('click',({currentTarget, target }) => {
      if(currentTarget.querySelector('.toggle_item')){
        currentTarget.querySelector('.toggle_item_selected').classList.remove("toggle_item_selected")
        target.classList.add("toggle_item_selected")
        localStorage.setItem(this.localStorageKey, target.getAttribute("data-value"))
      }
    });
  }
}


export default Toggle;
