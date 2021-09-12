class PictureAPI {
  constructor() {
    this.API_SERVER = 'https://api.unsplash.com/photos/random';

  }
  /*  Users   */
  async getData() {
    return fetch(this.API_SERVER + '?orientation=landscape&per_page=1&query=nature&utm_source=WeatherForecast&utm_medium=referral&client_id=JToQOKVPeE9Nan0sjmS0L7_K8mdz5P20FqHzCFuu0oI' , {
      method: "GET",
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default PictureAPI;
