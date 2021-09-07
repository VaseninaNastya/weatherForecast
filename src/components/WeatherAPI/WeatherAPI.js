class WeatherAPI {
  constructor(city) {
    this.API_SERVER = 'https://api.weatherapi.com/v1/forecast.json';
    this.city = city;
  }
  /*  Users   */
  async text() {
    return fetch(this.API_SERVER + '?key=d3daec91421e4a0282a161907210709&q=' + this.city + '&days=3' , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default WeatherAPI;
