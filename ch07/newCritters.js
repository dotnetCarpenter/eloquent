"use strict"

const util = require("./util")
const directionNames = util.directionNames
const directions = util.directions
const randomElement = util.randomElement
/**
 * @type {Vector}
 */
const Vector = util.Vector

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
		if(this.energy > 20)
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
		this.lastKnownFoodLocation = null
	}

	act(view) {
		const action = super.act(view)

		if(action.type === "eat")
			this.lastKnownFoodLocation = view.vector.plus(directions[action.direction])

/*		if(this.mentalStatus.indexOf("Hungry") !== -1) {
			//TODO Go to last known food location somehow
			this.lastKnownFoodLocation
		}*/

		return action
	}

	_findPlant(view) {
		if(!this.lastKnownFoodLocation) return super._findPlant(view)

		const plant = view.find("*")
		if(plant) {
			this.direction = plant
			return { type: "eat", direction: plant }
		}

		this.mentalStatus = "\u001B[31m" + (this.energy < 1 ? "Dying..." : "Hungry - looking for food") + "\u001B[39m"

		const plantDirection = findDirection(view.vector, this.lastKnownFoodLocation)
		if(!plantDirection) {
			this.lastKnownFoodLocation = null
			return super._findPlant(view)
		}

		this.direction = plantDirection
		return { type:"move", direction:plantDirection }
	}
}

/**
 * @param {Vector} start A Vector
 * @param {Vector} end
 * @returns {string} A compass point like "e" or "nw"
 */
function findDirection(start, end) {
	let dir = end.subtract(start)

	if(dir.x === 0 && dir.y === 0) return null // we are at the end vector point
	
	const compassDirection = new Vector(
		normalizeDirection(dir.x),
		normalizeDirection(dir.y)
	)
	for(let point in directions) {
		if(directions[point].toString() === compassDirection.toString())
			return point
	}
	throw new Error(`Failed to find ${compassDirection.toString()}`)
}

function normalizeDirection(dir) {
	if(dir < 0) return -1
	else if(dir > 0) return 1
	else return 0
}

class Predator {
	constructor() {
		this.energy = 40
		this.mentalStatus = ""
		this.direction = "s"
		this.lastKnownFoodLocation
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
