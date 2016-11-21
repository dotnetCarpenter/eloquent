// first version
/*
for (var c = 1; c <= 100; c++)
  console.log(
    c % 3 === 0 ?
      "Fizz" :
      c % 5 === 0 ?
        "Buzz" :
        c
  )
*/
// second version
for (var c = 1; c <= 100; c++)
  console.log(
    c % 3 === 0 && c % 5 === 0 ?
      "FizzBuzz" :
      c
  )
