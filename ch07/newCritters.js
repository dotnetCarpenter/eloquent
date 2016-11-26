"use strict"

const util = require("./util")
const directionNames = util.directionNames
const directions = util.directions
const randomElement = util.randomElement

class Plant {
	constructor() {
		this.energy = 3 + Math.random() * 4
		this.mentalStatus = "Growing"
	}

	act(view) {
		if(this.energy > 15) {
			this.mentalStatus = "Reproducing - looking to expand"
			const space = view.find(" ")
			if(space) return {type: "reproduce", direction: space}
		}
		this.mentalStatus = "Growing"
		if(this.energy < 20) return {type: "grow"}
		this.mentalStatus = "Flowering"
	}
}

class PlantEater {
	constructor() {
		this.energy = 20
		this.mentalStatus = "Content with life"
	}

	act(view) {
		const space = view.find(" ")

		if(this.energy > 60 && space)
			return {type: "reproduce", direction: space}

		const plant = view.find("*")

		if(plant) return {type: "eat", direction: plant}
		if(space) return {type: "move", direction: space}
	}
}

class YetAnotherCritter extends PlantEater {
	constructor() {
		super()
		this.direction = randomElement(directionNames)
	}

	act(view) {
		// use old behavior if energy is above 10 but stop eating if energy is above 20
		if(this.energy > 15)
			return this._doAsUsual(view)

		// head off in one direction either to find food
		return this._findPlant(view)
	}

	_doAsUsual(view) {
		this.mentalStatus = "Happy with life"

		const action = super.act(view)
		if(action.type === "eat" && this.energy >= 50) {
			return this._stopEating(view)
		}

		this.direction = action.direction
		return action
	}

	_stopEating(view) {
		this.mentalStatus = "Satiated - looking for space"

		if (view.look(this.direction) != " ")
			this.direction = view.find(" ") || "s"

		return { type: "move", direction: this.direction }
	}

	_findPlant(view) {
		this.mentalStatus = this.energy < 1 ? "Dying..." : "Hungry - looking for food"

		// look for plant around
		const plant = view.find("*")
		if(plant) {
			this.direction = plant
			return { type: "eat", direction: plant }
		}

		// if not then look for space in the direction we are heading
		if(view.look(this.direction) != " ")
			this.direction = view.find(" ") || "e"

		return { type: "move", direction: this.direction }
	}
}

class BetterPlantFinder extends YetAnotherCritter {
	constructor() {
		super()
		this.lastKnownFoodLocation
	}

	act(view) {
		const action = super.act(view)

		if(action.type === "eat")
			this.lastKnownFoodLocation = view.vector.plus(directions[action.direction])

		if(this.mentalStatus.indexOf("Hungry") !== -1) {
			//TODO Go to last known food location somehow
			this.lastKnownFoodLocation
		}

		return action
	}
}

class Predator {
	constructor() {
		this.energy = 40
		this.mentalStatus = ""
		this.direction = "s"

	}

	act(view) {

	}
}

module.exports = {
	Plant,
	PlantEater,
	YetAnotherCritter,
	BetterPlantFinder,
	Predator
}
