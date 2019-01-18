//Import node modules and keys.js file
require("dotenv").config();
var Spotify = require('node-spotify-api');
var keys = require("./keys");
var request = require("request");

//Spotify Keys
var spotifyKeys = keys.spotify;

liri();

function liri(userInput, queryInput, spotify) {
  var spotify = new Spotify({
    id: spotifyKeys.id,
    secret: spotifyKeys.secret
  });
  //Capture user input
  var userInput = process.argv[2];
  var queryInput = process.argv.slice(3);

  //If Else Statement
  if (userInput == "spotify-this-song") {
    //Spotify Node API Call
    spotify.search({ type: 'track', query: queryInput, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }
      //Console log track search info
      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
    });
    //Movie search else if condition
  } else if (userInput == "movie-this") {
    // If statement in case no movie qeury
    if (queryInput == '') {
      var queryUrl = "http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy";
    } else {
      var queryUrl = `http://www.omdbapi.com/?t=${queryInput}&y=&plot=short&apikey=trilogy`;
    }
    request(queryUrl, function (error, response, body) {

      // If the request is successful
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
    //else case for when command is typed wrong
  } else if (userInput == "do-what-it-says") {
    var fs = require('fs');

    fs.readFile('random.txt', 'utf8', function (err, contents) {
      textArr = contents.split(',');
      var userInput = textArr[0];
      var queryInput = textArr[1];
      liri2(userInput, queryInput);

    });


  } else {
    console.log("Please try again");
  };


};

function liri2(userInput, queryInput, spotify) {
  var spotify = new Spotify({
    id: spotifyKeys.id,
    secret: spotifyKeys.secret
  });

  if (userInput == "spotify-this-song") {
    spotify.search({ type: 'track', query: queryInput, limit: 1 }, function (err, data) {
      if (err) {
        return console.log('Error occurred: ' + err);
      }

      console.log(`Artist: ${data.tracks.items[0].artists[0].name}`);
      console.log(`Song: ${data.tracks.items[0].name}`);
      console.log(`Album: ${data.tracks.items[0].album.name}`);
      console.log(`Link: ${data.tracks.items[0].external_urls.spotify}`);
    });

  } else if (userInput == "movie-this") {
    if (queryInput == '') {
      var queryUrl = "http://www.omdbapi.com/?t=Mr.%20Nobody&y=&plot=short&apikey=trilogy";
    } else {
      var queryUrl = `http://www.omdbapi.com/?t=${queryInput}&y=&plot=short&apikey=trilogy`;
    }
    request(queryUrl, function (error, response, body) {
      if (!error && response.statusCode === 200) {
        console.log("Title: " + JSON.parse(body).Title);
        console.log("Release Year: " + JSON.parse(body).Year);
        console.log("IMDB Rating: " + JSON.parse(body).Ratings[0].Value);
        console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);
        console.log("Country Produced: " + JSON.parse(body).Country);
        console.log("Language: " + JSON.parse(body).Language);
        console.log("Plot: " + JSON.parse(body).Plot);
        console.log("Actors: " + JSON.parse(body).Actors);
      }
    });
  } else {
    console.log("Please try again");
  };


};
