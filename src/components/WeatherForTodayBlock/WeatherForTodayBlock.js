import create from "../../utils/create.utils.js";
import s from "./WeatherForTodayBlock.module.scss";
import CityAPI from "../CityAPI/CityAPI";
import WeatherAPI from "../WeatherAPI/WeatherAPI";

class WeatherForTodayBlock {
  constructor(selectedLanguage, wordsData){
    this.selectedLanguage = selectedLanguage
    this.wordsData = wordsData

  }
  async generateLayout() {
    const wordsData = this.wordsData
    await this.getCityData();
    const cityName = this.cityData.city;
    let lang = this.selectedLanguage === '0' ? "ru" : "en"
    
    await this.getWeatherData(this.cityData.city, 1, lang);
    const countryName = this.weatherData.location.country;
    const date = new Date() 
    let langForDate = this.selectedLanguage === '0' ? "ru" : "en-GB"
    const currentDate = date.toLocaleString(langForDate , {day: "numeric",month:"long",  weekday: "short"})
    
    const currentWeather = this.currentWeather(this.weatherData.current);
    const weatherForTodayContainer = create(
      "div",
      s.logicalBlock,
      create("ul", s.weatherForToday_list, [
        create("li", s.weatherForToday_item, wordsData.city + cityName + wordsData.country + countryName),
        create("li", s.weatherForToday_item, wordsData.todaysDate + currentDate),
        create("li", s.weatherForToday_item, [create('span', null, wordsData.currentWeather), currentWeather]),
      ])
    );
    return weatherForTodayContainer;
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
    const currentTemperature = data.temp_c;
    const summary = data.condition.text;
    const apparentTemperature = data.feelslike_c;
    const humidity = data.humidity;
    const wind_kpm = Math.round(data.wind_kph * 10 / 60);
    const weatherIconHref = data.condition.icon
    if (currentTemperature && summary && apparentTemperature && humidity && wind_kpm && weatherIconHref) {
      result = create("ul", s.currentWeather_list,[
        create('li', s.currentWeather_item, wordsData.сurrentTemperature + currentTemperature ),
        create('li', s.currentWeather_item, [wordsData.generalDescription + summary, create('img', s.weather_icon, null, null, ["src", weatherIconHref] )] ),
        create('li', s.currentWeather_item, wordsData.apparentTemperature + apparentTemperature ),
        create('li', s.currentWeather_item, wordsData.windSpeed_ms + wind_kpm ),
        create('li', s.currentWeather_item, wordsData.humidity + humidity ),
      ])
      
    }
    return result
  }
  createTimer(){

  }
}
export default WeatherForTodayBlock;
