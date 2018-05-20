require("dotenv").config();

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

                fs.appendFile('log.txt', "@donaldwhite84:", + tweets[i].text + "Created at:" + date.substring(0,19));
                fs.appendFile('log.txt', "-------------");
            }

        }else{
            console.log("error");
        }
    })
}

function spoifysong(song){
    spotify.search({type:'track', query:song}, function(error,data){
        if(!error){
            for(var i=0; i < data.tracks.items.length; i++){
                var song = data.tracks.items[i];

                console.log("Artist:" + song.artists[0].name);
                console.log("Song" + song.name);
                console.log("Preview URL:" + song.preview_url);
                console.log("Album:" + song.album.name);
                console.log("-------------------------");

                fs.appendFile('log.txt',song.artists[0].name);
                fs.appendFile('log.txt',song.name);
                fs.appendFile('log.txt',song.preview_url);
                fs.appendFile('log.txt',song.album.name);
                fs.appendFile('log.txt',"-------------------------");
                

            }
        }else{
            console.log(error)
        }
    })

}

function omdbData(movie){

    var queryUrl = "http://www.omdbapi.com/?t=" + movie + "&y=&plot=short&apikey=trilogy";

    request(queryUrl, function(error, response, body) {
    
  if (!error && response.statusCode === 200) {
    console.log("Title: " + JSON.parse(body).Title);
    console.log("Year: " + JSON.parse(body).Year);
    console.log("IMBD Rating: " + JSON.parse(body).imdbRating);
    console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Source); 
     console.log("Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);  
    console.log("Country: " + JSON.parse(body).Country);
    console.log("Language   " + JSON.parse(body).Language);
    console.log("Plot: " + JSON.parse(body).Plot);
    console.log("Actors: " + JSON.parse(body).Actors);

    fs.appendFile('log.txt',"Title: " + JSON.parse(body).Title);
    fs.appendFile('log.txt',"Year: " + JSON.parse(body).Year);
    fs.appendFile('log.txt',"IMBD Rating: " + JSON.parse(body).imdbRating);
    fs.appendFile('log.txt',"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Source); 
    fs.appendFile('log.txt',"Rotten Tomatoes Rating: " + JSON.parse(body).Ratings[2].Value);  
    fs.appendFile('log.txt',"Country: " + JSON.parse(body).Country);
    fs.appendFile('log.txt',"Language   " + JSON.parse(body).Language);
    fs.appendFile('log.txt',"Plot: " + JSON.parse(body).Plot);
    fs.appendFile('log.txt',"Actors: " + JSON.parse(body).Actors);
  }else{
      console.log(error)
  }
  if(movie==="Mr. nobody"){
      console.log("--------------------");
      console.log("If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      console.log("It's on Netflix!");

      fs.appendFile('log.txt', "-----------------------");
      fs.appendFile('log.txt', "If you haven't watched 'Mr. Nobody,' then you should: http://www.imdb.com/title/tt0485947/");
      fs.appendFile('log.txt', "It's on Netflix!");
  }
});
}

function doThing(){
    fs.readFile('random.txt', "utf8", function(error, data){
      var txt = data.split(',');
  
      spotifySong(txt[1]);
    });
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
