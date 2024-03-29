const express = require("express");
const path = require("path");
const hbs = require("hbs");
const geocode = require("./utils/geocode");
const forecast = require("./utils/forecast");
const { response } = require("express");

const app = express();

// the paths for Express config and hbs config
const publicDirectoryPath = path.join(__dirname, "../public")
const viewsDirectory = path.join(__dirname, "../templates/views")         // this is not necessary. we are telling express where to look for our templates.
const partialDirectory = path.join(__dirname, "../templates/partials")

// settings for handle bars and the views loaction
app.set("view engine", "hbs")                   // to tell express that we are using the hbs (handle bars) template engine
app.set("views", viewsDirectory)
hbs.registerPartials(partialDirectory)          // to tell hbs the location of the partials directory

// to tell Express the location of our static directory to serve
app.use(express.static(publicDirectoryPath));

const port = process.env.PORT || 3000
// here we define the routes
// making a route. which in this case the / the root
// Note: the index.html in the public directory overrides this route
app.get("", (req, res) => {
    res.render("index", {
        title: "weather forecast",
        name: "https://www.mohamedsaied.com"
    });
});

app.get("/about", (req, res) => {
    res.render("about", {
        title: "About the app",
        name: "https://www.mohamedsaied.com"
    })
})

app.get("/weather", (req, res) => {
    // console.log(req.query.address);
    if(!req.query.address){
        return res.send({
            error: "you must provide an address"
        })
    }
    
    geocode(req.query.address, (error, {longitude, latitude, location} = {} ) => {      // note that we put a default value using = ES6 syntax
        if(error){                                                                      // to avoid the error of "Cannot destructure property 'longitude' of 'undefined' as it is undefined." try removine the "= {}" and u will know what i mean
            return res.send({error});  // return statement to solve the problem of responsing twice to a single request 
        }
    
        forecast(latitude, longitude, (error, forecast) => {
            if(error){
                console.log(error);
                return res.send({error});
            }
            
            res.send({
                forecast: forecast.message,
                location,
                address: req.query.address,
                imageurl: forecast.imageurl
            });
        })
    })
})

// app.get("/help/*", (req, res) => {
//     res.render("404", {
//         title: "404",
//         name: "Mohamed Saeed",
//         message: "help article not found"
//     })
// })

app.get("*", (req, res) => {
    res.render("404", {
        title: "404",
        name: "https://www.mohamedsaied.com",
        message: "page not found"
    })
})

// to start the server
app.listen(port, () => {
    console.log("server is now running on port " + port);
});