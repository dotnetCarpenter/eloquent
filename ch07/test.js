const assert = require("assert")
const life = require("./life")
const Grid = life.Grid
const Vector = life.Vector

assert.doesNotThrow(() => new Grid(5, 5))

const grid = new Grid(5, 5)
assert.equal(grid.get(new Vector(1, 1)), undefined)

grid.set(new Vector(1, 1), "X")
assert.equal(grid.get(new Vector(1, 1)), "X")

/*console.dir(assert)*/
console.log("Everything looks a'ok")
