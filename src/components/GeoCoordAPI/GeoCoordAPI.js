class GeoCoordAPI {
  constructor(city) {
    this.API_SERVER = 'https://api.opencagedata.com/geocode/v1/json';
this.city = city
  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + '?q=' + this.city + '&key=3201b08ffcdf47b189c5bef73a8c7f43&pretty=1&no_annotations=1', {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default GeoCoordAPI;

