const request = require('request');

const mapUrl = 'https://api.mapbox.com/geocoding/v5/'
const endPoint = 'mapbox.places/'
const token = 'access_token=pk.eyJ1Ijoidm9qdGF3IiwiYSI6ImNrNWtzdzc3NTA1c2MzbW56bWRycjdkZDkifQ.lxoP8bP3qb5GQBNMhCJduQ'
const setup = '&limit=1'
const gUrl = (criteria) => {
    return mapUrl + endPoint + encodeURIComponent(criteria) + '.json?' + token + setup
}

const geocode = (address, callback) => {
    const url = gUrl(address)
    // console.log(url)
    request({ url: url, json: true }, (error, response) => {
        if (error) {
            callback('Unable to connect to location service!', undefined)
        } else if (response.body.features.length === 0) {
            callback('Unable to find location. Try another search.', undefined)
        } else {
            const latitude = response.body.features[0].center[1]
            const longitude = response.body.features[0].center[0]
            const placeName = response.body.features[0].place_name
            // console.log(latitude, longitude)
            // callback(undefined, response.body.features[0].center)
            callback(undefined, {
                latitude: latitude,
                longitude: longitude,
                location: response.body.features[0].place_name,
                place_name: placeName
            })
        }
    })
}

module.exports = {
    geocode
}