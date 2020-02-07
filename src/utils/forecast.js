const request = require('request');
const serviceUrl = 'https://api.darksky.net/forecast/6d891c49b71f7dca558272e32d58d83e/'
const setup = '?units=si&limit=1'//&lang=cs

const forecastUrl = (latitude, longitude) => {
    return serviceUrl + latitude + ',' + longitude + setup
}

const forecast = (latitude, longitude, callback) => {
    const url = forecastUrl(latitude, longitude)
    // console.log(url)
    request({ url, json: true }, (error, {body}) => {
        if (error) {
            callback('Unable to connect to weather service!', undefined)
        } else if (error) {
            callback('Unable to find location', undefined)
        } else {
            console.log(body)
            callback(undefined, body.daily.data[0].summary + ' It is currently ' + body.currently.temperature + ' degress out. There is a ' + body.currently.precipProbability + '% chance of rain.' + ' Alert: ' + body.alerts[0].description)
        }
    })
}

module.exports = forecast