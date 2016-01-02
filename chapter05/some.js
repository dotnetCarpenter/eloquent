'use strict';

module.exports = some;

function some(list, predicate, scope) {
  if(scope) throw new TypeError('Scope not implemented');
  for(let i = 0, len = list.length; i < len; i++) {
    if( predicate(list[i], i, list) ) return true;
    else if( i === len - 1 ) return false;
  }
}

// TEST
// console.log( some(['iskra','anita'], (p, i, all) => (console.log(p, i, all),true) ) );
// console.log( some(['iskra','anita'], (p, i, all) => (console.log(p, i, all),false) ) );