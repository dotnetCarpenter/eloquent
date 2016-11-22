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

    return {type: "move", direction: this.direction}
  }
}

class WallFollower {
	constructor() {
		const names = ["Jashua", "Jesus", "Joseph", "Paul"]
		this.name = randomElement(names)
		this.dir = "s"
	}

	get direction() {
		return this.dir
	}

	act(view) {
		let start = this.dir

		if( view.look( dirPlus(this.dir, -3) ) !== " " )
			start = this.dir = dirPlus(this.dir, -2)

		while(view.look(this.dir) !== " ") {
			this.dir = dirPlus(this.dir, 1)
			if(this.dir === start) break
		}

		return {type: "move", direction: this.dir}
	}
}

function dirPlus(dir, n) {
	const index = directionNames.indexOf(dir)
	return directionNames[(index + n + 8) % 8]
}


module.exports = {
	BouncingCritter,
	WallFollower
}
