import apiUrls from "../../utils/apiUrls.utils";
import apiTokens from "../../utils/apiTokens.utils";

class GeoCoordAPI {
  constructor(city) {
    this.API_SERVER = apiUrls.GeoCoordApiUrl;
    this.city = city
  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + '?q=' + this.city + apiTokens.GeoCoordApiToken, {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default GeoCoordAPI;

