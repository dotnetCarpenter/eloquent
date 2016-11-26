"use strict"

const sim = require("./lifelikeSimulation")
const World = sim.World
const Wall = sim.Wall
const Plant = sim.Plant
//const PlantEater = sim.PlantEater
const PlantEater = sim.YetAnotherCritter
const Info = sim.CritterInformation

const valley = new World(
  ["############################" ,
   "#####                 ######" ,
   "##   ***                **##" ,
   "#   *##**           ** O *##" ,
   "#    ***            ##**  *#" ,
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

let turnCounter = 0

setInterval(tick, 300)
const start = Date.now() + 300
function tick() {
  valley.turn()

  console.log(`Turn: ${++turnCounter}`)
  console.log("Type\t\t\tEnergy\tAction\tDoing")

  valley.grid.forEach( (critter, position) => {
    if( ! (critter instanceof PlantEater) ) return

    const info = new Info(critter).info()

    console.log(`${info.name}\t${info.energy.toFixed(1)}\t${info.actionSuccessfull && info.action.type || "nothing"}\t${info.mentalStatus}`)
  })

  console.log(`\t\t${((Date.now() - start) / 1000).toFixed(2)} seconds`)

  console.log( valley.toString() )
}
