var blurb = $("#blurb");
var weather = $("#weather");

function updateWeather(latitude, longitude){
    weather.html("api.openweathermap.org/data/2.5/weather?lat="+latitude+"&lon="+longitude);
}

function useGoogleApi(){
    // Next try the Google API
    $.getJSON("/geo", resp => {
        var location = resp.location;
        blurb.html("Your position is lat " + location.lat + " lng " + location.lng);
        updateWeather(location.lat, location.longitude);
    });
}

function processGeolocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
        var coords = position.coords;
        blurb.html("Your position is " + coords.latitude + " " + coords.longitude);
        updateWeather(coords.latitude, coords.longitude);
    }, function(error){
        useGoogleApi();
        //$("#blurb").html("Couldn't get your location: " +error.message + " Maybe we should try by IP address");
    });
}

if ("geolocation" in navigator) {
    processGeolocation();
} else {
    /* geolocation IS NOT available */
    document.write("Sorry, no weather for you")
}