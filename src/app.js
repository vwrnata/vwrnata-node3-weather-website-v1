const path = require('path')
const express = require('express')
const hbs = require('hbs')

const request = require('request');
const geocode = require('./utils/geocode.js');
const forecast = require('./utils/forecast');

const app = express()
const port = process.env.PORT || 3000

// Define paths for Express config
const publicDirectoryPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

/** Setup handlebars engine and views location */
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

// Setup static directore to serve
app.use(express.static(publicDirectoryPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Vojtech Wrnata'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About Me',
        name: 'Vojtech Wrnata'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        helpText: 'This is some helpful text.',
        title: 'Help',
        name: 'Vojtech Wrnata'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address){
        return res.send({
            error: "Zadej adresu!"
        })
    }

    geocode.geocode(req.query.address, (error, {latitude, longitude, location} = {}) => {
        if(error){
            return res.send({
                error: error
            })
        }
        // console.log('Data', data)
        // latitude = data.latitude
        // longitude = data.longitude
        // location = data.location
    
        // console.log(latitude)
        // console.log(longitude)
        // console.log(location)
        forecast(latitude, longitude, (error, forecastData) => {
            if(error){
                return res.send({
                    error: error
                })
            }
            // console.log('Data', forecastData)
            // console.log(location)
            // console.log(forecastData)

            res.send({
                forecast: forecastData,
                location,
                address: req.query.address
            })
            // res.render('weather', {
            //     forecast: forecastData,
            //     location: location,
            //     title: 'Weather',
            //     name: "Vojtěch Wrnata",
            //     address: req.query.address
            // })
        })
    })
    
})

app.get('/help/*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Help article not found',
        name: 'Vojtech Wrnata'
    })
})

/** musí být na konci */
app.get('*', (req, res) => {
    res.render('404', {
        title: '404',
        errorMessage: 'Page not found',
        name: 'Vojtech Wrnata'
    })
})

app.listen(port, () => {
    console.log('Server is up on port ' + port + '.')
})