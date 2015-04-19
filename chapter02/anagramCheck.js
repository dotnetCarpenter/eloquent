var input1, input2;
if(process && process.argv) { // test if we are in a nodejs compatible environment
  if(process.argv.length > 2) {
    input1 = process.argv[process.argv.length-2];
    input2 = process.argv[process.argv.length-1];
  }
}

var testString = input1 || "poultry outwits ants";
var targetString = input2 || "pastils turnout towy";
console.log(testAnagram(targetString, testString));

function testAnagram(anagram, text) {
  for(var n = 0, len = anagram.length; n < len; n++) {
    if (countChar(text, anagram.charAt(n)) === 0)
      return false
  }
  return true;
}

function countChar(string, char) {
  var charsFound = 0;
  for(var n = 0, len = string.length; n < len; n++)
    charsFound += string.charAt(n) === char ? 1 : 0;
  return charsFound;
}
