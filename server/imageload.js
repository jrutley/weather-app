const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
requireEnv(['IMAGESEARCH_KEY']);

function getImage(searchParam, imageResponse) {

    request.get('https://www.googleapis.com/customsearch/v1?key='+process.env.IMAGESEARCH_KEY+'&cx='+process.env.CSE_KEY+'&q='+searchParam.type+'&searchType=image&imgSize=large&alt=json')
        .then(body=>{
            var newResponse = JSON.parse(body);
            console.log("GET IMAGE RESPONSE");
            console.log(newResponse.items[0].link);

            imageResponse({url: newResponse.items[0].link});
        }).catch((err, response)=>{
            console.log("GET IMAGE RESPONSE Failed");
            var responseCode = response && response.statusCode ? response.statusCode : "NONE";
            console.log("Failed with response code "+ responseCode);
            console.log(response);            
        })
}

module.exports = {
    getImage: getImage
}