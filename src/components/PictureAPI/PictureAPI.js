import apiUrls from "../../utils/apiUrls.utils";
import apiTokens from "../../utils/apiTokens.utils";

class PictureAPI {
  constructor() {
    this.API_SERVER = apiUrls.pictureApiUrl;

  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + apiTokens.pictureApiToken , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default PictureAPI;
