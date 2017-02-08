const request = require('request-promise');
const http = require('http');
const dotenv = require('dotenv').config();
const requireEnv = require('require-environment-variables');
const winston = require('winston');
requireEnv(['IMAGESEARCH_KEY', 'LOG_LEVEL']);
winston.level = process.env.LOG_LEVEL;

function getImage(searchParam, imageResponse) {

    request.get('https://www.googleapis.com/customsearch/v1?key='+process.env.IMAGESEARCH_KEY+'&cx='+process.env.CSE_KEY+'&q='+searchParam.type+'&searchType=image&imgSize=large&alt=json')
        .then(body=>{
            var newResponse = JSON.parse(body);
            winston.debug("GET IMAGE RESPONSE");

            newResponse.items.forEach(item=>{
                winston.debug(item.link);
            })
            // winston.debug(newResponse.items[0].link);

            imageResponse({urls: newResponse.items.map(i=>i.link)});
        }).catch((err, response)=>{
            winston.error("GET IMAGE RESPONSE Failed");
            var responseCode = response && response.statusCode ? response.statusCode : "NONE";
            winston.error("Failed with response code "+ responseCode);
            winston.error(response);            
        })
}

module.exports = {
    getImage: getImage
}