import apiUrls from "../../utils/apiUrls.utils";
import apiTokens from "../../utils/apiTokens.utils";
class CityAPI {
  constructor() {
    this.API_SERVER = apiUrls.cityApiUrl;

  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + apiTokens.cityApiToken , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default CityAPI;

