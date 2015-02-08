var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  input = process.argv[process.argv.length-1].replace("node", "");
}

var testNumber = Number(input) || 51;
console.log( "Is %d even or odd?\nIt is %s.", testNumber, isEvenOdd(testNumber) );

// "node evenOdd.js 35931" is maximun before: RangeError: Maximum call stack size exceeded on my machine (Lenovo S440, win7, node v0.10.36)
function isEvenOdd(n) {
  n = Math.abs(n);
  if(n == 0)
    return "even";
  else if(n == 1)
    return "odd";
  else
    return isEvenOdd(n-2);
}
