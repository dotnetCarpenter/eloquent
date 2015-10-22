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
  if(array.length === 0) return 0
  let x = array[0]
  return x + sum(array.slice(1))
}

function range(start, end, step) {
  step = step || 1
  if(step > 0 && start > end) return []
  if(step < 0 && start < end) return []
  return [start].concat( range(start+step, end, step) )
}
