function processGeolocation(){
    navigator.geolocation.getCurrentPosition(function(position) {
        $("#blurb").html("Your position is " + position.coords.latitude + " " + position.coords.longitude);
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