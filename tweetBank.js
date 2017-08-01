const _ = require('lodash');

const data = [];


function add (name, content) {
  data.push({name: name, content: content});
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
