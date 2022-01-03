
const weatherForm = document.getElementById('weather-form');
let messageOne = document.getElementById('message-one');
let weatherLocations = document.getElementById('weather-location');
let weatherDescribe = document.getElementById('weather-description');
let weatherLabels = document.getElementById('weather-labels');

const resetLabels = () => {
    weatherLocations.textContent = '';
    weatherDescribe.textContent = '';
    weatherLabels.textContent = '';
}

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    resetLabels();
    let location = document.getElementById('location-input');
    if(location.value) {
        messageOne.textContent = 'Loading...';
        searchWeather(location.value);
    } else {
        messageOne.textContent = 'Please enter a value in the form field and submit.';
    }
});

const searchWeather = (location) => {
    fetch(`/weather?address=${location}`).then(response => {
        if(!response) {
            messageOne.textContent = 'There is a network connectivity error to get location response';
            return;
        }
        response.json().then(data => {
            if(!data || data.error) {
                messageOne.textContent = 'Getting weather data from UI did not work';
            } else {
                messageOne.textContent = '';
                // gathering label for a todo later
                let todo = {
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    windGust: data.wind.gust,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    currentTime: '',
                    icon: data.weather[0].icon,
                    visibility: data.visibility,
                    clouds: data.clouds.all,
                }

                let li = document.createElement('li');
                let text = document.createTextNode(`${data.name} in ${data.sys.country}`);
                li.appendChild(text);
                weatherLocations.appendChild(li);

                li = document.createElement('li');
                text = document.createTextNode(`${data.weather[0].main} / ${data.weather[0].description}`);
                li.appendChild(text);
                weatherDescribe.appendChild(li);

                let labels = {
                    temp: ((data.main.temp - 273.15) * 1.8 + 32).toFixed(),
                    lowTemp: ((data.main.temp_min - 273.15) * 1.8 + 32).toFixed(),
                    highTemp: ((data.main.temp_max -273.15) * 1.8 + 32).toFixed(),
                };
 
                for(let weather in labels) {
                    li = document.createElement('li');
                    text = document.createTextNode(`${weather}: ${labels[weather]}F`);

                    li.appendChild(text);
                    weatherLabels.appendChild(li);
                }
            }
        })
    });
}

const exampleReturnWeather = {
    "coord": {
        "lon": -82.3248,
        "lat": 29.6519
    },
    "weather": [
        {
            "id": 800,
            "main": "Clear",
            "description": "clear sky",
            "icon": "01d"
        }
    ],
    "base": "stations",
    "main": {
        "temp": 300.04,
        "feels_like": 301.16,
        "temp_min": 299.27,
        "temp_max": 301.31,
        "pressure": 1015,
        "humidity": 61
    },
    "visibility": 10000,
    "wind": {
        "speed": 1.34,
        "deg": 262,
        "gust": 4.47
    },
    "clouds": {
        "all": 1
    },
    "dt": 1641154443,
    "sys": {
        "type": 2,
        "id": 2007294,
        "country": "US",
        "sunrise": 1641126275,
        "sunset": 1641163308
    },
    "timezone": -18000,
    "id": 4156404,
    "name": "Gainesville",
    "cod": 200
}
