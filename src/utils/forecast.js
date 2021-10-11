const request = require('request')

const forecast = (latitude, longitude, callback) => {
    const url = 'http://api.weatherstack.com/current?access_key=6619c316380e4a2b70d93ea84b2ca391&query='+latitude+','+longitude+'&units=m'

    request({url: url, json: true}, (error, { body } = {}) => {
        if(error) {
            callback('Unable to connect to weather services', undefined)
        } else if(body.error) {
            callback('Unable to find location! Please another search', undefined)
        } else {
            const data = body.current
            callback(undefined, `${data.weather_descriptions}. It is currently ${data.temperature} degrees out. It feels ${data.feelslike} degrees out. Humidity is ${data.humidity}%`)
        }
    })
}

module.exports = forecast