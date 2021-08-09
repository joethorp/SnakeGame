/* eslint-disable comma-dangle */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */

let map = null;
let infoWindow = null;
let lat = null;
let lng = null;
const mapElement = document.getElementById('map');
if (navigator.geolocation) {
  navigator.geolocation.getCurrentPosition(
    function (position) {
      lat = position.coords.latitude;
      lng = position.coords.longitude;
      initMap();
    },
    function (err) {
      console.log(err);
    }
  );
}

function initMap() {
  const latLng = { lat, lng };
  map = new google.maps.Map(mapElement, {
    zoom: 14,
  
    center: latLng,
  });
  getBikeData();
}
function getBikeData() {
  fetch('https://api.tfl.gov.uk/bikepoint')
    .then((response) => {
      if (response.ok) {
        return response.json();
      } else {
        throw response.status;
      }
    })
    .then((bikepoints) => {
      bikepoints.forEach(addBikeMarker);
    });
}
function addBikeMarker(bikepoint) {
  const bikePointLocation = { lat: bikepoint.lat, lng: bikepoint.lon };
  const marker = new google.maps.Marker({
    position: bikePointLocation,
    map: map,
  });
}





















