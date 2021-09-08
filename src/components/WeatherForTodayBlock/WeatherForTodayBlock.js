import create from "../../utils/create.utils.js";
import s from "./WeatherForTodayBlock.module.scss";
import CityAPI from "../CityAPI/CityAPI";
import WeatherAPI from "../WeatherAPI/WeatherAPI";

class WeatherForTodayBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
  }
  async generateLayout() {
    const wordsData = this.wordsData
    await this.getCityData();
    const cityName = this.cityData.city;
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"
    await this.getWeatherData(this.cityData.city, 1, this.lang);
    const countryName = this.weatherData.location.country;
    const currentDate = this.showTime()
    const currentWeather = this.currentWeather(this.weatherData.current);
    const weatherForTodayContainer = create(
      "div",
      s.logicalBlock,
      [create('h2', null, wordsData.WeatherForToday),
        create("ul", s.weatherForToday_list, [
        create("li", s.weatherForToday_item, wordsData.city + cityName + wordsData.country + countryName),
        create("li", s.weatherForToday_item, [wordsData.todaysDate, create("span", s.currentDate, currentDate)]),
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
  }

  currentWeather (data) {
    let result = ''
    const wordsData = this.wordsData
    const currentTemperatureС = data.temp_c;
    const currentTemperatureCItem = create('li', "currentWeather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС )
    const currentTemperatureF = data.temp_f;
    const currentTemperatureFItem = create('li', "currentWeather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF )
    const summary = data.condition.text;
    const apparentTemperatureC = data.feelslike_c;
    const apparentTemperatureCItem = create('li', "currentWeather_item item_tempC", wordsData.apparentTemperatureC + apparentTemperatureC )
    const apparentTemperatureF = data.feelslike_f;
    const apparentTemperatureFItem = create('li', "currentWeather_item item_tempF", wordsData.apparentTemperatureF + apparentTemperatureF )
    const humidity = data.humidity;
    const wind_kpm = Math.round(data.wind_kph * 10 / 60);
    const weatherIconHref = data.condition.icon
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
      apparentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
      apparentTemperatureFItem.classList.add("item_temp_unactive")
    }
    if (currentTemperatureС &&currentTemperatureF && summary && apparentTemperatureC && apparentTemperatureF && humidity && wind_kpm && weatherIconHref) {
      result = create("ul", s.currentWeather_list,[
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.currentWeather_item, [wordsData.generalDescription + summary, create('img', s.weather_icon, null, null, ["src", weatherIconHref] )] ),
        apparentTemperatureCItem,
        apparentTemperatureFItem,
        create('li', s.currentWeather_item, wordsData.windSpeed_ms + wind_kpm ),
        create('li', s.currentWeather_item, wordsData.humidity + humidity ),
      ])
      
    }
    return result
  }
  showTime(){
    let result = ''
    const locale = this.selectedLanguage === '0' ? "ru" : "en"
    const date = new Date() 
    const currentDate = date.toLocaleString(locale , {day: "numeric",month:"long",  weekday: "short",
    hour: 'numeric', minute: 'numeric', second: 'numeric'})
    if(currentDate) result = currentDate
    return result
  };
  changeTime(){
    if(document.querySelector(".currentDate")) document.querySelector(".currentDate").innerText = this.showTime()
  }
  


}
export default WeatherForTodayBlock;
