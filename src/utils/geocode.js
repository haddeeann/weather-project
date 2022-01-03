const request = require('request');
const mapbox = process.env.MAPBOX_KEY;

const geocode = (address = 'philadelphia', callback = () => {}) => {
    const url = `https://api.mapbox.com/geocoding/v5/mapbox.places/${address}.json?access_token=${mapbox}`;

    request({ url, json: true }, (error, { body }) => {
        if(error || body.features.length === 0) {
            return callback('Unable to use location services', undefined);
        }

        let latitude = body.features[0].center[1];
        let longitude = body.features[0].center[0];
        let location = body.features[0].place_name;

        callback(undefined, {
            latitude,
            longitude,
            location
        });
    })
}

module.exports = geocode;