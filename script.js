let input = document.getElementById("ipaddr");
let submitBtn = document.getElementById("submitBtn");
let err = document.getElementById("ErrMsg");
let ipaddr = document.getElementById("ipaddress");
let loca = document.getElementById("locations");
let time = document.getElementById("timezone");
let isp = document.getElementById("isp");
let disp = document.getElementById("displ");
//Leaflet JS
var map = L.map('map').setView([51.505, -0.09], 13);
L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
}).addTo(map);
var locationIcon = L.icon({
    iconUrl: 'images/icon-location.svg',
    iconSize:     [45, 55], 
    iconAnchor:   [26.47, 54] 
});
L.marker([51.505, -0.09],{icon:locationIcon}).addTo(map)
function updateMap(latitude, longitude) {
    // Clear existing markers (if any)
    map.eachLayer(function (layer) {
    if (layer instanceof L.Marker) {
        map.removeLayer(layer);
    }
    });

    L.marker([latitude, longitude],{icon:locationIcon}).addTo(map);
    map.setView([latitude,longitude],13);
}
submitBtn.addEventListener("click",function(){
    let address = input.value;
    input.value = "";
        // Fetching the details of ipaddress using IP Geolocation API
        const doNetworkCall = async () => {
            const response = await fetch("https://geo.ipify.org/api/v2/country,city?apiKey=at_FjcnrwpBOBthm1ioJEwQ16GgNMlRl&ipAddress="+address);
            const jsonData = await response.json();
             latitude = jsonData.location.lat;
             longitude = jsonData.location.lng;
            ipaddr.textContent = jsonData.ip;
            loca.textContent = `${jsonData.location.city},${jsonData.location.country}\n${jsonData.location.postalCode}`;
            time.textContent=`UTC ${jsonData.location.timezone}`;
            isp.textContent = jsonData.isp;
            updateMap(latitude,longitude);
        }
        const res = doNetworkCall();
});
