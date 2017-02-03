var city = $("#city");
var weather = $("#weather");

function updateWeather(latitude, longitude){
    $.getJSON( "/weather?lat="+latitude+"&long="+longitude, resp => {
        console.log("Weather response:");
        console.log(resp);
        var mainWeatherResult = resp.weather[0].description;
        getBackgroundImage(mainWeatherResult);
        weather.html(mainWeatherResult);
        city.html(resp.name);
    })
    .fail(function() {
        console.log("Failed to update weather");
    })
    .always(function() {
        console.log( "Finished weather update" );
    });    
}

function getBackgroundImage(weatherType){
    $.getJSON( "/images?type="+weatherType, resp => {
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
    .fail(function() {
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