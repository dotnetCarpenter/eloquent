"use strict";

const Trait = require("traits.js");

class EnumerableTrait
{
    constructor() {
        return Trait.compose(Trait(EnumerableTrait.prototype), Trait({
          each: Trait.required // should be provided by the composite
        }));
    }

    map(fun) {
        let r = [];
        this.each(e => { r.push(fun(e)); });
        return r;
    }

    inject(init, accum) {
        let r = init;
        this.each(e => { r = accum(r, e)});
        return r;
    }
}
// class T2 {
//   constructor() {
//     this.hi = "I'm T2";
//     return Trait({
//       hi: "I'm not T2"
//     });
//   }
// }
// function EnumerableTrait() {
//   return Trait(EnumerableTrait.prototype);
// }
// EnumerableTrait.prototype = {
//   map: function(fun) { /* not used */; },
//   inject: function(init, accum) {
//     var r = init;
//     this.each(function(e) {
//       r = accum(r, e);
//     });
//     return r;
//   },
//   each: Trait.required
// }

console.log(new EnumerableTrait);

class Range
{
    constructor(from, to)
    {
        return Trait.create(
            Object.prototype, // the prototype is insignificant in trait resolution
            Trait.compose(
              new EnumerableTrait, // () is optional when there is no arguments
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
}

console.log(
  new Range(0,5).inject(0, (a,b) => a+b) // new is NOT optional
);

