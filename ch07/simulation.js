"use strict"

const util = require("./util")
const Vector = util.Vector
const elementFromChar = util.elementFromChar
const charFromElement = util.charFromElement
const directions = util.directions
const randomElement = util.randomElement

class Grid {
	constructor(width, height) {
		this.space = new Array(width * height)
		this.width = width
		this.height = height
	}

	isInside(vector) {
		return vector.x >= 0 && vector.x < this.width &&
					 vector.y >= 0 && vector.y < this.height
	}

	get(vector) {
		return this.space[vector.x + this.width * vector.y]
	}

	set(vector, value) {
		this.space[vector.x + this.width * vector.y] = value
	}

  forEach(f, context) {
    for(let y = 0; y < this.height; y++) {
      for(let x = 0; x < this.width; x++) {
        const value = this.space[x + y * this.width]
        if(value != null)
          f.call(context, value, new Vector(x, y))
      }
    }
  }
}

class World {
  constructor(map, legend) {
    this.grid = new Grid(map[0].length, map.length)
    this.legend = legend

    map.forEach( (line, y) => {
      for (let x = 0; x < line.length; x++)
        this.grid.set( new Vector(x, y), elementFromChar(legend, line[x]) )
    })
  }

  turn() {
    const acted = []
    this.grid.forEach( (critter, vector) => {
      if(critter.act && acted.indexOf(critter) === -1) {
        acted.push(critter)
        this._letAct(critter, vector)
      }
    })
		// write critters name and direction
		//console.log(acted.map(c => `${c.name||c.constructor.name}\tis moving ${c.direction}`).join("\n"))
  }

  _letAct(critter, vector) {
    const action = critter.act(new View(this, vector))
    if(action && action.type === "move") {
      const dest = this._checkDestination(action, vector)
      if(dest && this.grid.get(dest) == null) {
        this.grid.set(vector, null)
        this.grid.set(dest, critter)
      }
    }
  }

  _checkDestination(action, vector) {
    if(directions.hasOwnProperty(action.direction)) {
      const dest = vector.plus(directions[action.direction])
      if(this.grid.isInside(dest)) return dest
    }
  }

  toString() {
    let output = ""
    for(let y = 0; y < this.grid.height; y++) {
      for(let x = 0; x < this.grid.width; x++) {
        const element = this.grid.get(new Vector(x, y))
        output += charFromElement(element)
      }
      output += "\n"
    }
    return output
  }

}

class View {
  constructor(world, vector) {
    this.world = world
    this.vector = vector
  }

  find(char) {
    const found = this.findAll(char)
    if(found.length === 0) return null
    return randomElement(found)
  }

  findAll(char) {
    const found = []
    for(let dir in directions)
      if(this.look(dir) === char)
        found.push(dir)
    return found
  }

  look(dir) {
    const target = this.vector.plus(directions[dir])
    if(this.world.grid.isInside(target))
      return charFromElement(this.world.grid.get(target))
    else
      return "#"
  }
}

function Wall() {}

module.exports = {
	Grid,
	World,
	View,
	Wall
}
