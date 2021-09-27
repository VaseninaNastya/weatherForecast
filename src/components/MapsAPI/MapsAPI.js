import apiUrls from "../../utils/apiUrls.utils";
import apiTokens from "../../utils/apiTokens.utils";

class MapsAPI {
constructor(longitude, latitude){
  this.longitude = longitude,
  this.latitude = latitude
}
 async getData() {
    mapboxgl.accessToken = apiTokens.MapsApiToken;
  const map = await new mapboxgl.Map({
    container: 'map', // container ID
    style: apiUrls.MapsApiUrl, // style URL
    center: [this.longitude, this.latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
  }
}
export default MapsAPI;

