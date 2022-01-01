const path = require('path');
const express = require('express');
const hbs = require('hbs');
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
    res.render('weather', info('WEATHER'));
});

app.listen(3000, () => {
    console.log('listening on port 3000');
});