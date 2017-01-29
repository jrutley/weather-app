var express = require('express');

const geo = require('./server/geolocation.js')

var app = express();

console.log(__dirname);
app.route("/geo").get((req,res)=>{
    const result = geo.getGeo(geoResp=>{
        res.send({location: geoResp.location});
    })
})
app.route('/weather').get((req,res)=>{

})
app.use("/", express.static('client'));
app.listen(3000);
console.log('Express listening on port 3000');