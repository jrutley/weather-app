const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['WEATHER_KEY']);

function getWeather(position, weatherResponse) {
    request.get("http://api.openweathermap.org/data/2.5/weather?appid="+process.env.WEATHER_KEY+"&lat="+position.lat+"&lon="+position.long)
        .then(body => {
                console.log("WEATHER RESPONSE:")
                var weather = JSON.parse(body);
                console.log(weather);
                weatherResponse(weather);
        }); // TODO: Handle Error case
}

module.exports = {
    getWeather: getWeather
}