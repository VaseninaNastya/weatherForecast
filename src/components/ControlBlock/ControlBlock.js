import create from "../../utils/create.utils.js";
import s from "./ControlBlock.module.scss";
import Toggle from "../Toggle/Toggle.js";

class ControlBlock {
  constructor(selectedLanguage, wordsData) {
    this.selectedLanguage = selectedLanguage;
    this.wordsData = wordsData;
    this.units = "°C";
  }
  generateLayout() {
      const languageToggle = new Toggle([this.wordsData.ru, this.wordsData.en], this.selectedLanguage, "weatherForecast_language" );
      let result =languageToggle.generateLayout()
      result.classList.add("toggle_container_lang")
      return result
  }
  getLanguage() {
    return this.selectedLanguage;
  }
  getUnits() {
    return this.units;
  }
}
export default ControlBlock;
