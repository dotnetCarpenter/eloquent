var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "reverseArray([1,2,3,4,5,6])";
console.log(testString + " eval to:", eval(testString));

function reverseArray(array) {
  var ret = [];

  for(var i = array.length - 1; i >= 0; i--)
    ret.push(array[i]);

  return ret;
}
