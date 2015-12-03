"use strict"

const ancestry = JSON.parse(require("./ancestry"))
let byName = {};
ancestry.forEach(function(person) {
  byName[person.name] = person;
});

console.log(ancestry[0])
