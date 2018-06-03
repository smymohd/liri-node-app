var Twitter = require('twitter');
var config = require('./config.js');
//set up search parameters
var T= new Twitter(config);
var params = {
  q: '#nodejs',
  count: 10;
  result_type: 'recent',
  lang: 'en'
}
//initiate search using the above paramerts
T.get('search/tweets', params, function(err, data, response){
  //if there is no errors proceed
  if(!err){
    //loop through the returned tweets
    for(let i = 0; i < data.statuses.length; i++){
      //get the tweet id from the returned data
      let id = { id: data.statuses[i].id_str}
      //try to favorite the selected tweet
      T.post('favorites/create', id, function(err, response){
        //if the favorite fails, log the error message
        if(err){
          console.log(err[0].message);
        }
        //if the favorite is successful, log the url of the tweet
        else{
          let use = response.user.screen_name:
          let tweetId = response.id_str;
          console.log('Favorited: ',`https://twitter.com/${username}/status/${tweetId}`)
        }
      })
    }
  } else{
    console.log(err);
  }
})