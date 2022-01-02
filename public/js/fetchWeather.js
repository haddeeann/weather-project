
const weatherForm = document.getElementById('weatherForm');
let messageOne = document.getElementById('messageOne');
let messageTwo = document.getElementById('messageTwo');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let location = document.getElementById('locationInput');
    if(location.value) {
        messageOne.textContent = 'Loading...';
        messageTwo.textContent = '';
        searchWeather(location.value);
    } else {
        messageOne.textContent = 'Please enter a value in the form field and submit.';
        messageTwo.textContent = '';
    }
});

const searchWeather = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        if(!response) {
            messageOne.textContent = 'There is a network connectivity error to get location response';
            messageTwo.textContent = '';
            return;
        }
        response.json().then(data => {
            if(!data || data.error) {
                messageOne.textContent = 'Getting weather data from UI did not work';
                messageTwo.textContent = '';
            } else {
                messageOne.textContent = '';
                let weatherObj = {
                    weather: data.weather[0].main,
                    temp: (data.main.temp - 273.15) * 1.8 + 32,
                    lon: data.coord.lon,
                    lat: data.coord.lat,
                    pressure: data.main.pressure,
                    humidity: data.main.humidity,
                    windSpeed: data.wind.speed,
                    windGust: data.wind.gust,
                    sunrise: data.sys.sunrise,
                    sunset: data.sys.sunset,
                    currentTime: '',
                    visibility: data.visibility,
                    icon: data.weather[0].icon,
                    weatherDescription: data.weather[0].description,
                    minTemp: data.main.temp_min,
                    maxTemp: data.main.temp_max,
                    clouds: data.clouds.all,
                    nameOfPlace: data.name,
                    country: data.sys.country,
                };
 
                for(let weather in weatherObj) {
                    let liElement = document.createElement('li');
                    let textContent = document.createTextNode(`${weather} is ${weatherObj[weather]}`);
                    liElement.appendChild(textContent);
                    messageTwo.appendChild(liElement);
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
