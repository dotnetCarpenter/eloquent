"use strict"

const ancestry = JSON.parse(require("./ancestry"))
const log = console.log;

function average(array) {
  let plus = (a,b) => a + b;
  return array.reduce(plus) / array.length
}

function zipWith(f, xs, ys) {
  if(xs.length === 0) return []
  if(ys.length === 0) return []
  let x = xs[0],
      y = ys[0]
  xs = xs.slice(1)
  ys = ys.slice(1)
  return [f(x, y)].concat(zipWith(f, xs, ys))
}

/* HISTORICAL LIFE EXPECTANCY */
// log( ancestry.filter((p,i) => i < 1).map(p => Math.ceil(p.died/100)) );
let ancestry2 = ancestry
                  .map( p => (p.century = Math.ceil(p.died/100), p) )
                  .map( p => (p.age = p.died - p.born, p) );

let byCentury = {}
each(ancestry2, p => {
  if(!byCentury[p.century]) byCentury[p.century] = [p];
  else byCentury[p.century].push(p);
});

each(byCentury, people => {
  log('In the %dth hundreds, the average age of %d person(s) was %d', people[0].century, people.length, averageAge(people));
});

function averageAge(list) {
  return average(list.map(p => p.age)).toFixed(2);
}

function each(iterable, fn) {
  if( Array.isArray(iterable) ) iterable.forEach(fn);
  for(let century in iterable)
    fn( iterable[century] );
}
