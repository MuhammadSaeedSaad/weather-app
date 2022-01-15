// url qurey=lat,long

const request = require("request")

function forecast(latitude, longitude, callback){
    let url = "http://api.weatherstack.com/current?access_key=03afdae111b4a496eb705450d0b17cc9&query=" + latitude + "," + longitude;
    request({url: url, json: true}, (error, response) => {
        if(error){
            callback("** ERROR ** Unable to connect to the weather API", undefined)
        } else if(response.body.error){
            callback("** API ERROR ** Incorrect location. Try another search", undefined)
        } else{
            callback(undefined, { message: "It is currently " + response.body.current.temperature + " outside. and it feels like " + response.body.current.feelslike + " degrees out", imageurl: response.body.current.weather_icons[0]});
        }
    }) 
}

module.exports = forecast