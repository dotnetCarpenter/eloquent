"use strict"

const ancestry = JSON.parse(require("./ancestry"))

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

function reduceAncestors(person, f, defaultValue) {
  function valueFor(person) {
    if (person == null)
      return defaultValue;
    else
      return f(person, valueFor(byName[person.mother]),
                       valueFor(byName[person.father]));
  }
  return valueFor(person);
}

function sharedDNA(person, fromMother, fromFather) {
  if (person.name == "Pauwels van Haverbeke")
    return 1;
  else
    return (fromMother + fromFather) / 2;
}

function average(array) {
  function plus(a, b) { return a + b; }
  return array.reduce(plus) / array.length;
}

var byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

// Your code here.
function filter(array, test) {
  var passed = [];
  for (var i = 0, len = array.length; i < len; i++) {
    if(test(array[i]))
      passed.push(array[i]);
  }
  return passed;
}

let log = console.log;
log(filter(ancestry, person => person.born > 1900 && person.born < 1925))
