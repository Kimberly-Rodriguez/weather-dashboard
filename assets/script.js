var searchByCityEl = $('#city-input-form');
var searchHistoryEl = $('#city-list');



var searchHistoryArray = JSON.parse(localStorage.getItem("searchHistoryArray")) || [] ;

//function for list know to got to the array

function allHistorySearch() {
//looping the array of cities

    for (let i = 0; i < searchHistoryArray.length; i++) {
        var cityHistoryEl = $('<button>');
        // adding text the items being passed by the array
        cityHistoryEl.text(searchHistoryArray[i]);

        // print to the page
        searchHistoryEl.append(cityHistoryEl)
    }
};

searchHistoryEl.text(searchHistoryArray);

// Logging info in search bar



function handleSearchFormSubmit(e) {
    e.preventDefault();

    var lookForItem = $('input[name="search-input"]').val();

    var cityHistoryEl = $('<button>');

    cityHistoryEl.text(lookForItem);

    searchHistoryArray.push(lookForItem);

    // print to the page
    searchHistoryEl.append(cityHistoryEl)

    // clear the form input element
    $('input[name="search-input"]').val('');

    localStorage.setItem("searchHistoryArray", JSON.stringify(searchHistoryArray));
}


function handleRemoveItem(e) {
    // convert button we pressed (`event.target`) to a jQuery DOM object
    var btnClicked = $(e.target);

    // get the parent `<li>` element from the button we pressed 
    btnClicked.parent('li');

}


// var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + lookForItem + '&appid=83bfd30adb45fad9c7a7ec2e50b6b625'

// fetch(weatherUrl).then(function (response) {
//     return response.json();
// })
//     .then(function (data) {
//         console.log(data);

//         var lat = data.city.coord.lat;
//         var lon = data.city.coord.lon;

//         console.log(lat);
//         console.log(lon);



//         var uvIndex = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=83bfd30adb45fad9c7a7ec2e50b6b625'


//         fetch(weatherUrl).then(function (response) {
//             return response.json();
//         })
//             .then(function (data) {
//                 console.log(data);
//             });


//         var queryString = './search-result.htm'
//         queryString.text(lookForItem);
//     })



//when the user clicks on the search button the functioin heandleSearchSubmit runs
searchByCityEl.on('submit', handleSearchFormSubmit)
allHistorySearch();