// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
// var client = new Twitter(keys.twitter);

var request = require("request");

var movieInfo = process.argv;

var movieName = "";

for (var i =2; i < movieInfo.length; i++){

    if(i > 2 && i < movieInfo.length){

        movieName = movieName + "+" + movieInfo[i];
    }
    else{
        movieName += movieInfo[i];
    }
}

var queryUrl = "http://www.omdbapi.com/?t=" + movieInfo + "&y=&plot=short&apikey=trilogy";

// console.log(queryUrl);

request(queryUrl, function(error, response, body) {
    
  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
    // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2]);  
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language   " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);
  }
});
