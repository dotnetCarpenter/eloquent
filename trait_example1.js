"use strict";

const Trait = require("traits.js");

const EnumerableTrait = Trait({
  each: Trait.required,
  map(fun) {
    let r = [];
    this.each(e => { r.push(fun(e)); });
    return r;
  },
  inject(init, accum) {
    let r = init;
    this.each(e => { r = accum(r, e)});
    return r;
  }
});

const Range = function(from, to) {
  return Trait.create(
    Object.prototype,
    Trait.compose(
      EnumerableTrait,
      Trait({
        each(fun) {
          for (var i = from; i < to; i++) {
            fun(i);
          }
        }
      })
    )
  );
}

console.log(
  new Range(0,5).inject(0, (a,b) => a+b) // new is optional
);