var blurb = $("#blurb");
var weather = $("#weather");

function updateWeather(latitude, longitude){
    $.getJSON( "/weather?lat="+latitude+"&long="+longitude, resp => {
        console.log("Weather response:");
        console.log(resp);
        var mainWeatherResult = resp.weather[0].main;
        getBackgroundImage(mainWeatherResult);
        weather.html(mainWeatherResult);
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
        console.log("Failed to update weather");
    })
    .always(function() {
        console.log( "Finished weather update" );
    });    

}

function updateBackground(imageUrl){
    $('body').css('background-image', 'url(' + imageUrl + ')');
}

function useGoogleLocationApi(){
    $.getJSON( "/geo", resp => {
        var location = resp.location;
        blurb.html("Your position is lat " + location.lat + " lng " + location.lng);
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
        blurb.html("Your position is " + coords.latitude + " " + coords.longitude);
        updateWeather(coords.latitude, coords.longitude);
    }, function(error){
        useGoogleLocationApi();
    });
}

useGoogleLocationApi();