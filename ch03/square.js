function pow(a, b) {
  b = b == null ? 2 : b;
  if(b === 1)
    return a;
  return b < 0 ? 1 / pow(a, b*-1) : a * pow(a, b-1);
}
//
function sq(a) { return Math.pow(a, 0.5); }

var x = pow(8, -2),
    t = Math.pow(8, -2);
console.log(x, t)
var x = 9;
console.log(
  Math.sqrt(x)
, sq(x)
)
