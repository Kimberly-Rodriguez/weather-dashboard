var searchByCityEl = $("#city-input-form");
var searchHistoryEl = $("#city-list");
var cityName = $("#cityName");
var temp = $("#temp");
var wind = $("#wind");
var humidity = $("#humidity");
var uvIndex = $("#uvIndex");
var dateToday = $("#dateToday");

var today = moment();

console.log(today.format("MMMM Do, YYYY"));

var searchHistoryArray =
  JSON.parse(localStorage.getItem("searchHistoryArray")) || [];

//function for list know to got to the array

function allHistorySearch() {
  //looping the array of cities

  for (let i = 0; i < searchHistoryArray.length; i++) {
    var cityHistoryEl = $("<button>");
    // adding text the items being passed by the array
    cityHistoryEl.text(searchHistoryArray[i]);

    cityHistoryEl.on("click", lastButtonClick);


    // print to the page
    searchHistoryEl.append(cityHistoryEl);
  }
}
function lastButtonClick() {
  searchForItem($(this).text())
}

// Logging info in search bar

function handleSearchFormSubmit(e) {
  e.preventDefault();

  var lookForItem = $('input[name="search-input"]').val();

  var cityHistoryEl = $("<button>");

  cityHistoryEl.text(lookForItem);

  searchHistoryArray.push(lookForItem);

  // print to the page
  searchHistoryEl.append(cityHistoryEl);

  // clear the form input element
  $('input[name="search-input"]').val("");

  localStorage.setItem(
    "searchHistoryArray",
    JSON.stringify(searchHistoryArray)
  );

  searchForItem(lookForItem);
}

function searchForItem(location) {
  var weatherUrl =
    "https://api.openweathermap.org/data/2.5/weather?q=" +
    location +
    "&appid=83bfd30adb45fad9c7a7ec2e50b6b625&units=imperial";

  fetch(weatherUrl)
    .then(function (response) {
      return response.json();
    })
    .then(function (data) {
      console.log(data);

      var lat = data.coord.lat;
      var lon = data.coord.lon;

      console.log(lat)
      console.log(lon);

      var uvIndexUrl =
        "https://api.openweathermap.org/data/2.5/onecall?lat=" +
        lat +
        "&lon=" +
        lon +
        "&units=imperial&exclude=hourly,minutely&appid=83bfd30adb45fad9c7a7ec2e50b6b625";

      fetch(uvIndexUrl)
        .then(function (response) {
          return response.json();
        })
        .then(function (data) {
          console.log(data);

          cityName.text(location);
          temp.text(data.current.temp);
          wind.text(data.current.wind_speed);
          humidity.text(data.current.humidity);
          uvIndex.text(data.current.uvi);
          dateToday.text(today.format("MMMM Do, YYYY"));

          //the weather icons

          

           for (let i = 1; i < 6; i++) {
             $("#date-card0" + i).text(moment.unix(data.daily[i].dt).format("MMMM Do, YYYY"));
             $("#temp-card0" + i).text(data.daily[i].temp.day);
             $("#wind-card0" + i).text(data.daily[i].wind_speed);
             $("#humi-card0" + i).text(data.daily[i].humidity);

          var iconCode = data.daily[i].weather[0].icon;
          var iconUrl =  "https://api.openweathermap.org/data/2.5/onecall?lat=" + iconCode +  "&units=imperial&exclude=hourly,minutely&appid=83bfd30adb45fad9c7a7ec2e50b6b625";

             $("#icon-card0" + i).attr('span',iconUrl);
             

           }
        });

     
    });
}

function handleRemoveItem(e) {
  // convert button we pressed (`event.target`) to a jQuery DOM object
  var btnClicked = $(e.target);

  // get the parent `<li>` element from the button we pressed
  btnClicked.parent("li");
}

//when the user clicks on the search button the functioin heandleSearchSubmit runs
searchByCityEl.on("submit", handleSearchFormSubmit);
allHistorySearch();
