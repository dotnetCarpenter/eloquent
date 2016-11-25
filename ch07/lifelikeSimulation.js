"use strict"

const sim = require("./simulation")
const World = sim.World
const Wall = sim.Wall
const View = sim.View
const util = require("./util")
const elementFromChar = util.elementFromChar
const randomElement = util.randomElement
const directionNames = util.directionNames

const actionTypes = Object.create(null)
actionTypes.grow = critter => {
	critter.energy += 0.5
	return true
}
actionTypes.move = function(critter, vector, action) {
	const dest = this._checkDestination(action, vector)

	if( dest == null ||
			critter.energy <= 1 ||
			this.grid.get(dest) != null ) return false

	critter.energy -= 1
	this.grid.set(vector, null)
	this.grid.set(dest, critter)
	return true
}
actionTypes.eat = function(critter, vector, action) {
	const dest = this._checkDestination(action, vector)
	const atDest = dest != null && this.grid.get(dest)

	if( !atDest || atDest.energy == null) return false

	critter.energy += atDest.energy
	this.grid.set(dest, null)
	return true
}
actionTypes.reproduce = function(critter, vector, action) {
	const baby = elementFromChar(this.legend, critter.originChar)
	const dest = this._checkDestination(action, vector)

	if( dest == null ||
			critter.energy <= 2 * baby.energy ||
			this.grid.get(dest) != null ) return false

	critter.energy -= 2 * baby.energy
	this.grid.set(dest, baby)
	return true
}

class LifelikeWorld extends World {
	constructor(map, legend) {
		super(map, legend)
	}

	_letAct(critter, vector) {
		const action = critter.act(new View(this, vector))
		const handled = action &&
			action.type in actionTypes &&
			actionTypes[action.type].call(this, critter, vector, action)

		if(!handled) {
			critter.energy -= 0.2
			if(critter.energy <= 0)
				this.grid.set(vector, null) // die
		}

		if(action == null || critter.constructor.name !== "Plant")
    	console.log(
`Energy: ${critter.energy.toFixed(1)}\tAction: ${handled && action && action.type||"nothing"}\ttype: ${critter.constructor.name}`
			)

	}
}

class Plant {
	constructor() {
		this.energy = 3 + Math.random() * 4
	}

	act(view) {
		if(this.energy > 15) {
			const space = view.find(" ")
			if(space) return {type: "reproduce", direction: space}
		}
		if(this.energy < 20) return {type: "grow"}
	}
}

class PlantEater {
	constructor() {
		this.energy = 20
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
		this.dir = randomElement(directionNames)
	}

	set direction(value) {
		if(value == " ") debugger
		this.dir = value
	}
	get direction() {
		return this.dir
	}

	act(view) {
		// use old behavior if energy is above 10 but stop eating if energy is above 20
		if(this.energy > 10)
			return this._doAsUsual(view)

		// head off in one direction either to find food
		return this._findPlant(view)
	}

	_doAsUsual(view) {
		const action = super.act(view)
		if(action.type === "eat" && this.energy >= 70)
			return this._stopEating(view)

		this.direction = action.direction
		return action
	}

	_stopEating(view) {
		if (view.look(this.direction) != " ")
			this.direction = view.find(" ") || "s"

		return {type: "move", direction: this.direction}
	}

	_findPlant(view) {
		// look for plant around
		const plant = view.find("*")
		if(plant) {
			this.direction = plant
			return { type: "eat", direction: plant }
		}

		// if not then look for space in the direction we are heading
		if(view.look(this.direction) != " ")
			this.direction = view.find(" ") || "s"

		return { type: "move", direction: this.direction }
	}
}

module.exports = {
	Plant,
	PlantEater,
	YetAnotherCritter,
	Wall,
	World: LifelikeWorld,
}
