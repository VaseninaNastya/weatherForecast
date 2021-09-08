import create from "../../utils/create.utils.js";
import s from "./WeatherForThreeDaysBlock.module.scss";
import CityAPI from "../CityAPI/CityAPI";
import WeatherAPI from "../WeatherAPI/WeatherAPI";

class WeatherForThreeDaysBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
  }
  async generateLayout() {
    const wordsData = this.wordsData
    await this.getCityData();
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"
    await this.getWeatherData(this.cityData.city, 3, this.lang);
    const currentDate = this.showTime()
    const currentWeather = this.currentWeather(this.weatherData.current);
    const weatherForTodayContainer = create(
      "div",
      s.logicalBlock,
      [create('h2', null, wordsData.WeatherForThreeDays),
      create("ul", s.weatherForToday_list, [
        create("li", s.weatherForToday_item, [wordsData.todaysDate, create("span", s.currentWeekDate, currentDate)]),
        create("li", s.weatherForToday_item, [create('span', null, wordsData.currentWeather), currentWeather]),
      ])]
    );

    
    return weatherForTodayContainer;
  }
  startTimer(){
    this.timer = setInterval(this.changeTime.bind(this), 1000);
  }
  stopTimer(){
    clearInterval(this.timer)
  }


  async getCityData() {
    const cityAPI = new CityAPI();
    this.cityData = await cityAPI.getCityData();
  }
  async getWeatherData(city, coutDays, selectedLanguage) {
    const weatherAPI = new WeatherAPI(city, coutDays, selectedLanguage);
    this.weatherData = await weatherAPI.getWeatherData();
    console.log("this.weatherData", this.weatherData);
  }

  currentWeather (data) {
    let result = ''
    const wordsData = this.wordsData
    const currentTemperatureС = data.temp_c;
    const currentTemperatureCItem = create('li', "currentWeather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС )
    const currentTemperatureF = data.temp_f;
    const currentTemperatureFItem = create('li', "currentWeather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF )
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
    }
    const weatherIconHref = data.condition.icon
    if (currentTemperatureС &&currentTemperatureF && weatherIconHref) {
      result = create("ul", s.currentWeather_list,[
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.currentWeather_item,  create('img', s.weather_icon, null, null, ["src", weatherIconHref] ) ),
      ])
      
    }
    return result
  }
  showTime(){
    let result = ''
    const locale = this.selectedLanguage === '0' ? "ru" : "en"
    const date = new Date() 
    const currentDate = date.toLocaleString(locale , {weekday: "long"})
    if(currentDate) result = currentDate
    return result
  };
  changeTime(){
    if(document.querySelector(".currentWeekDate")) document.querySelector(".currentWeekDate").innerText = this.showTime()
  }
  


}
export default WeatherForThreeDaysBlock;
