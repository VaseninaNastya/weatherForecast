import create from "../../utils/create.utils.js";
import s from "./MainBlock.module.scss";

class MainBlock {
  generateLayout() {
    const mainContainer = create("div", s.wpapper);
    return mainContainer;
  }
}
export default MainBlock;
