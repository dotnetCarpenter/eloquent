"use strict"

var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "reverseArray([1,2,3,4,5,6])";
console.log(testString + " eval to:", eval(testString));

function reverseArray(array) {
  if(array.length === 0) return []
  return reverseArray(array.slice(1)).concat(array[0])
}
