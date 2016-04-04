$(document).ready(function() 
{
  var latitude;
  var longitude;
  var backgroundImageURL;
  var icon;
  var fahrenheit = " F°";
  var celsius = " C°";
  var temperature;
  var summary;
  var i = 0;

  // get geolocation
  if (navigator.geolocation) 
  {
      navigator.geolocation.getCurrentPosition(function(position) 
      {
          latitude = position.coords.latitude;
          longitude = position.coords.longitude;
      });
  }

  // get the weather data for the location
  $("#getWeatherData").click(function()
  {
    // hide the get weather button and show the weather info
    $("#weatherBtnDiv").hide();
    $("#weatherInfo").toggleClass("hidden");
    
    // get the current weather data from forecase.io
    $.getJSON("https://api.forecast.io/forecast/d1013d91b403e8feeb707c45aec04bb3/"+ latitude + "," + longitude + "?callback=?", function(json)
    {
       console.log(json);
       temperature = json.currently.temperature;
       icon = json.currently.icon;
       summary = json.currently.summary;
     
       $("body").css({'background-image' : 'url('+ getBackgroundImage(icon) +')', 'background-repeat' : 'no-repeat', 'background-size' : 'cover'});
       $("#temperature").text(temperature + ' F°');
       $("#summary").text(summary);
    });
    // $.getJSON("//api.geonames.org/findNearbyPlaceNameJSON?lat=" + latitude + "&lng=" + longitude +"&username=demo&callback=?", function(json)
    // {
    //   $("#location").text(json.geonames[0].name + ", " + json.geonames[0].countryCode);
    // });
    $.ajax({
          type: "GET",
          url: "//api.geonames.org/findNearbyPlaceNameJSON?lat=" + latitude + "&lng=" + longitude +"&username=demo&callback=?",
          contentType: "application/json; charset=utf-8",
          async: false,
          dataType: "json",
          success: function (data) 
          {
            $("#location").text(data.geonames[0].name + ", " + data.geonames[0].countryCode);           
      }
        });


  });


  // get background image
function getBackgroundImage(icon)
{
  switch(icon)
  {
    case 'clear-day':
      backgroundImageURL = "https://pixabay.com/static/uploads/photo/2012/03/04/00/01/background-21717_960_720.jpg";
      break;
    case 'clear-night':
      backgroundImageURL = "http://orig11.deviantart.net/81b0/f/2013/353/5/b/on_a_clear_night_sky__background__by_oakfur422-d6yl3xc.png";
      break;
    case 'rain':
      backgroundImageURL = "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS5jHVTcjULfJl1pxqDIefWJFXuYhZBQk4lVGw9h-nfIzOmkjmCDA";
      break;
    case 'snow':
      backgroundImageURL = "http://wallpapercave.com/wp/k15SYSI.jpg";
      break;
    case 'sleet':
      backgroundImageURL = "https://www.colourbox.com/preview/3194154-a-strong-storm-with-sleet-in-the-winter-forest.jpg";
      break;
    case 'wind':
      backgroundImageURL = "http://hdwallpaperwebs.com/wp-content/uploads/2015/09/Dandelion-Flowers-Free-HD-Background-Wallpaper-06.jpg";
      break;
    case 'fog':
      backgroundImageURL = "https://encrypted-tbn1.gstatic.com/images?q=tbn:ANd9GcQ2L6BNbx02Tm6mmjRDxEETQ3M3ZTmKOtIGOfY_DwkXIosFOF97FA";
      break;
    case 'cloudy':
      backgroundImageURL = "https://wallpaperscraft.com/image/road_field_clouds_cloudy_horizon_46240_2560x1600.jpg";
      break;
    case 'partly-cloudy-day':
      backgroundImageURL = "http://images.mentalfloss.com/sites/default/files/styles/article_640x430/public/474095061.jpg";
      break;
    case 'partly-cloudy-night':
      backgroundImageURL = "http://cdn.weatheravenue.com/img/background/background-night.jpg";
      break;
    default:
      backgroundImageURL = "https://pixabay.com/static/uploads/photo/2012/03/04/00/01/background-21717_960_720.jpg";
      break;

  }
  return backgroundImageURL;
}


// fahrenheit to celsius
  function fahConvert()
  {
    return ((temperature  -  32)  *  5/9).toFixed(1);

  }


  // change weather icon
  $("#measurementBtn").click(function()
  {
    
      $("#temperature").toggleClass('fahrenheit');

      if($("#temperature").hasClass('fahrenheit'))
      { 
        $("#temperature").text(temperature + fahrenheit);
      }
      else
        $("#temperature").text(fahConvert() + celsius);
    
  });

});

