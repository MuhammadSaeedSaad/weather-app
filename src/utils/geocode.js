const request = require("request");

// longitude: response.body.features[0].center[0]
// latitude: response.body.features[0].center[0]

function geocode(address, callback){
    console.log(address)
    let url = "https://api.mapbox.com/geocoding/v5/mapbox.places/" + encodeURIComponent(address) + ".json?access_token=pk.eyJ1IjoiZWJucnNoZDUyMiIsImEiOiJja243aHcyb3cwODdhMnVtcXpvMGl5OGt6In0.ZqpJ2AXbGIBXeBmGap4p4g";
    request({url: url, json: true}, (error, {body} = {}) => {
        // console.log(body);
        if(error){
            callback("Application error, try again", undefined)     // app error
        } else if(!body.features){
            callback("Incorrect address. Try another search", undefined)    // API error
        } else if(body.features.length === 0){
            callback("Incorrect address. Try another search", undefined)    // API error
        } else{
            callback(undefined, {
                location: body.features[0].place_name,
                longitude: body.features[0].center[0],
                latitude: body.features[0].center[1]
            })
        }
    })
}

module.exports = geocode