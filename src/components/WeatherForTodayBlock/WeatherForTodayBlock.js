import create from "../../utils/create.utils.js";
import s from "./WeatherForTodayBlock.module.scss";


class WeatherForTodayBlock {
  constructor(selectedLanguage, selectedTemp,  wordsData, city, weatherData){
    this.selectedLanguage = selectedLanguage
    this.selectedTemp = selectedTemp
    this.wordsData = wordsData
    this.timer = null;
    this.city = city;
    this.weatherData = weatherData;
  }
  async generateLayout() {
    const wordsData = this.wordsData
    const cityName = this.city;
    this.lang = this.selectedLanguage === '0' ? "ru" : "en"


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
      ])]
    );
    if(currentWeather.length){
      currentWeather.map((item)=>{
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

  currentWeather (data) {
    let result = ''
    const wordsData = this.wordsData
    const currentTemperatureС = data.temp_c;
    const currentTemperatureF = data.temp_f;
    const summary = data.condition.text;
    const apparentTemperatureC = data.feelslike_c;
    const apparentTemperatureF = data.feelslike_f;
    const humidity = data.humidity;
    const wind_kpm = Math.round(data.wind_kph * 10 / 60);
    const weatherIconHref = data.condition.icon
    const currentTemperatureCItem = create('li', "currentWeather_item item_tempC", wordsData.currentTemperatureC + currentTemperatureС )
    const currentTemperatureFItem = create('li', "currentWeather_item item_tempF", wordsData.currentTemperatureF + currentTemperatureF )
    const apparentTemperatureCItem = create('li', "currentWeather_item item_tempC", wordsData.apparentTemperatureC + apparentTemperatureC )
    const apparentTemperatureFItem = create('li', "currentWeather_item item_tempF", wordsData.apparentTemperatureF + apparentTemperatureF )
    if(this.selectedTemp === "0") {
      currentTemperatureCItem.classList.add("item_temp_unactive")
      apparentTemperatureCItem.classList.add("item_temp_unactive")
    } else {
      currentTemperatureFItem.classList.add("item_temp_unactive")
      apparentTemperatureFItem.classList.add("item_temp_unactive")
    }
    if (currentTemperatureС &&currentTemperatureF && summary && apparentTemperatureC && apparentTemperatureF && humidity && wind_kpm && weatherIconHref) {
      result = [
        currentTemperatureCItem,
        currentTemperatureFItem,
        create('li', s.currentWeather_item, [wordsData.generalDescription + summary, create('img', s.weather_icon, null, null, ["src", weatherIconHref] )] ),
        apparentTemperatureCItem,
        apparentTemperatureFItem,
        create('li', s.currentWeather_item, wordsData.windSpeed_ms + wind_kpm ),
        create('li', s.currentWeather_item, wordsData.humidity + humidity ),
      ]
      
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
