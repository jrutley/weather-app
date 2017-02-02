const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['WEATHER_KEY']);

function getWeather(position, weatherResponse) {
    request.get("http://api.openweathermap.org/data/2.5/weather?appid="+process.env.WEATHER_KEY+"&lat="+position.lat+"&lon="+position.long)
        .then(body => {
                console.log("WEATHER RESPONSE:")
                console.log(body)
                weatherResponse(JSON.parse(body));
        }); // TODO: Handle Error case
}

module.exports = {
    getWeather: getWeather
}