import create from "../../utils/create.utils.js";
import s from "./WeatherForThreeDaysBlock.module.scss";


class WeatherForThreeDaysBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData, city, weatherData, timeZone){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
    this.city =  city;
    this.weatherData = weatherData.forecast.forecastday;
    this. timeZone =  timeZone;
  }
  async generateLayout() {
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"
    const weatherForThreeDaysContainer = create(
      "div",
      "weather_container",
      create('h3', null, this.wordsData.WeatherForThreeDays)
    );
    if(this.weatherData.length){
      this.weatherData.map((item)=>{
        weatherForThreeDaysContainer.append(this.createWeatherElems(item))
      })
    }
    return weatherForThreeDaysContainer;
  }
  createWeatherElems (data) {
    let result = ''
    const wordsData = this.wordsData,
    currentDate = this.showTime(data.date),
    currentDayItem =  create("li", s.weather_item, [wordsData.weekDay, currentDate]),
    currentTemperatureС = data.day.avgtemp_c,
    
    currentTemperatureCItem = create('li', "weather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС ),
    currentTemperatureF = data.day.avgtemp_f,
    currentTemperatureFItem = create('li', "weather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF ),
    weatherIconHref = data.day.condition.icon
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
    }

      result = create('ul', s.threeDaysWeather_list, [
        currentDayItem,
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.weather_item,  create('img', s.weather_icon, null, null, ["src", weatherIconHref] ) ),
      ])
    
    return result
  }
  showTime (dateArg) {
    let result = ''
    const locale = this.selectedLanguage === '0' ? "ru" : "en",
    date = new Date(dateArg),
    currentDate = date.toLocaleString(locale , {weekday: "long", timeZone: this.timeZone})
    if(currentDate) result = currentDate
    return result
  };
}
export default WeatherForThreeDaysBlock;
