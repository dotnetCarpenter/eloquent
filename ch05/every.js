'use strict';

module.exports = every;

function every(list, predicate, scope) {
  if(scope) throw new TypeError('Scope not implemented');
  for(let i = 0, len = list.length; i < len; i++) {
    if( !predicate(list[i], i, list) ) return false;
    else if( i === len - 1 ) return true;
  }
}

// TEST
// console.log( every(['iskra','anita'], (p, i, all) => (console.log(p, i, all),false) ) );
// console.log( every(['iskra','anita'], (p, i, all) => (console.log(p, i, all),true) ) );