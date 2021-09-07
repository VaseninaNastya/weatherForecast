import create from "../../utils/create.utils.js";
import s from "./MainBlock.module.scss";
import PictureAPI from "./../PictureAPI/PictureAPI";

class MainBlock {
generateLayout() {

    const mainContainer = create("div", s.wpapper);
    return mainContainer;
  }
  async getData() {
    const pictureAPI = new PictureAPI();
    this.pictureData =   await pictureAPI.getPicture();
    console.log('this.pictureData', this.pictureData)
  }
}
export default MainBlock;
