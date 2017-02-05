const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['GEOIP_KEY', 'CSE_KEY']);

function getGeo(googleMapResponse) {
    request.post(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=' + process.env.GEOIP_KEY,
        { json: { headers: {
            'Content-Type': 'application/json'
    } } }).then(body => {
        googleMapResponse(body);
    }).catch((error, response)=>{
        console.log("GEOLOCATION ERROR");
        if(response && response.statusCode){
            console.log("Google Geolocation API returned error " + response.statusCode);
        }
        console.log(error);
    });
}

module.exports = {
    getGeo: getGeo
}