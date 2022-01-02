const path = require('path');
const express = require('express');
const hbs = require('hbs');
const geocode = require('./utils/geocode');
const forecast = require('./utils/forecast');
// define paths for express config
const publicDir = path.join(__dirname, '../public');
const viewsPath = path.join(__dirname, '../templates/views');
const partialsPath = path.join(__dirname, '../templates/partials');

const app = express();

// set up hb views and location
app.set('view engine', 'hbs');
app.set('views', viewsPath);
hbs.registerPartials(partialsPath);

// set up static dir to sever
app.use(express.static(publicDir));

const info = (pageTitle) => {
    return {
        header: 'Find Out the Weather',
        pageTitle: `${pageTitle}`,
    }
}

app.get('', (req, res) => {
    res.render('index', {
        header: 'Find Out the Weather',
        pageTitle: 'WEATHER',
    });
});

app.get('/about', (req, res) => {
    res.render('about', {
        header: 'Find Out the Weather',
        pageTitle: 'ABOUT',
    });
});

// backend point
app.get('/weather', (req, res) => {
    if(!req.query || !req.query.address) {
        return res.send('Please provide location in url.');
    }
    let addressQuery = req.query ? req.query.address : '';
    geocode(addressQuery, (err, data) => {
        // err is text error message sent
        if(err) {
            return res.send('Error in retreving location data.');
        }

        forecast(data.latitude, data.longitude, (error, weatherData) => {
            // error is text error message sent
            if(error) {
                return res.send('Error in retreiving weather data.');
            }

            return res.send(weatherData);
        });
    });
});

app.get('*', (req, res) => {
    res.render('universe', info('This url does not exist.'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});