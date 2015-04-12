"use strict";

var DEBUG = false;
var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "arrayToList([1,2,3])";
console.log(testString + " eval to:", eval(testString));

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
  function deepFirst(list) {
  	for(var prop in list) {
      console.log(prop, list[prop], list)
  	  if(typeof prop === "object")
   	    return deepFirst(prop);
   	  ret.push(list[prop])
  	}
  }
  deepFirst(list);
  return ret;
}

function prepend(n, list) {

}

function nth(list, n) {

}
