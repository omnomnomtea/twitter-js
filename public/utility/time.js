
//Gets String of Hours/Minutes/Seconds of time that has passed since given date
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

if (module){
  module.exports.getTimeSince = getTimeSince;
}
