"use strict";

var util = require("../util.js");

// TEST WITH: node lists.js -d -c "listToArray({ value: 3, rest: { value: 2, rest: { value: 1, rest: null } } })"

util.addTest("arrayToList([1,2,3])");
util.addTest("listToArray(arrayToList([1,2,3]))");
var code = util.getTestCode();
try {
  console.log(code + " eval to:", eval(code));
} catch(err) {
  console.log("Error in js", err);
}

function arrayToList(array, list) {
  var newList = {
    value: array.shift(),
    rest: list || null
  }
  return array.length === 0 ?
    newList :
    arrayToList(array, newList);
}

function listToArray(list) {
  var ret = [];
  depthFirst(list, ret);
  return ret;
}
function depthFirst(list, output) {
  for(var prop in list) {
    util.log(prop, list[prop], list);
    if(typeof prop === "object")
       return depthFirst(prop);
    output.push(list[prop])
  }
}

function prepend(n, list) {

}

function nth(list, n) {

}
