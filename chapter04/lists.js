"use strict";

var util = require("../util.js");

util.defaultInput = "arrayToList([1,2,3])";
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
  function deepFirst(list) {
  	for(var prop in list) {
      util.log(prop, list[prop], list);
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
