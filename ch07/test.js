"use strict"

const assert = require("assert")
const life = require("./world")
const Grid = life.Grid
const World = life.World
const Wall = life.Wall
const util = require("./util")
const Vector = util.Vector
const directionNames = util.directionNames
const BouncingCritter = require("./critters").BouncingCritter


assert.doesNotThrow(() => new Grid(5, 5))

let grid = new Grid(5, 5)
assert.equal(grid.get(new Vector(1, 1)), undefined)

grid.set(new Vector(1, 1), "X")
assert.equal(grid.get(new Vector(1, 1)), "X")

assert.deepEqual(directionNames.join(" "), "n ne e se s sw w nw")


const plan = ["############################",
              "#                       ##o#",
              "#           o          #   #",
              "#               ###        #",
              "#   ###           #        #",
              "#    #    o        #       #",
              "#    #                     #",
              "#          #               #",
              "#                          #",
              "#      #           ### #   #",
              "#     o               oo   #",
              "############################"]
let world = new World(plan, { "#": Wall, o: BouncingCritter})
let result = world.toString()
assert.equal(plan.join("\n") + "\n", result, "Its equal to 'plan' but with a new-line in the end")



/*console.dir(assert)*/
console.log("Everything looks a'ok")