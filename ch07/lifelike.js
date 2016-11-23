"use strict"

const sim = require("./lifelikeSimulation")
const World = sim.World
const Wall = sim.Wall
const Plant = sim.Plant
const PlantEater = sim.PlantEater

const valley = new World(
  ["############################" ,
   "#####                 ######" ,
   "##   ***                **##" ,
   "#   *##**           ** O *##" ,
   "#    ***     O      ##**  *#" ,
   "#       O           ##***  #" ,
   "#                   ##**   #" ,
   "#   O       #*             #" ,
   "#*          #**       O    #" ,
   "#***        ##**     O   **#" ,
   "##****     ###***       *###" ,
   "############################"],
  {"#": Wall,
   "O": PlantEater,
   "*": Plant }
)

console.log( valley.toString() )
setInterval(tick, 300)
const start = Date.now()
function tick() {
  valley.turn()
  console.log(`\t\t${((Date.now() - start) / 1000).toFixed(2)} seconds`)
  console.log( valley.toString() )
}
