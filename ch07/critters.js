"use strict"

const util = require("./util")
const randomElement = util.randomElement
const directionNames = util.directionNames

class BouncingCritter {
  constructor() {
		const names = ["Allan", "Bo", "Jon", "Lai", "Lars", "Mishka", "Trym", "Åse"]
		this.name = randomElement(names)
    this.direction = randomElement(directionNames)
  }

  act(view) {
    if (view.look(this.direction) != " ")
      this.direction = view.find(" ") || "s"
		console.log(`${this.name}\tis moving ${this.direction}`)
    return {type: "move", direction: this.direction}
  }
}

module.exports = {
	BouncingCritter
}
