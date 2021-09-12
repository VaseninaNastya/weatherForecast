class WeatherAPI {
  constructor(city, coutDays, lang) {
    this.API_SERVER = 'https://api.weatherapi.com/v1/forecast.json';
    this.city = city;
    this.coutDays = coutDays;
    this.lang = lang
  }
  /*  Users   */
  async getData() {
    console.log("11111", this.API_SERVER + '?key=d3daec91421e4a0282a161907210709&q=' + this.city + '&days='+  this.coutDays +'&lang=' + this.lang)
    return fetch(this.API_SERVER + '?key=d3daec91421e4a0282a161907210709&q=' + this.city + '&days='+  this.coutDays +'&lang=' + this.lang, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default WeatherAPI;
