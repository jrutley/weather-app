var city = $("#city");
var weather = $("#weather");
var temperature = $("#temperature");
var country = $("#country");
var isCelsius = true;
var kelvin = undefined;

$( "#unitBtn" ).click(function() {
    isCelsius = !isCelsius;
    setTemperature();
});

function setTemperature(){
    var displayUnits = isCelsius ? "° C" : "° F";
    var buttonUnits = isCelsius ? "to F" : "to C";
    $("#unitBtn").html(buttonUnits);
    temperature.html(getTemperature(kelvin, isCelsius) + displayUnits);
    $("#weatherDisplay").css("display", "block");
    $("#loading").css("display", "none");
}

function isNightTime(sunrise, sunset, currentUnixTime){
    return currentUnixTime < sunrise || currentUnixTime > sunset;
}

function updateWeather(latitude, longitude){
    $.getJSON( "/weather?lat="+latitude+"&long="+longitude, resp => {
        console.log("Weather response:");
        console.log(resp);
        var currentUnixTime = Date.now() / 1000;
        var mainWeatherResult = resp.weather[0].description;

        getBackgroundImage(isNightTime(resp.sys.sunrise, resp.sys.sunset, currentUnixTime), mainWeatherResult); 
        weather.html(resp.weather[0].main);
        city.html(resp.name);
        country.html(resp.sys.country);
        kelvin = resp.main.temp;
        setTemperature();
    })
    .fail(function() {
        console.log("Failed to update weather");
    })
    .always(function() {
        console.log( "Finished weather update" );
    });    
}

function getTemperature(unitInKelvin, isCelsius){
    var unitInC = Math.round(unitInKelvin - 273.15);
    return isCelsius ? unitInC : unitInC * 9 / 5 + 32
}

function getBackgroundImage(isNight, weatherType) {
    var weather = weatherType + (isNight ? " night" : "");

    $.getJSON( "/images?type=" + weather, resp => {
        var imgUrls = resp.urls;
        imgUrls.forEach(imgUrl=>{

            fetch(imgUrl, {mode: 'cors'})  
            .then(  
                function(response) { 
                    console.log("RESPONSE:");
                    console.log(response); 
                if (response.status !== 200) {  
                    console.log('Looks like there was a problem. Status Code: ' +  
                    response.status);  
                    return;  
                }

                updateBackground(imgUrl);
                $("#unitBtn").css({visibility: "visible"});

                console.log(response);
                }  
            )  
            .catch(function(err) {  
                console.log('Fetch Error :-S', err);  
            });
        })
    })
    .fail(function() {
        console.log("Failed to update background image");
    })
    .always(function() {
        console.log( "Finished background image update" );
    });    
}

function updateBackground(imageUrl){
    $('body').css('background-image', 'url(' + imageUrl + ')');
    $('body').css('background-size', 'cover');
}

function useGoogleLocationApi(){
    $.getJSON( "/geo", resp => {
        var location = resp.location;
        updateWeather(location.lat, location.lng);
    })
    .catch(function() {
        console.log("Failed to get Google Geolocation");
    })
    .always(function() {
        console.log( "Google API call complete" );
    });    
}

function ipFallback(locationResult){
    var location = {latitude: 0, longitude: 0};
    $.getJSON("http://ipinfo.io/json", resp => {
        var result = resp.loc.split(",");
        console.log(result);
        location.latitude = result[0]
        location.longitude = result[1];
    })
    .catch(err=>{
        console.log(err);
        console.log("Failed to get location from IP address");
    })
    .always(()=>{

        locationResult(location);
    });
}

function processGeolocation(){
    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(position => {
            coords = position.coords;
            updateWeather(coords.latitude, coords.longitude);
        }, error => {
            console.log("Error getting location. Falling back to IP address");
            ipFallback(coords=>{
                updateWeather(coords.latitude, coords.longitude);
            });
        });
    } else {
        ipFallback(coords=>{
            updateWeather(coords.latitude, coords.longitude);
        });
    }
}

processGeolocation();