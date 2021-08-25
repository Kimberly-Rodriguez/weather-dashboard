var searchFormEl = $('#search-form');
var groupInput = $('.list-group-item input-history');
var cityDashInfo = $('.col-12 nameDetails');

// Logging info in search bar

function handleSearchFormSubmit(e) {
    e.preventDefault();

    var lookForItem = $('input[name="search-input"]').val();
    if (!lookForItem) {
        console.log.error('You need a search input value.');
        return;
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
        }

searchFormEl.on('submit', handleSearchFormSubmit);