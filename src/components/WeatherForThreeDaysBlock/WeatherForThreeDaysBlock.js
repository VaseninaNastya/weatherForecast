import create from "../../utils/create.utils.js";
import s from "./WeatherForThreeDaysBlock.module.scss";


class WeatherForThreeDaysBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData, city, weatherData,latitude, longitude, timeZone){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
    this.city =  city;
    this.weatherData = weatherData;
    this.latitude = latitude;
    this.longitude = longitude;
    this.timeZone = timeZone;
  }
  async generateLayout() {
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"
    const wordsData = this.wordsData,
    currentDate = this.showTime(),
    weatherElems = this.createWeatherElems(this.weatherData.current),
    weatherForThreeDaysContainer = create(
      "div",
      "weather_container",
      [create('h3', null, wordsData.WeatherForThreeDays),
      create("ul", s.weather_list, [
        create("li", s.weather_item, [wordsData.todaysDate, create("span", s.weekDay, currentDate)]),
        create("li", s.weather_item, [wordsData.latitude, +this.latitude.toFixed(2), wordsData.degree]),
        create("li", s.weather_item, [wordsData.longitude, +this.longitude.toFixed(2), wordsData.degree]),
      ])]
    );
    if(weatherElems.length){
      weatherElems.map((item)=>{
        weatherForThreeDaysContainer.append(item)
      })
    }
    return weatherForThreeDaysContainer;
  }
  startTimer(){
    this.timer = setInterval(this.changeTime.bind(this), 1000);
  }
  stopTimer(){
    clearInterval(this.timer)
  }
  createWeatherElems (data) {
    let result = ''
    const wordsData = this.wordsData,
    currentTemperatureС = data.temp_c,
    currentTemperatureCItem = create('li', "weather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС ),
    currentTemperatureF = data.temp_f,
    currentTemperatureFItem = create('li', "weather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF ),
    weatherIconHref = data.condition.icon
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
    }
    if (currentTemperatureС && currentTemperatureF && weatherIconHref) {
      result = [
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.weather_item,  create('img', s.weather_icon, null, null, ["src", weatherIconHref] ) ),
      ]
      
    }
    return result
  }
  showTime () {
    let result = ''
    const locale = this.selectedLanguage === '0' ? "ru" : "en",
    date = new Date(),
    currentDate = date.toLocaleString(locale , {weekday: "long", timeZone: this.timeZone})
    if(currentDate) result = currentDate
    return result
  };
  changeTime(){
    if(document.querySelector(".currentWeekDate")) document.querySelector(".currentWeekDate").innerText = this.showTime()
  }
}
export default WeatherForThreeDaysBlock;
