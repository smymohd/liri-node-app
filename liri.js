var Twitter = require('twitter');
var spotify = require('spotify');
var request = require('request');
var fs = require('fs');
var keys = require("./keys.js");
var tweetsArray = [];
var inputCommand = process.argv[2];
var commandParam = process.argv[3];
var defaultMovie = "Ex Machina";
var defaultSong = "Radioactive";



var twitterKeys = keys.twitterKeys;
var tmdbKey = keys.tmdbKey;

var client = new Twitter({
  consumer_key: twitterKeys.consumer_key,
  consumer_secret: twitterKeys.consumer_secret,
  access_token_key: twitterKeys.access_token_key,
  access_token_secret: twitterKeys.access_token_secret
});



//-----------------------FUNCTIONS-----------------------------------------------

//This function processes the input commands
function processCommands(command, commandParam){

	//console.log(commandParam);

	switch(command){

	case 'my-tweets':
		getMyTweets(); break;
	case 'spotify-this-song':
		//If user has not specified a song , use default
		if(commandParam === undefined){
			commandParam = defaultSong;
		}     
		spotifyThis(commandParam); break;
	case 'movie-this':
		//If user has not specified a movie Name , use default
		if(commandParam === undefined){
			commandParam = defaultMovie;
		}    
		movieThis(commandParam); break;
	case 'do-what-it-says':
		doWhatItSays(); break;
	default: 
		console.log("Invalid command. Please type any of the following commnds: my-tweets spotify-this-song movie-this or do-what-it-says");
}


}

function getMyTweets(){

	var params = {screen_name: 'jincygeorge8388', count: 20, exclude_replies:true, trim_user:true};
		client.get('statuses/user_timeline', params, function(error, tweets, response) {
				if (!error) {
					//console.log(tweets);
					tweetsArray = tweets;

					for(i=0; i<tweetsArray.length; i++){
						console.log("Created at: " + tweetsArray[i].created_at);
						console.log("Text: " + tweetsArray[i].text);
						console.log('--------------------------------------');
					}
				}
				else{
					console.log(error);
				}
	});

}

