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
    const weatherForTodayContainer = create(
      "div",
      s.logicalBlock,
      create("ul", s.weatherForToday_list, [
        create(
          "li",
          s.weatherForToday_item,
          "City: " + cityName + "; Country: " + countryName
        ),
        create("li", s.weatherForToday_item, "today's date: " + currentDay),
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
        result = String(date.split(" ")[0].split("-")[2])+ ' ' + String(mounth[mounthNumber - 1]);
      }
    }
    return result;
  }
}
export default WeatherForTodayBlock;
