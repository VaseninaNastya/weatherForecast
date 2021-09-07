class PictureAPI {
  constructor() {
    this.API_SERVER = 'https://api.unsplash.com/photos/random';

  }
  /*  Users   */
  async getPicture() {
    return fetch(this.API_SERVER + '?orientation=landscape&per_page=1&query=nature&utm_source=WeatherForecast&utm_medium=referral&client_id=JToQOKVPeE9Nan0sjmS0L7_K8mdz5P20FqHzCFuu0oI' , {
      method: "GET",
      headers: {
        'Content-Type': 'application/json',
        'user-agent': 'Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/87.0.4280.141 Safari/537.36',
        Referer: this.API_SERVER,
      },


      
    })
      .then((response) => {
        return response.json();
      })
      .catch((error) => Error(error));
  }
}
export default PictureAPI;
