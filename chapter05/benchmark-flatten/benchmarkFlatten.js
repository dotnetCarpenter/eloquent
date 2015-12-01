"use strict"

const flatten = require("../flatten.es5")
const dimensional = [[1,2,3], ["a", "b", "c"]]
const wild = ["a",["b"],"c",1,2,3]
const crazy = [1,[2],[],3,["a",["b","c"]],["Eloquent"],["JavaScript"]]

let l = console.log
l("Benchmark results for flatten.js")
l("================================")
l()
outputBenchMark(1)
outputBenchMark(2)
outputBenchMark(4)
outputBenchMark(1e4)
outputBenchMark(2e4)
outputBenchMark(25e3)
outputBenchMark(3e4)
outputBenchMark(4e4)
outputBenchMark(8e4)
outputBenchMark(1e5)

function outputBenchMark(bennchmarkRuns) {
	//l(crazy)
	const result = doBenchMark(crazy, bennchmarkRuns)
	//l( result.flatArray )
	if(!result.passed) {
		l("flatten didn't flat the array")
		return
	}
	l("Number of Runs\tTotal Time\t1 Pass Time\tMean Time")
	l(
		"%d\t\t%s\t%s\t%s",
		result.testRuns,
		result.duration > 60 ? (result.duration/60).toFixed(8) + "m" : result.duration.toFixed(8) + "s",
		((result.randomDuration[0] * 1e9 + result.randomDuration[1])/1e9).toFixed(8) + "s", result.meanDuration.toFixed(8) + "s"
	)
}

function doBenchMark(testcase, howmany) {
	let times = new Array(howmany)
	let c = 0
	let flatArray
	
	do {
		let start = process.hrtime()
		flatArray = flatten(testcase)
		times[c] = process.hrtime(start)
		c++
	} while(c < howmany)
	
	let aggregated = times.reduce((a,b) => zipWith(add, a, b))
	let seconds = (aggregated[0] * 1e9 + aggregated[1]) / 1e9

	return {
		flatArray,
		testRuns: howmany,
		duration: seconds,
		randomDuration: times[ Math.floor(Math.random()*howmany) ],
		meanDuration: seconds/howmany,
		passed: flatArray.every(x => !Array.isArray(x))
	}
}

function zipWith(f, xs, ys) {
  if(xs.length === 0) return []
  if(ys.length === 0) return []
  let x = xs[0]
  let y = ys[0]
  return [f(x, y)].concat(zipWith(f, xs.slice(1), ys.slice(1)))
}

function add(a, b) { return a+b }
