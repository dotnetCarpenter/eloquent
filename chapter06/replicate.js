'use strict';

// try to make replicate eligible for tail call optimization (tco)
// function replicate(string, times, accu) {
//   if(!accu) accu = new Array(times);
//   accu[times-1] = string;
//   return times < 1 ? accu.join('') : replicate(string, times - 1, accu);
// }
function replicate(string, times) {
  string = Array.isArray(string) ? string : [string]; 
  let rep = (x, n) => (n < 1 || x.length === 0) ? [] : x.concat( rep(x, n-1) );
  return rep(string, times).join('');
}
module.exports = replicate;
