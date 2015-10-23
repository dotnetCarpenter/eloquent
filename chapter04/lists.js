"use strict"

var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var list = {
  value: 1,
  rest: {
    value: 2,
    rest : {
      value: 3,
      rest: null
    }
  }
}
var array = [1,2,3]
var obj = {here: {is: "an"}, object: 2};

var testString = input || "deepEqual(list, arrayToList(array) )";
console.log(testString + " eval to:", eval(testString));

/*
console.log(arrayToList([10, 20]));
console.log("{ value: 10, rest: { value: 20, rest: null } }")
console.log(listToArray(arrayToList([10, 20, 30])));
console.log("[ 10, 20, 30 ]")
console.log(prepend(10, prepend(20, null)));
console.log("{ value: 10, rest: { value: 20, rest: null } }")
console.log(nth(arrayToList([10, 20, 30]), 1));
console.log("20")
*/

function deepEqual(a, b) {
  if(typeof a !== "object" || a === null) {
    if(a !== b) return false
  }
  for(let prop in a) {
    if(!(prop in b)) return false
    if(! deepEqual(a[prop], b[prop]))
      return false
  }
  return true
}

function arrayToList(array) {
  let list = null
  for (let i = array.length-1; i >= 0 ;--i)
    list = {value: array[i], rest: list}
  return list
}

function listToArray(list) {
  if(!list.rest) return list.value
  let x = list.value,
      xs= list.rest
  return [x].concat(listToArray(xs))
}

function prepend(element, list) {
  return {
    value: element,
    rest: list
  }
}

function nth(list, index) {
  if(!list) return undefined
  if(index === 0) return list.value
  return nth(list.rest, --index)
}
