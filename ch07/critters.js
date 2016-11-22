"use strict"

const util = require("./util")
const randomElement = util.randomElement
const directionNames = util.directionNames

class BouncingCritter {
  constructor() {
    this.direction = randomElement(directionNames)
  }

  act(view) {
    if (view.look(this.direction) != " ")
      this.direction = view.find( ) || "s"
    return {type: "move", direction: this.direction}
  }
}

module.exports = {
	BouncingCritter
}
