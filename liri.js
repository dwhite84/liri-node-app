// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var request = require("request");

var movieINfo = process.argv[2];

var queryUrl = "http://www.omdbapi.com/?t=" + movieINfo + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

request(queryUrl, function(error, response, body) {
  if (!error && response.statusCode === 200) {
    console.log("Released: " + JSON.parse(body).Released);
  }
});
