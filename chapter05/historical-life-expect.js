"use strict"

const ancestry = JSON.parse(require("./ancestry"))
const log = console.log;

/* HISTORICAL LIFE EXPECTANCY */
each(groupBy(ancestry, p => Math.ceil(p.died/100)), (people, century) => {
  log('In the %dth hundreds, the average age of %d person(s) was %d', century, people.length, averageAge(people));
});

function each(iterable, fn) {
  if( Array.isArray(iterable) ) return iterable.forEach(fn);
  for(let key in iterable) {
    if(iterable.hasOwnProperty(key)) fn( iterable[key], key, iterable );
  }
}

function groupBy(list, f) {
  let ret = {};
  list.forEach(item => {
    let key = f(item);
    if(Array.isArray(ret[key])) ret[key].push(item);
    else ret[key] = [item];
  });
  return ret;
}

function averageAge(list) {
  return average(list.map(p => p.died - p.born)).toFixed(2);
}

function average(array) {
  let plus = (a,b) => a + b;
  return array.reduce(plus) / array.length
}
