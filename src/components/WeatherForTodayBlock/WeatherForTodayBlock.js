import create from "../../utils/create.utils.js";
import s from "./WeatherForTodayBlock.module.scss";


class WeatherForTodayBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData, city, weatherData, timeZone){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
    this.city = city;
    this.weatherData = weatherData;
    this.timeZone = timeZone
  }
  async generateLayout() {
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"
    const wordsData = this.wordsData,
    cityName = this.city,
    countryName = this.weatherData.location.country,
    currentDate = this.showTime(),
    weatherElems = this.createWeatherElems(this.weatherData.current),
    weatherForTodayContainer = create(
      "div",
      "weather_container",
      [create('h3', null, wordsData.WeatherForToday),
        create("ul", s.weather_list, [
        create("li", s.weather_item, wordsData.city + cityName + wordsData.country + countryName),
        create("li", s.weather_item, [wordsData.todaysDate, create("span", s.currentDate, currentDate)]),
      ])]
    );
    if(weatherElems.length){
      weatherElems.map((item)=>{
        weatherForTodayContainer.append(item)
      })
    }
    
    return weatherForTodayContainer;
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
    
    currentTemperatureF = data.temp_f,
    summary = data.condition.text,
    apparentTemperatureC = data.feelslike_c,
    apparentTemperatureF = data.feelslike_f,
    humidity = data.humidity,
    wind_kpm = Math.round(data.wind_kph * 10 / 60),
    weatherIconHref = data.condition.icon,
    currentTemperatureCItem = create('li', "weather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС ),
    currentTemperatureFItem = create('li', "weather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF ),
    apparentTemperatureCItem = create('li', "weather_item item_tempC", wordsData.apparentTemperatureC + apparentTemperatureC ),
    apparentTemperatureFItem = create('li', "weather_item item_tempF", wordsData.apparentTemperatureF + apparentTemperatureF )
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
      apparentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
      apparentTemperatureFItem.classList.add("item_temp_unactive")
    }

      result = [
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.weather_item, [wordsData.generalDescription + summary, create('img', s.weather_icon, null, null, ["src", weatherIconHref] )] ),
        apparentTemperatureCItem,
        apparentTemperatureFItem,
        create('li', s.weather_item, wordsData.windSpeed_ms + wind_kpm ),
        create('li', s.weather_item, wordsData.humidity + humidity ),
      ]
      
    
    return result
  }
  showTime(){
    let result = ''
    const locale = this.selectedLanguage === '0' ? "ru" : "en",
    date = new Date(),
    currentDate = date.toLocaleString(locale , {day: "numeric",month:"long",  weekday: "short", hour: 'numeric', minute: 'numeric', second: 'numeric', timeZone: this.timeZone})
    if(currentDate) result = currentDate
    return result
  };
  changeTime(){
    if(document.querySelector(".currentDate")) document.querySelector(".currentDate").innerText = this.showTime()
  }
  


}
export default WeatherForTodayBlock;
