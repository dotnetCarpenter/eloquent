"use strict"

const sim = require("./lifelikeSimulation")
const World = sim.World
const Wall = sim.Wall
const Info = sim.CritterInformation
const critters = require("./newCritters")
const Plant = critters.Plant
//const PlantEater = critters.PlantEater
const PlantEater = critters.YetAnotherCritter
const BetterPlanFinder = critters.BetterPlantFinder

const valley1 = new World(
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
const valley2 = new World(
  ["########################################################" ,
   "#####                                         ##########" ,
   "##   ***   0                                        **##" ,
   "#   *##**                              O        ** O *##" ,
   "#    ***                  **                    ##**  *#" ,
   "#                        *#######               ##***  #" ,
   "#                       **#                     ##**   #" ,
   "#                         #           #*               #" ,
   "#*          #**           #                       O    #" ,
   "#***                      #             ##**     O   **#" ,
   "##****     ###***         #                         *###" ,
   "##            *O*               *                   *###" ,
   "###                             #                  #####" ,   
   "########################################################"],
  {"#": Wall,
   "O": PlantEater,
   "0": BetterPlanFinder,
   "*": Plant }
)


let turnCounter = 0|0
const gameSpeed = 200

setInterval(tick, gameSpeed)
const start = Date.now() + gameSpeed
function tick() {
  valley2.turn()

  console.log(`Turn: ${++turnCounter}`, `- ${((Date.now() - start) / 1000).toFixed(2)} seconds`)
  console.log("Type\t\t\tEnergy\tAction\tDoing")

  const info = valley2.grid.map( (critter, position) => {
    if( ! (critter instanceof PlantEater) ) return
    return new Info(critter).info()
  })

  const maxInfoRows = 20|0
  const infoRows = info.length
  info.splice(maxInfoRows)
  info.forEach(
    info => console.log(`${info.name}\t${info.energy.toFixed(1)}\t${info.actionSuccessfull && info.action.type || "nothing"}\t${info.mentalStatus}`)
  )
  if(infoRows > maxInfoRows)
    console.log(`Not showing ${infoRows - info.length} more critter${infoRows - info.length > 1 ? "s" : ""}...`)

  console.log( valley2.toString() )
}
