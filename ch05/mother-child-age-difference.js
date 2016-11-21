"use strict"

const ancestry = JSON.parse(require("./ancestry"))
let byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

const log = console.log;

/* compute the average age difference between mothers and children (the age of the mother when the child is born) */
function isInSet(set, value) {
  return set.indexOf(value) > -1;
}

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

var mothers = ancestry.map(person => person.mother ) // get all the mother names as many times as they appear (duplicates)
                .filter(name => byName[name]); // remove names of mothers not in set
var hasMotherInSet = isInSet.bind(null, mothers);
// everyone who has a mother property that correspond to a name in the mothers set
var children = ancestry.filter(person => hasMotherInSet(person.mother));

// since we got all the mother names in the same order as children (we got the mother names from the children), we zip the two sets
var motherChildPair = zipWith(
  (mother, child) => [mother, child],
  mothers.map(m => byName[m]), // convert mothers to person object
  children
);

/*log("mothers", mothers.length);
log("children", children.length);
log(
  motherChildPair.map(pair => `mother: ${pair[0].name} child: ${pair[1].name} has mother: ${pair[1].mother}`)
);*/

let averageAgeDifference = average(motherChildPair.map(pair => pair[1].born - pair[0].born));
log("The average age difference between mother and child is " + averageAgeDifference.toFixed(1) + " years")

// FROM Marijn Haverbeke
var differences = ancestry.filter(function(person) {
  return byName[person.mother] != null;
}).map(function(person) {
  return person.born - byName[person.mother].born;
});
log("The average age difference between mother and child is " + average(differences).toFixed(1) + " years")
