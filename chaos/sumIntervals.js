'use strict'

// https://www.codewars.com/kata/52b7ed099cdc285c300001cd/discuss#label-issue

const sort = intervals =>
  intervals.sort( (a, b) =>
    a[0] < b[0] ? -1 : 1)

const collapse = intervals =>
  intervals.reduce( (r1, r2) =>
    r1[1] > r2[0] ?
      collapse([[r1[0], r2[1]]]) :
      r1.concat(r2))

const sum = intervals => {
  let sum = 0

  for (let i = 0, max = intervals.length; i < max; i += 2) {
    sum += intervals[i + 1] - intervals[i]
  }

  return sum
}

const sumIntervals = compose(/* sum, */collapse, sort)

/*** utility function ***/

function compose (...fs) {
  return (...args) => fs.reduceRight((args, f) => f(args), ...args)
}

/*** tests ***/

let tests = [
  // [[1, 5],[1, 5]],
  [[1, 4],[7, 10],[3, 5]],
  // [[1, 4],[7, 10],[3, 5],[4, 10]],
  // [[1, 4],[7, 10],[3, 5],[22, 30]],
  [[1, 5],[10, 20],[1, 6],[16, 19],[5, 11]]
]
let expected = [
  // 4,
  7,
  // 9,
  // 15,
  19
]

tests.forEach((t, i) => {
  console.log(t)
  console.log(sumIntervals(t), expected[i])
})

function curry (f) {
  const n = f.length - 1
  return (...args) => args.length > n ? f(...args) : curry(f.bind(null, ...args))
}

function access (index, array) { return array[index] }

const fst = curry(access)(0)
const snd = curry(access)(1)

/*
const lows = intervals => intervals.map(fst)
const highs = intervals => intervals.map(snd)
const highLow = intervals => {
  const ls = lows(intervals) // 1, 3, 7,
  const hs = highs(intervals) // 4, 5, 10

  // [1, 4],[3, 5],[7, 10]
  return intervals.reduce((r1, r2) => r1[1] > r2[0] ? [r1[0], r2[1]] : r1)
  //  return intervals.map((_, i) =>
  //   access(i, hs) > access(i+1, ls) ?
  //     [access(i, ls), access(i+1, hs)] :
  //     [access(i+1, ls), access(i+1, hs)])
}

function zipWith (f, xs, ys) {
  if(xs.length === 0) return []
  if(ys.length === 0) return []

  const x = xs[0],
        y = ys[0]

  xs = xs.slice(1)
  ys = ys.slice(1)
  return [f(x, y)].concat(zipWith(f, xs, ys))
} */
