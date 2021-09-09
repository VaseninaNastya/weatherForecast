import create from "../../utils/create.utils.js";
import s from "./ControlBlock.module.scss";
import Toggle from "../Toggle/Toggle.js";

class ControlBlock {
  constructor(selectedLanguage, selectedTemp, wordsData) {
    this.selectedLanguage = selectedLanguage;
    this.selectedTemp = selectedTemp;
    this.wordsData = wordsData;
  }
  generateLayout() {
    const languageToggle = new Toggle([this.wordsData.ru, this.wordsData.en], this.selectedLanguage, "weatherForecast_language",  "toggle_container_lang");
    const tempToggle = new Toggle([this.wordsData.F, this.wordsData.C],  this.selectedTemp, "weatherForecast_temp" ,  "toggle_container_temp");
    const controlBlockContainer = create("div", "logicalBlock", [languageToggle.generateLayout(), tempToggle.generateLayout(), this.changeBackgroundButton() ])
    let result = controlBlockContainer
    return result
  }
    changeBackgroundButton(){
        this.buttonElem = create("button", s.changeBackgroundButton, this.wordsData.changeBack)
        return this.buttonElem
    }
}
export default ControlBlock;
