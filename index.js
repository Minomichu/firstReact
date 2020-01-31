//Importerar
//import express from "express";
var express = require('express');
//Läser in från formuläret och sparar i JavaScript
var bodyParser = require('body-parser');
var path = require('path');
var mongoose = require('mongoose');


//Med mLab
mongoose.connect("mongodb://Mimmi:losen123@wishlistcluster-shard-00-00-fz1b0.mongodb.net:27017,wishlistcluster-shard-00-01-fz1b0.mongodb.net:27017,wishlistcluster-shard-00-02-fz1b0.mongodb.net:27017/wishlistDatabase?ssl=true&replicaSet=wishlistCluster-shard-0&authSource=admin&retryWrites=true&w=majority", { useNewUrlParser: true });

//Med localhost
//mongoose.connect("mongodb://localhost:27017/myCV", { useNewUrlParser: true });


//Hämta schemat
let wish = require('./models/database.js');


//Ny instans av express-biblioteket
var app = express();



//Middleware - öka tillgänglighet
app.all('/*', function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Credentials", "true");
	res.header("Access-Control-Allow-Headers", "Access-Control-Allow-Headers, Origin, Accept, X-Requested-With, Content-Type, Authorization, Access-Control-Request-Method, Access-Control-Request-Headers");
	res.header("Access-Control-Allow-Methods", "GET,PUT,PATCH,POST,DELETE");
	next();
});


//Bodyparser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded( { extended: false}));

//Skapar statisk sökväg
app.use(express.static(path.join(__dirname, "public")));


//Hämtar alla önskningar
//res - det man vill säga till framsidan /klienten
//req - det som skickats till baksidan (av klienten)
app.get("/api/onTheList", function(req, res) {

    //Andra parametern innehåller resultatet av hämtningen från databasen
    wish.find(function(err, wish) {
        if(err) {
            res.send(err);
        }

        //Skickar tillbaka i json-format
        res.json(wish);
    });

});

//Hämtar en specifik önskan med ID
app.get("/api/onTheList/get/:_id", function(req, res) {
    var getSpecificID = req.params._id;

    wish.find({
        _id: getSpecificID

    }, function(err, specificWish) {
        if(err) {
            res.send(err)
        }
        res.json(specificWish);
    });
});



//Lägga till önskan
app.post("/api/onTheList/post", function(req, res) {

    //Ny instans av kurser
    const addWish = new wish();
    Object.assign(addWish, req.body);

    //Spara till databas
    addWish.save(function(err) {
        if(err) {
            res.send(err);
        }
    });

    //Skickar tillbaka till startsidan - för större projekt med olika mappar: skippa
    res.redirect("/");
});


//Uppdatera önskan
app.put("/api/onTheList/put/:_id", function(req, res) {
    var updateID = req.params._id;

    //if body.price == '' Plocka bort price från databasen så den inte får nullvärde
    //(om någon exv skrivit i någon del och ändrar sig och vill ta bort den)
    const body = req.body;
    const update = {};

    if (body.thing !== undefined) update.thing = body.thing;
    if (body.price !== undefined) update.price = body.price;
    if (body.color !== undefined) update.color = body.color;
    if (body.store !== undefined) update.store = body.store;
    if (body.description !== undefined) update.description = body.description;
    if (body.link !== undefined) update.link = body.link;
    if (body.extraInfo !== undefined) update.extraInfo = body.extraInfo;
    if (body.topThree !== undefined) update.topThree = body.topThree;
    if (body.heartWish !== undefined) update.heartWish = body.heartWish;

    wish.update({_id: updateID}, 
        {
            $set: update
    }
            
        ,function(err) {
        if (err) {
            res.send(err);
        }
        res.redirect("/");
    });
});


//Radera önskan
app.delete("/api/onTheList/delete/:_id", function(req, res) {
    var deleteID = req.params._id;

    wish.deleteOne({
        _id: deleteID 

    }, function(err, wish) {
        if(err) {
            res.send(err)
        }
        res.json({ message: "Önskningen med id " + deleteID + " är raderad."});
    });
});


//HEROKU
//Serve static assets if in production
if (process.env.NODE_ENV === 'production') {
    //Set static folder
    app.use(express.static('frontendfinal/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'frontendfinal', 'build', 'index.html'));
    });
}
//Slut Heroku


//Tilldela anslutningsport
const port = process.env.PORT || 3001;

//Starta servern/porten
app.listen(port, function() {
    console.log("Servern är igång " + port);
});
