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
        title: 'Weather App',
        pageTitle: `${pageTitle} Page`,
        devName: 'Patricia'
    }
}

app.get('', (req, res) => {
    res.render('index', info('HOME'));
});

app.get('/about', (req, res) => {
    res.render('about', info('ABOUT'))
});

app.get('/help', (req, res) => {
    res.render('help', info('HELP'));
});

app.get('/weather', (req, res) => {
    if(!req.query || !req.query.address) {
        return res.send('Need to put in an address please.. and note to self, handle this more gracefully next next time');
    }
    let addressQuery = req.query ? req.query.address : '';
    geocode(addressQuery, (err, data) => {
        // err is text error message sent
        if(err) {
            return res.send(err);
        }

        forecast(data.latitude, data.longitude, (error, weatherData) => {
            // error is text error message sent
            if(error) {
                return res.send(error);
            }

            return res.send(weatherData);
        });
    });
});

app.get('/products', (req, res) => {
    if(!req.request || !req.request.search) {
        return res.send('You must provide search term');
    }

    res.send({
        products: []
    });
})

app.get(['/help/*', '/about/*'], (req, res) => {
    res.render('universe', info('the UNIVERSE IS OPEN'));
});

app.get('*', (req, res) => {
    res.render('universe', info('the UNIVERSE IS OPEN'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});