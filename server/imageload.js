const request = require('request');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['IMAGESEARCH_KEY']);

function getImage(searchParam, imageResponse) {
    console.log("Requesting image for parameters:");
    console.log(searchParam);
    request.get(
        'https://www.googleapis.com/customsearch/v1?key=' + process.env.IMAGESEARCH_KEY + '&cx=' + process.env.CSE_KEY + '&q='+searchParam.type,
        // { json: { headers: {
        //     'Content-Type': 'application/json'
        // } } },
        function (error, response, body) {
            console.log("GET IMAGE RESPONSE");
            if (!error && response.statusCode == 200) {
                console.log(body);
                imageResponse(body);
                return;
            }
            console.log("Failed with response code "+ response.statusCode);
            console.log(response);
        }
    );
}

module.exports = {
    getImage: getImage
}