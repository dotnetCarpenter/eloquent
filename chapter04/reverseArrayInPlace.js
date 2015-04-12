/* EXAMPLE USAGE: node reverseArrayInPlace.js "DEBUG=true,reverseArrayInPlace([1,2,3,4,5,6,7])" */

"use strict";

var DEBUG = false;
var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "reverseArrayInPlace([1,2,3,4,5,6])";
console.log(testString + " eval to:", eval(testString));

function reverseArrayInPlace(array) { // version 2
  if(DEBUG)
    console.log(array)

  for(var i = 0, len = array.length; i < len/2; i++) {
    var opposite = getOppositeInRangeFromZero(len, i);
    var n1 = array[i];
    var n2 = array[opposite];
    array[i] = n2;
    array[opposite] = n1;

    if(DEBUG)
      console.log(array, opposite);
  }
  return array;
}

function getOppositeInRangeFromZero(range, n) {
  return range - (1 + n);
}
