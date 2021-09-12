class MapsAPI {
constructor(longitude, latitude){
  this.longitude = longitude,
  this.latitude = latitude
}
 async getData() {
    mapboxgl.accessToken = 'pk.eyJ1IjoibmFzdHlhdmFzZW5pbmEiLCJhIjoiY2t0YWFvcmI1MWthczJ4bGFpdzN0emNkZiJ9.ArsmDaUaBW8s3UZh-Z91kw';

  const map = await new mapboxgl.Map({
    container: 'map', // container ID
    style: 'mapbox://styles/mapbox/streets-v11', // style URL
    center: [this.longitude, this.latitude], // starting position [lng, lat]
    zoom: 9 // starting zoom
    });
  }
}
export default MapsAPI;

