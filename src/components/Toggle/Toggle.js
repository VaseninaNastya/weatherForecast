import create from "../../utils/create.utils.js";
import s from "./Toggle.module.scss";

class Toggle {
  constructor(innerTextArr, selectedItem) {
    this.innerTextFirstItem = innerTextArr[0];
    this.innerTextSecondtItem = innerTextArr[1];
    this.selectedItem = selectedItem;
  }
  generateLayout() {
    this.toggleContainer = create("div", s.toggle_container, [
      create("div", s.toggle_item, this.innerTextFirstItem),
      create("div", s.toggle_item, this.innerTextSecondtItem),
    ]);
    this.togglerContainerEventListener();
    return this.toggleContainer;
  }
  togglerContainerEventListener() {
    this.toggleContainer.addEventListener('click',(e) => {
      console.log(e.target);
    });
  }
}


export default Toggle;
