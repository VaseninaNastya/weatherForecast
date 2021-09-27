import apiUrls from "../../utils/apiUrls.utils";
import apiTokens from "../../utils/apiTokens.utils";

class WeatherAPI {
  constructor(city, coutDays, lang) {
    this.API_SERVER = apiUrls.weatherApiUrl;
    this.city = city;
    this.coutDays = coutDays;
    this.lang = lang
  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + apiTokens.weatherApiToken + this.city + '&days='+  this.coutDays +'&lang=' + this.lang, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default WeatherAPI;
