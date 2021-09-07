import create from "../../utils/create.utils.js";
import s from "./MainBlock.module.scss";
import PictureAPI from "./../PictureAPI/PictureAPI";
import WeatherForTodayBlock from "../WeatherForTodayBlock/WeatherForTodayBlock.js"

class MainBlock {
  async generateLayout() {
    await this.getData();
    const weatherForTodayBlock = new WeatherForTodayBlock()
    const weatherForToday = await weatherForTodayBlock.generateLayout()
    const backGroundImg = this.pictureData.urls.full 
    const mainContainer = create("div", s.wpapper, create("div", s.container, weatherForToday), null, ['style' ,"background-image: url(" + `${backGroundImg}` + ")"]);
    return mainContainer;
  }
  async getData() {
    const pictureAPI = new PictureAPI();
    this.pictureData =   await pictureAPI.getPicture();
  }
}
export default MainBlock;
