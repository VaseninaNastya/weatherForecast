import create from "../../utils/create.utils.js";
import mounth from "../../utils/mounth.utils.js";
import s from "./WeatherForTodayBlock.module.scss";
import CityAPI from "../CityAPI/CityAPI";
import WeatherAPI from "../WeatherAPI/WeatherAPI";

class WeatherForTodayBlock {
  async generateLayout() {
    await this.getCityData();
    const cityName = this.cityData.city;
    await this.getWeatherData(this.cityData.city, 1);
    const countryName = this.weatherData.location.country;
    const currentDay = this.createCurrentDay(
      this.weatherData.location.localtime
    );
    const currentWeather = this.currentWeather(this.weatherData.current);
    const weatherForTodayContainer = create(
      "div",
      s.logicalBlock,
      create("ul", s.weatherForToday_list, [
        create("li", s.weatherForToday_item, "City: " + cityName + "; Country: " + countryName),
        create("li", s.weatherForToday_item, "Today's date: " + currentDay),
        create("li", s.weatherForToday_item, [create('span', null,"Current weather: "), currentWeather]),
      ])
    );
    return weatherForTodayContainer;
  }
  async getCityData() {
    const cityAPI = new CityAPI();
    this.cityData = await cityAPI.getCityData();
  }
  async getWeatherData(city, coutDays) {
    const weatherAPI = new WeatherAPI(city, coutDays);
    this.weatherData = await weatherAPI.getWeatherData();
    console.log("this.weatherData", this.weatherData);
  }
  createCurrentDay(date) {
    let result = "";
    if (
      date.split(" ").length > 0 &&
      date.split(" ")[0].split("-").length > 1
    ) {
      let mounthNumber = "";
      if (
        date.split(" ")[0].split("-")[1].trim()[0] == 0 &&
        date.split(" ")[0].split("-")[1].trim().length > 1
      ) {
        mounthNumber = date.split(" ")[0].split("-")[1].trim()[1];
      } else {
        mounthNumber = date.split(" ")[0].split("-")[1].trim();
      }
      if (mounthNumber && mounthNumber.length > 0) {
        result = String(date.split(" ")[0].split("-")[2]) + " " + String(mounth[mounthNumber - 1]);
      }
    }
    return result;
  }
  currentWeather (data) {
    let result = ''
    const currentTemperature = data.temp_c;
    const summary = data.condition.text;
    const apparentTemperature = data.feelslike_c;
    const humidity = data.humidity;
    const wind_kpm = Math.round(data.wind_kph * 10 / 60);
    if (currentTemperature && summary && apparentTemperature && humidity && wind_kpm) {
      result = create("ul", s.currentWeather_list,[
        create('li', s.currentWeather_item, "Current temperature: " + currentTemperature ),
        create('li', s.currentWeather_item, "General description: " + summary ),
        create('li', s.currentWeather_item, "Apparent temperature:" + apparentTemperature ),
        create('li', s.currentWeather_item, "Wind speed (m/s): " + wind_kpm ),
        create('li', s.currentWeather_item, "Humidity: " + humidity ),
      ])
      
    }
    return result
  }
}
export default WeatherForTodayBlock;
