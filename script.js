let click = document.querySelector(".click");
let form = document.querySelector(".form");
let input = document.querySelector(".input");
let ipaddress = document.querySelector(".address-ip");
let city= document.querySelector(".city");
let region = document.querySelector(".region");
let country = document.querySelector(".country");
let timevalue = document.querySelector(".time-value");
let isp = document.querySelector(".isp-value");
const regexExp = /^(([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])\.){3}([0-9]|[1-9][0-9]|1[0-9]{2}|2[0-4][0-9]|25[0-5])$/gi;

// the customisez data for the map virw
const map = L.map('map').setView([0, 0], 13);
const tileUrl = 'https://api.mapbox.com/styles/v1/{id}/tiles/{z}/{x}/{y}?access_token=pk.eyJ1IjoibWFwYm94IiwiYSI6ImNpejY4NXVycTA2emYycXBndHRqcmZ3N3gifQ.rJcFIG214AriISLbB6B5aw';

 L.tileLayer(tileUrl, {
    maxZoom: 18,
    attribution: false,
    id: 'mapbox/streets-v11',
    tileSize: 512,
    zoomOffset: -1
}).addTo(map);

const locationIcon = L.icon({
    iconUrl: "./images/icon-location.svg",
    iconSize: [35, 35],
    iconAnchor: [15, 15]
});

const marker = L.marker([0, 0], {icon: locationIcon}).addTo(map);

// this function renders the initial data when thebuserbloads the pages which gives hin the initial data of his current location 
async function getdefault (){

    let response = await fetch ('https://ipapi.co/json/');
    let data = await response.json();  
    console.log(data); 

    isp.textContent= data.org;
    ipaddress.textContent= data.ip;
    city.textContent = data.city;
    region.textContent= data.region;
    country.textContent= data.country_name;
    timevalue.textContent= data.utc_offset;

    map.setView([data.latitude, data.longitude], 13);
    marker.setLatLng([data.latitude, data.longitude]);
    marker.bindPopup(`<b>${data.ip}</b>`).openPopup();
}
getdefault ()

// this dusplays the user data and map bax=sed on the ipaddress he proc=vides in the form 
form.addEventListener("submit", getip);

async function getip(e){

    e.preventDefault();

    try{   
       
    let response = await fetch (`https://ipapi.co/${input.value}/json/`);
    let data = await response.json();
  
 
    console.log(data);  

    const str = input.value;

        if ( regexExp.test(str)){

    //  render the Api data to the browser 
        isp.textContent= data.org;
        ipaddress.textContent= data.ip;
        city.textContent = data.city;
        region.textContent= data.region;
        country.textContent= data.country_name;
        timevalue.textContent= data.utc_offset;

        // display the mapyou just got to your browser using the custmized parameters
        map.setView([data.latitude, data.longitude], 13);
        marker.setLatLng([data.latitude, data.longitude]);
        marker.bindPopup(`<b>${data.ip}</b>`).openPopup();


            e.target.reset();
    }
else{
    alert(" invalid ip address");
    map.setView([data.latitude, data.longitude], 13);
    marker.setLatLng([data.latitude, data.longitude]);
    marker.bindPopup(`<b>${data.ip}</b>`).openPopup();

    e.target.reset();
}
}
// here is the error in cae an error is caught during the fetch 
catch(error){
  console.log(error); 
  alert(" invalid ip address");
  e.target.reset();
}


}







