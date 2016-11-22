"use strict"

const sim = require("./simulation")
const World = sim.World
const Wall = sim.Wall
const critters = require("./critters")
const randomElement = require("./util").randomElement


const plan = ["############################",
              "#                      ±##o#",
              "#           o          #   #",
              "#               ###        #",
              "#   ###           #        #",
              "#    #    o    ±   #       #",
              "#    #                     #",
              "#          #          o    #",
              "#             o            #",
              "#      #           ### #   #",
              "#±                         #",
              "############################"]


let world = new World( plan,
  { "#": Wall,
    "o": critters.BouncingCritter,
    "±": critters.WallFollower }
)
console.log( world.toString() )
setInterval(tick, 160)
const start = Date.now()
function tick() {
  world.turn()
  console.log(`\t\t${((Date.now() - start) / 1000).toFixed(2)} seconds`)
  console.log( world.toString() )
}
