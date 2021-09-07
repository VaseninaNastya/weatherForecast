class CityAPI {
  constructor() {
    this.API_SERVER = 'https://ipinfo.io/json';

  }
  /*  Users   */
  async getCityData() {
    return fetch(this.API_SERVER + '?token=f448fbc106419d' , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default CityAPI;

