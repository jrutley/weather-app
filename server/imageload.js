const req = require('request');
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
            winston.debug(newResponse.items[0].link)

            req.get({url:newResponse.items[0].link,followRedirect:false, encoding: null}, function (error, response, body) {
                if (!error && response.statusCode == 200) {
                    data = "data:" + response.headers["content-type"] + ";base64," + new Buffer(body).toString('base64');
                    imageResponse({image: data});
                }
            });
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