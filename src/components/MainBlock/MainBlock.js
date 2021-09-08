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
    this.selectedLanguage = localStorage.getItem('weatherForecast_language') || 0;
    this.selectedTemp =  localStorage.getItem('weatherForecast_temp') || 0 ;
  }
  async generateLayout() {
    await this.getData();
const container = await this.generateContent()
    const mainContainer = create("div", s.wrapper, container);
    
    if(this.pictureData && this.pictureData.urls && this.pictureData.urls.full){
      const backGroundImg = this.pictureData.urls.full 
      mainContainer.setAttribute('style' , "background-image: url(" + `${backGroundImg}` + ")")
    }
    setTimeout (this.changeLang.bind(this), 100)
    return mainContainer;
  }
  async getData() {
    const pictureAPI = new PictureAPI();
    this.pictureData =   await pictureAPI.getPicture();
    
  }
  async generateContent(){
    const controlBlock = new ControlBlock(this.selectedLanguage, this.selectedTemp, this.wordsData[this.selectedLanguage]);
    const controlBlocklElem = controlBlock.generateLayout()
    if(this.weatherForTodayBlock) {
      this.weatherForTodayBlock.stopTimer()
    }
    this.weatherForTodayBlock = new WeatherForTodayBlock(this.selectedLanguage, this.selectedTemp, this.wordsData[this.selectedLanguage])
    const weatherForToday = await this.weatherForTodayBlock.generateLayout()
    this.weatherForTodayBlock.startTimer()
    const container = create("div", s.container, [controlBlocklElem, weatherForToday])
    return container
  }
 changeLang(){
    document.querySelector('.wrapper').addEventListener('click',async (e)=>{
      if(e.target.classList.contains("toggle_item") && e.target.parentNode.classList.contains("toggle_container_lang")){
        this.selectedLanguage = e.target.getAttribute("data-value")
        //localStorage.setItem('weatherForecast_language', e.target.getAttribute("data-value"))
        const content = await this.generateContent();
        document.querySelector('.wrapper').innerHTML = null
        document.querySelector('.wrapper').append(content)
      }
      if(e.target.classList.contains("toggle_item") && e.target.parentNode.classList.contains("toggle_container_temp")){
        this.selectedTemp = e.target.getAttribute("data-value")
        //localStorage.setItem('weatherForecast_temp', e.target.getAttribute("data-value"))
        if(document.querySelector(".item_temp_unactive")){
          document.querySelectorAll(".item_temp_unactive").forEach((item)=>{
            item.classList.remove("item_temp_unactive")
          })
        }
        if(this.selectedTemp === "0" && document.querySelector(".item_tempC")){
          document.querySelectorAll(".item_tempC").forEach((item)=>{item.classList.add("item_temp_unactive")})
        }
        if(this.selectedTemp === "1" && document.querySelector(".item_tempF")){
          document.querySelectorAll(".item_tempF").forEach((item)=>{item.classList.add("item_temp_unactive")})
        }
      }
    })
  }


}
export default MainBlock;
