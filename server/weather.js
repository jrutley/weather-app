const request = require('request');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['WEATHER_KEY']);

function getWeather(position, weatherResponse) {
    request.get(
        "http://api.openweathermap.org/data/2.5/weather?appid="+process.env.WEATHER_KEY+"&lat="+position.lat+"&lon="+position.long,

        function (error, response, body) {
            if (!error && response.statusCode == 200) {
                console.log("WEATHER RESPONSE:")
                console.log(body)
                weatherResponse(JSON.parse(body));
            }
        }
    );
}

module.exports = {
    getWeather: getWeather
}