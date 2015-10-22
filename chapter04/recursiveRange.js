"use strict"

var input
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1]
  }
}

var testString = input || "sum(range(1, 10))"
console.log(testString + " eval to:", eval(testString))

function sum(array) {

}

function range(start, end, step) {
  if(end === 0) return []
  return [start].concat( range(start+1, end-1) )
}
