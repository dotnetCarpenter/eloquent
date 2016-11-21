var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "sum(range(1, 10))";
console.log(testString + " eval to:", eval(testString));

function sum(array) {
  var ret = 0;
  for(var i = 0, len = array.length; i < len; i++) {
    ret += array[i];
  }
  return ret;
}

function range(start, end, step) {
  var ret = [];
  var resolve = step < 0 ?
                  function(s, e) { return s >= e; } :
                  function(s, e) { return s <= e; };
  step = step || 1;

  while( resolve(start, end) ) {
    ret.push(start);
    start += step
  }

  return ret;
};
