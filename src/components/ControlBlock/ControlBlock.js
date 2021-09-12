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
    const languageToggle = new Toggle([this.wordsData.ru, this.wordsData.en], this.selectedLanguage, "weatherForecast_language",  "toggle_container_lang"),
    tempToggle = new Toggle([this.wordsData.F, this.wordsData.C],  this.selectedTemp, "weatherForecast_temp" ,  "toggle_container_temp"),
    togglesContainer = create('div','buttons_container', [languageToggle.generateLayout(), tempToggle.generateLayout(), this.createChangeBackgroundButton() ]),
    title = create('h1', null, "Weather forecast"),
    controlBlockElem = [togglesContainer, title, this.createSearchCityInput() ]
    
    return controlBlockElem
  }
  createChangeBackgroundButton(){
    const buttonElem = create("button", s.changeBackgroundButton, this.wordsData.changeBack)
        return buttonElem
    }
    createSearchCityInput(){

      const searchCityInputContainer = create('div',s.searchCityInput_container, [
        create('span', null, this.wordsData.findAСity),
        create('input', s.searchCityInput)
      ])
      return searchCityInputContainer


      
    }
}
export default ControlBlock;
