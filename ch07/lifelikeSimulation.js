"use strict"

const sim = require("./simulation")
const World = sim.World
const Wall = sim.Wall
const View = sim.View
const util = require("./util")
const elementFromChar = util.elementFromChar

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
			if(critter.energy <= 0) {
				this.grid.set(vector, null) // die
			}
		}

		critter.action = action
		critter.actionSuccessfull = handled
	}
}

class CritterInformation {
	constructor(critter) {
		this.critter = critter
	}

	info() {
		const info = {
			name: this.critter.constructor.name
		}
		Object
			.keys(this.critter)
			.forEach(property => {
				info[property] = this.critter[property]
			})
		return info
	}
}

module.exports = {
	Wall,
	World: LifelikeWorld,
	CritterInformation
}
