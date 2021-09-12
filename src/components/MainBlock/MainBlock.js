import create from "../../utils/create.utils.js";
import s from "./MainBlock.module.scss";
import PictureAPI from "./../PictureAPI/PictureAPI";
import WeatherForTodayBlock from "../WeatherForTodayBlock/WeatherForTodayBlock.js"
import WeatherForThreeDaysBlock from "../WeatherForThreeDaysBlock/WeatherForThreeDaysBlock.js"
import ControlBlock from "../ControlBlock/ControlBlock.js"
import wordsEn from "../../utils/wordsEn.utils";
import wordsRu from "../../utils/wordsRu.utils";
import CityAPI from "../CityAPI/CityAPI";
import MapsAPI from "../MapsAPI/MapsAPI";
import WeatherAPI from "../WeatherAPI/WeatherAPI";

class MainBlock {
  constructor(){
    this.wordsData = [wordsRu,wordsEn];
    this.selectedLanguage = localStorage.getItem('weatherForecast_language') || 0;
    this.selectedTemp =  localStorage.getItem('weatherForecast_temp') || 0 ;
    this.backgroundUrl = '';
    this.city = '';
    this.longitude = ''
    this.latitude = ''
  }
  async generateLayout() {
    await this.getBackgroundUrl()
    await this.getCityData()
    this.oneDayWeatherData = await this.getWeatherData(this.city , 1, this.selectedLanguage)
    this.threeDaysWeatherData = await this.getWeatherData(this.city , 3, this.selectedLanguage)
    this.latitude = this.oneDayWeatherData.location.lat
    this.longitude = this.oneDayWeatherData.location.lon
    const container = await this.generateContent()
    const controlBlock = new ControlBlock(this.selectedLanguage, this.selectedTemp, this.wordsData[this.selectedLanguage]);
    const controlBlocklElem = controlBlock.generateLayout()
    const header = create("header", null, create('div', s.container, controlBlocklElem)) 
    this.mainContainer = create("div", s.wrapper, [header, container]);
    this.mainContainer.setAttribute('style' , "background-image: url(" + `${this.backgroundUrl}` + ")")
    setTimeout (this.changeLang.bind(this), 100)
    setTimeout (await this.createMap.bind(this), 100)
    return this.mainContainer;
  }
  async createMap(){
    const mapsAPI = new MapsAPI(this.longitude, this.latitude)
    await mapsAPI.generateLayout()
  }
  async getCityData() {
    const cityAPI = new CityAPI();
    
    const cityData = await cityAPI.getCityData();
    this.city = cityData.city
  }
  async getWeatherData(city, coutDays, selectedLanguage) {
    const weatherAPI = new WeatherAPI(city, coutDays, selectedLanguage);
    return await weatherAPI.getWeatherData();
  }
  async generateContent(){
    this.mapContainer = create('div', null, null, null, ['id', 'map'])
    if(this.weatherForTodayBlock ) {
      this.weatherForTodayBlock.stopTimer()
    }
    if(this.weatherForThreeDayBlock ) {
      this.weatherForThreeDayBlock.stopTimer()
    }
    this.weatherContainer = create('div', "container_weatherContent")
    const mainContainer = create("div", "main container", this.weatherContainer)
    await this.createWeatherBlock()
    mainContainer.append(this.mapContainer)
    return mainContainer
  }
  async createWeatherBlock(){
    this.weatherForTodayBlock = new WeatherForTodayBlock(this.selectedLanguage, this.selectedTemp, this.wordsData[this.selectedLanguage], this.city, this.oneDayWeatherData)
    this.weatherForThreeDayBlock = new WeatherForThreeDaysBlock(this.selectedLanguage, this.selectedTemp, this.wordsData[this.selectedLanguage], this.city, this.threeDaysWeatherData)
    this.weatherForToday = await this.weatherForTodayBlock.generateLayout()
    this.weatherForThreeDay = await this.weatherForThreeDayBlock.generateLayout()
    this.weatherContainer.append(this.weatherForToday)
    this.weatherContainer.append(this.weatherForThreeDay)
  }
  async getBackgroundUrl(){
    const pictureAPI = new PictureAPI();
    this.pictureData =  await pictureAPI.getPicture();
    this.backgroundUrl = this.pictureData.urls.regular
  }
 changeLang(){
    document.querySelector('.wrapper').addEventListener('click',async (e)=>{
      if(e.target.classList.contains("toggle_item") && e.target.parentNode.classList.contains("toggle_container_lang")){
        this.selectedLanguage = e.target.getAttribute("data-value")
        this.weatherForToday.remove()
        this.weatherForThreeDay.remove()
        await this.createWeatherBlock()
      }
      if(e.target.classList.contains("toggle_item") && e.target.parentNode.classList.contains("toggle_container_temp")){
        this.selectedTemp = e.target.getAttribute("data-value")
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
      if(e.target.classList.contains("changeBackgroundButton")){
        e.preventDefault()
        await this.getBackgroundUrl()
        this.mainContainer.setAttribute('style' , "background-image: url(" + `${this.backgroundUrl}` + ")")
      }

    })
    document.querySelector('.wrapper').addEventListener('keydown',async (e)=>{
      if(e.target.classList.contains("searchCityInput") && e.code === 'Enter'){
        this.city = e.target.value
        this.weatherForToday.remove()
        this.weatherForThreeDay.remove()
        this.createWeatherBlock()
      }
    })
  }


}
export default MainBlock;
