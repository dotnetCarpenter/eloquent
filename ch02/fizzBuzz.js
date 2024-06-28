'use strict'

for (var c = 1; c <= 30; c++)
/*
// first version
console.log(
    c % 3 === 0 ?
    "Fizz" :
      c % 5 === 0 ?
      "Buzz" :
      c
      )
// second version
for (var c = 1; c <= 30; c++)
  console.log(
    c % 3 === 0 && c % 5 === 0 ?
      "FizzBuzz" :
      c
  )
*/
// third version (obvious, I didn't understand the task before)
  console.log(fizzbuzz(c))

function fizzbuzz (n) {
  let s = ''

  if (n % 3 === 0) s = "Fizz"
  if (n % 5 === 0) s += "Buzz"
  if (s.length === 0) s = n

  return s
}