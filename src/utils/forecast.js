const request = require('request');
const weather = require('../keys/weather');

const forecast = (latitude, longitude, callback) => {
    const url = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${weather.key}`;
                 
    request({ url, json: true }, (error, { body }) => {
        if(error) {
            callback('Unable to get weather report', undefined);
        } else {
            callback(undefined, body);
        }
    });
}

module.exports = forecast;