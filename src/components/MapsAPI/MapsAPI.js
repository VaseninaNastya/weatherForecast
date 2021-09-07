class MapsAPI {
  constructor() {
    this.API_SERVER = 'https://ipinfo.io/json';


    "https://api.mapbox.com/v4/mapbox.mapbox-streets-v8/12/1171/1566.mvt?style=mapbox://styles/mapbox/streets-v11@00&access_token=pk.eyJ1IjoibmFzdHlhdmFzZW5pbmEiLCJhIjoiY2t0YWFvcmI1MWthczJ4bGFpdzN0emNkZiJ9.ArsmDaUaBW8s3UZh-Z91kw"


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

