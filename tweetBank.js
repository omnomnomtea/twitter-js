const _ = require('lodash');

const data = [];


function add (name, content) {
  let id = data.length;
  data.push({name: name, content: content, id: id});
  return id;
}

function list () {
  return _.cloneDeep(data); //clone deep--creates deep copy of array
}

function find (properties) {
  return _.cloneDeep(_.filter(data, properties)); //filter filters data based on properties
}

module.exports = {
  add,
  list,
  find
};


add("Tess", "Fullstack Academy is impressive! The instructors are just so sweet. #fullstacklove #codedreams");
add("Jan", "Fullstack Academy is amazing! The instructors are just so sweet. #fullstacklove #codedreams");
add("Jan", "Fullstack Academy is sweet! The instructors are just so sweet. #fullstacklove #codedreams");


const randArrayEl = function(arr) {
  return arr[Math.floor(Math.random() * arr.length)];
};

const getFakeName = function() {
  const fakeFirsts = ['Nimit', 'David', 'Shanna', 'Emily', 'Scott', 'Karen', 'Ben', 'Dan', 'Ashi', 'Kate', 'Omri', 'Gabriel', 'Joe', 'Geoff'];
  const fakeLasts = ['Hashington', 'Stackson', 'McQueue', 'OLogn', 'Ternary', 'Claujure', 'Dunderproto', 'Binder', 'Docsreader', 'Ecma'];
  return randArrayEl(fakeFirsts) + " " + randArrayEl(fakeLasts);
};

const getFakeTweet = function() {
  const awesome_adj = ['awesome', 'breathtaking', 'amazing', 'funny', 'sweet', 'cool', 'wonderful', 'mindblowing', 'impressive'];
  return "Fullstack Academy is " + randArrayEl(awesome_adj) + "! The instructors are just so " + randArrayEl(awesome_adj) + ". #fullstacklove #codedreams";
};

for (let i = 0; i < 10; i++) {
  module.exports.add( getFakeName(), getFakeTweet() );
}
