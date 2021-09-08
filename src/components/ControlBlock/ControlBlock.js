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
      const languageToggle = new Toggle([this.wordsData.ru, this.wordsData.en], this.selectedLanguage, "weatherForecast_language");
      return languageToggle.generateLayout()
  }
  getLanguage() {
    return this.selectedLanguage;
  }
  getUnits() {
    return this.units;
  }
}
export default ControlBlock;
