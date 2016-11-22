"use strict"

const World = require("./world").World
const Wall = require("./world").Wall
const BouncingCritter = require("./critters").BouncingCritter


const plan = ["############################",
              "#                       ##o#",
              "#           o          #   #",
              "#               ###        #",
              "#   ###           #        #",
              "#    #    o        #       #",
              "#    #                     #",
              "#          #          o    #",
              "#             o            #",
              "#      #           ### #   #",
              "#                          #",
              "############################"]


let world = new World(plan, { "#": Wall, o: BouncingCritter})
console.log( world.toString() )
setInterval(tick, 160)
const start = Date.now()
function tick() {
  world.turn()
  console.log(`\t\t${((Date.now() - start) / 1000).toFixed(2)} seconds`)
  console.log( world.toString() )
}
