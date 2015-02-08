var input;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input = process.argv[process.argv.length-1];
  }
}

var testString = input || "Bobby Boob Blubber";
console.log("%s has %d capital Bs in it.", testString, countBs(testString));

function countBs(string) { // version 1
  var Bs = 0;
  for(var n = 0, len = string.length; n < len; n++)
    Bs += string.charAt(n) === "B" ? 1 : 0;
  return Bs;
}
