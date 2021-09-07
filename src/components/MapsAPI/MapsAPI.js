class MapsAPI {
  constructor() {
    this.API_SERVER = 'https://ipinfo.io/json';

  }
  /*  Users   */
  async text() {
    return fetch(this.API_SERVER + '?token=f448fbc106419d' , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default MapsAPI;

