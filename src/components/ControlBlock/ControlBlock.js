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
      const languageToggle = new Toggle([this.wordsData.en, this.wordsData.ru], this.selectedLanguage);
      return languageToggle.generateLayout()
  }
  getLanguage() {
    return this.language;
  }
  getUnits() {
    return this.units;
  }
}
export default ControlBlock;
