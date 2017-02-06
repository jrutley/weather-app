const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
const winston = require('winston');
requireEnv(['WEATHER_KEY', 'LOG_LEVEL']);
winston.level = process.env.LOG_LEVEL;

function getWeather(position, weatherResponse) {
    var query = "http://api.openweathermap.org/data/2.5/weather?appid="+process.env.WEATHER_KEY+"&lat="+position.lat+"&lon="+position.long;
    request.get(query)
        .then(body => {
                var weather = JSON.parse(body);
                winston.debug("WEATHER RESPONSE:", {weather: weather});
                weatherResponse(weather);
        }).catch(err=>{
            console.log(err); // TODO: Handle Error case
        });
}

module.exports = {
    getWeather: getWeather
}