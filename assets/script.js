var searchByCityEl = $('#city-input-form');
var searchHistoryEl = $('#city-list-output-form');

var searchIn = " "
var openWeather = " "


// Logging info in search bar

function handleSearchFormSubmit(e) {
    e.preventDefault();

    var lookForItem = $('input[name="search-input"]').val();

    if (!lookForItem) {
        console.log.error('You need a search input value.');
        return;
    }

    var cityHistoryEl = $('<ul class="flex-row justify-space-between align-center p-2 bg-light text-dark">'
    );
    cityHistoryEl.text(lookForItem);

    // add delete button to remove shopping list item BUT the button is to big 
    //Review tomorrow
    // cityHistoryEl.append("<a href=#>"+ search-input + "</a>");
        
    // print to the page
    searchHistoryEl.append(cityHistoryEl)
     
    // clear the form input element
  $('input[name="search-input"]').val('');
}

    function handleRemoveItem(e) {
    // convert button we pressed (`event.target`) to a jQuery DOM object
        var btnClicked = $(e.target);
    
    // get the parent `<li>` element from the button we pressed and remove it
  btnClicked.parent('li').remove();

    }


    

    var weatherUrl = 'https://api.openweathermap.org/data/2.5/forecast?q=' + lookForItem + '&appid=83bfd30adb45fad9c7a7ec2e50b6b625'

    fetch(weatherUrl).then(function (response) {
        return response.json();
    })
        .then(function (data) {
            console.log(data);

            var lat = data.city.coord.lat;
            var lon = data.city.coord.lon;

            console.log(lat);
            console.log(lon);



            var uvIndex = 'https://api.openweathermap.org/data/2.5/onecall?lat=' + lat + '&lon=' + lon + '&exclude=hourly,minutely&appid=83bfd30adb45fad9c7a7ec2e50b6b625'

    
            fetch(weatherUrl).then(function (response) {
                return response.json();
            })
                .then(function (data) {
                    console.log(data);
                });


            var queryString = './search-result.htm'
            queryString.text(lookForItem);
        })
        


        searchHistoryEl.on('submit', handleRemoveItem);
        searchByCityEl.on('submit', handleSearchFormSubmit)