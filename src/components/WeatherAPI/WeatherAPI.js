class WeatherAPI {
  constructor(city,coutDays) {
    this.API_SERVER = 'https://api.weatherapi.com/v1/forecast.json';
    this.city = city;
    this.coutDays = coutDays;
  }
  /*  Users   */
  async getWeatherData() {
    return fetch(this.API_SERVER + '?key=d3daec91421e4a0282a161907210709&q=' + this.city + '&days='+  this.coutDays, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default WeatherAPI;
