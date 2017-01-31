const request = require('request');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['GEOIP_KEY', 'CSE_KEY']);

function getGeo(googleMapResponse) {
    request.post(
        'https://www.googleapis.com/geolocation/v1/geolocate?key=' + process.env.GEOIP_KEY,
        { json: { headers: {
            'Content-Type': 'application/json'
        } } },
        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                googleMapResponse(body);
                return;
            }
            console.log("Google Geolocation API returned error " + response.statusCode);
            console.log(error);
        }
    );
}

module.exports = {
    getGeo: getGeo
}