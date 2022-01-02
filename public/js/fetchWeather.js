
const searchWeather = (location) => {
    fetch(`http://localhost:3000/weather?address=${location}`).then(response => {
        if(!response) {
            console.log('there is a network connectivity error to get location response');
            return;
        }
        response.json().then(data => {
            if(!data || data.error) {
                console.log('Getting weather data from UI did not work');
            } else {
                console.log(data);
            }
        })
    });
}

const weatherForm = document.getElementById('weatherForm');

weatherForm.addEventListener('submit', (event) => {
    event.preventDefault();
    let location = document.getElementById('locationInput');
    if(location.value) {
        searchWeather(location.value);
    } else {
        console.log('please enter a value in the form field and submit.');
    }
});