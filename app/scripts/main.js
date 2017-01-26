function processGeolocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
        $("#blurb").html("My position is " + position.coords.latitude + " " + position.coords.longitude);
        $("#weather").html("api.openweathermap.org/data/2.5/weather?lat="+position.coords.latitude+"&lon="+position.coords.longitude);
}, function(error){
    $("#blurb").html("Couldn't get your location: " +error.message);
});
}

if ("geolocation" in navigator) {
    processGeolocation();
} else {
  /* geolocation IS NOT available */
  document.write("Sorry, no weather for you")
}