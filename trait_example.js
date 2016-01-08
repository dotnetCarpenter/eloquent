"use strict";

const Trait = require("traits.js");

class EnumerableTrait
{
    constructor()
    {
        return Trait.compose(Trait(EnumerableTrait.prototype), Trait({
          each: Trait.required // should be provided by the composite
        }));
    }

    map(fun)
    {
        var r = [];
        this.each(function (e) {
            r.push(fun(e));
        });
        return r;
    }

    inject(init, accum)
    {
        var r = init;
        this.each(function (e) {
            r = accum(r, e);
        });
        return r;
    }
}
// console.log(new EnumerableTrait())

class Range
{
    constructor(from, to)
    {
        return Trait.create(
            Object.prototype,
            Trait.compose(
              new EnumerableTrait,
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
  new Range(0,5).inject(0, (a,b) => a+b)
);

