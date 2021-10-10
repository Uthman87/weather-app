const path = require('path')
const request = require('request')
const express = require('express')
const forecast = require('./utils/forecast')
const geocode = require('./utils/geocode')
const hbs = require('hbs')
const app = express()

const publicPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../template/views')
const partialsPath = path.join(__dirname, '../template/partials')

app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicPath))


app.get('/', (req, res) => {
    res.render('index', {
        name: 'Uthman Adam',
        title: 'Weather App'
    })
})

app.get('/weather', (req, res) => {
    if(!req.query.address) {
        return res.send({
            error: 'Please provide an address'
        })
    }

    geocode(req.query.address, (error, { latitude, longitude, location} = {}) => {
        if(error) {
          return  res.send( {error})
        } 
        forecast(latitude, longitude, (error, forecastData) => {
            if(error) {
                return res.send({ error })
            }

            res.send({
                forecastData,
                location
            })
        })
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        name: 'Uthman Adam',
        title: 'About'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Uthman Adam'
    })
})

app.get('/contact', (req, res) => {
    res.render('contact', {
        title: 'Contact us',
        name: 'Uthman Adam'
    })
})

app.get('*', (req, res) => {
    res.render('404', {
        error: 'Page not found!'
    })
})

app.listen(3000, () => {
    console.log('Listening to port 3000')
})
