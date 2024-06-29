'use strict'

for (var c = 1; c <= 30; c++)
  console.log(fizzbuzz (c))

function fizzbuzz (n) {
  let s = ''

  if (n % 3 === 0) s = "Fizz"
  if (n % 5 === 0) s += "Buzz"
  if (s.length === 0) s = n

  return s
}