"use strict"

const ancestry = JSON.parse(require("./ancestry"))

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Your code here.
let log = console.log;
//log("young in 1924");
//log(ancestry.filter(person => person.born > 1900 && person.born < 1925));

//log("over ninety");
let overNinety = ancestry.filter(person => person.died - person.born > 90);
//log(overNinety.map(person => person.name));

//log("most ancient known ancestor");
//log(ancestry.reduce((min, cur) => cur.born < min.born ? cur : min));

//log("average age for men and for women")
function average(array) {
  let plus = (a,b) => a + b;
  return array.reduce(plus) / array.length
}
function age(p) { return p.died - p.born; }
function male(p) { return p.sex === "m"; }
function female(p) { return p.sex === "f"; }
//log( average( ancestry.filter(male).map(age) ) );
//log( average( ancestry.filter(female).map(age) ) );

log("find shared dna")
function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if(person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDna(person, fromMother, fromFather) {
  if (person.name === "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}
let ph = byName["Philibert Haverbeke"];
log(reduceAncestors(ph, sharedDna, 0) / 4);
log("Pauwels van Haverbeke's children");
log(
  ancestry.filter(person => person.father === "Pauwels van Haverbeke")
    .map(person => person.name + " (gender: " + person.sex + ")" )
    .join()
)

log("percentage of known ancestors, for a given person who, lived past 70")
function countAncestors(person, test) {
  function combine(person, fromMother, fromFather) {
    return fromMother + fromFather + Boolean(test(person));
  }
  return reduceAncestors(person, combine, 0);
}
function longLivingPercentage(person) {
  let all = countAncestors(person, () => true);
  let longLiving = countAncestors(person, person => (person.died - person.born) >= 70);
  return longLiving / all;
}
let name = "Emile Haverbeke";
log("name: " + name);
log(longLivingPercentage(byName[name]).toFixed(3));
