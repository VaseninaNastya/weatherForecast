import create from "../../utils/create.utils.js";
import s from "./MainBlock.module.scss";
import PictureAPI from "./../PictureAPI/PictureAPI";
import WeatherForTodayBlock from "../WeatherForTodayBlock/WeatherForTodayBlock.js"
import ControlBlock from "../ControlBlock/ControlBlock.js"
import wordsEn from "../../utils/wordsEn.utils";
import wordsRu from "../../utils/wordsRu.utils";

class MainBlock {
  constructor(){
    this.wordsData = [wordsRu,wordsEn]
    this.selectedLanguage = localStorage.getItem('weatherForecast_language') || 0
  }
  async generateLayout() {
    await this.getData();
    const controlBlock = new ControlBlock(this.selectedLanguage, this.wordsData[this.selectedLanguage]);
    const controlBlocklElem = controlBlock.generateLayout()
    const weatherForTodayBlock = new WeatherForTodayBlock(this.selectedLanguage, this.wordsData[this.selectedLanguage])
    const weatherForToday = await weatherForTodayBlock.generateLayout()
    const mainContainer = create("div", s.wpapper, create("div", s.container, [controlBlocklElem, weatherForToday]));

    if(this.pictureData && this.pictureData.urls && this.pictureData.urls.full){
      const backGroundImg = this.pictureData.urls.full 
      mainContainer.setAttribute('style' , "background-image: url(" + `${backGroundImg}` + ")")
    }

    return mainContainer;
  }
  async getData() {
    const pictureAPI = new PictureAPI();
    this.pictureData =   await pictureAPI.getPicture();
    
  }
  /*generateWordsData(){
    return [wordsRu,wordsEn]
}*/

}
export default MainBlock;
