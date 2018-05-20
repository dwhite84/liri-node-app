// require("dotenv").config();

// var spotify = new Spotify(keys.spotify);
var client = new Twitter(keys.twitter);
var keys = require('./keys.js');
var request = require("request");
var Twitter = require('twitter');
var spotify = require('spotify');
var fs = require('fs');

var nodeArgv = process.argv;
var command = process.arg[2];

var movSong = "";

for(var i = 3; i < nodeArgv.length; i++){
    if(i>3 && i < nodeArgv.length){
        movSong = movSong + "+" + nodeArgv[i];

    }else{
        movSong = movSong + nodeArgv[i];
    }
}

//Switch Case
switch(command){
    case "my-tweets":
    displayTweets();
    break;

    case "spotify-this-song":
    if(movSong){
        spotifysong(movSong);
    }else{
        spoifysong("What They Do")
    }
    break;

    case "movie-this":
    if(movSong){
        omdbData(movSong);
    }else{
        omdbData("Mr. Nobody")
    }
    break;

    case "do-what-it-says":
    doThing();
    break;
}

function displayTweets (){
    var username = {screen_name: 'donaldwhite84'};

    client.get('statuses/user_timeline', username, function(error,tweets, response){
        if(!error){
            for(var i =0; i < tweets.length; i++){
                var date = tweets[i].created_at;
                console.log("@donaldwhite84" + tweets[i].text + "Created at:" + date.substring(0,19));
                console.log("------------");

                fs.appendFile('random.txt', "@donaldwhite84:", + tweets[i].text + "Created at:" + date.substring(0,19));
                fs.appendFile('random.txt', "-------------");
            }

        }else{
            console.log("error");
        }
    })
}



// var movieName = "";

// for (var i =2; i < command.length; i++){

//     if(i > 2 && i < command.length){

//         movieName = movieName + "+" + command[i];
//     }
//     else{
//         movieName += command[i];
//     }
// }

// var queryUrl = "http://www.omdbapi.com/?t=" + command + "&y=&plot=short&apikey=trilogy";

// // console.log(queryUrl);

// request(queryUrl, function(error, response, body) {
    
//   if (!error && response.statusCode === 200) {
//     console.log("Title: " + JSON.parse(body).Title);
//     console.log("Year: " + JSON.parse(body).Year);
//     console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
//     // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Source); 
//      // console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);  

//     console.log("Country: " + JSON.parse(body).Country);
//     console.log("Language   " + JSON.parse(body).Language);
//     console.log("Plot: " + JSON.parse(body).Plot);
//     console.log("Actors: " + JSON.parse(body).Actors);
//   }
// });
