var city = $("#city");
var weather = $("#weather");
var temperature = $("#temperature");
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
        weather.html(mainWeatherResult);
        city.html(resp.name);
        kelvin = resp.main.temp;
        setTemperature();
        $("#unitBtn").css({visibility: "visible"});
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

function getBackgroundImage(isNight, weatherType){
    var weather = weatherType + isNight ? " night" : "";
    $.getJSON( "/images?type=" + weather, resp => {
        console.log("Image response:");
        console.log(resp);
        var imgUrl = resp;
        updateBackground(imgUrl);
    })
    .fail(function() {
        console.log("Failed to update background image");
    })
    .always(function() {
        console.log( "Finished background image update" );
    });    
}

function updateBackground(imageUrl){
    $('body').css('background-image', 'url(' + imageUrl.url + ')');
    $('body').css('background-size', 'cover');
}

function useGoogleLocationApi(){
    $.getJSON( "/geo", resp => {
        var location = resp.location;
        updateWeather(location.lat, location.lng);
    })
    .catch(function() {
        console.log("Failed to get Google Geolocation");
        processGeolocation();
    })
    .always(function() {
        console.log( "Google API call complete" );
    });    
}

function processGeolocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
        var coords = position.coords;
        updateWeather(coords.latitude, coords.longitude);
    }, function(error){
        useGoogleLocationApi();
    });
}

useGoogleLocationApi();