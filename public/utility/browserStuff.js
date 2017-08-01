function getTimeSince (date) {
  const seconds = Math.floor((new Date() - date) / 1000); //1000 is ms

  if (seconds / 3600 > 1) {
    return Math.floor(seconds / 3600 ) + ' hours ago';
  }
  if (seconds / 60 > 1) {
    return Math.floor(seconds / 60) + ' minute(s) ago';
  }
  if (seconds / 60 <= 1) {
    return 'just now';
  }
}


//Interval of 1 minute that updates tweets and time passed
function updateTweetTimes () {
  const allTweetTimes = $('.tweetAgo');

  allTweetTimes.text(function(index){
    return getTimeSince(Number(allTweetTimes[index].dataset.time));
  });
  //console.log("Updated tweet times!")

}

setInterval(updateTweetTimes, 1000);
