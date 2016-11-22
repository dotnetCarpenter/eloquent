"use strict"

class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	plus(other) {
		 return new Vector(this.x + other.x, this.y + other.y)
	}
}

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
       // if(value != null)
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
        this.grid.set( new Vector(x, y),
                  elementFromChar(legend, line[x]) )
    })
  }

  toString() {
    let output = ""
    let row = 0
    this.grid.forEach((val, vector) => {
      if(row < vector.y) row++, output += "\n"
      output += val == null ? " " : val.originChar
    })
    /*for(let y = 0; y < this.grid.height; y++) {
      for(let x = 0; x < this.grid.width; x++) {
        const element = this.grid.get(new Vector(x, y))
        output += charFromElement(element)
      }
      output += "\n"
    }*/
    return output
  }

}

function Wall() {}

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


const plan = ["############################",
              "#                       ##o#",
              "#           o          #   #",
              "#               ###        #",
              "#   ###           #        #",
              "#    #    o        #       #",
              "#    #                     #",
              "#          #               #",
              "#                          #",
              "#      #           ### #   #",
              "#     o               oo   #",
              "############################"]

const directions = {
	n:  new Vector( 0, -1),
	ne: new Vector( 1, -1),
	e:  new Vector( 1,  0),
	se: new Vector( 1,  1),
	s:  new Vector( 0,  1),
	sw: new Vector(-1,  1),
	w:  new Vector(-1,  0),
	nw: new Vector(-1, -1)
}

const directionNames = Object.keys(directions)

// utils
function randomElement(array) {
  return array[Math.floor(Math.random() * array.length)]
}

function elementFromChar(legend, ch) {
  if(ch == " ") return null

  const element = new legend[ch]
  element.originChar = ch
  return element
}

function charFromElement(element) {
  if(!element) return " "
  return element.originChar
}


module.exports = {
	Grid,
	Vector,
  World,
  Wall,
  BouncingCritter,
  directionNames
}
