"use strict"

class Vector {
	constructor(x, y) {
		this.x = x
		this.y = y
	}

	plus(other) {
	  return new Vector(this.x + other.x, this.y + other.y)
	}

	subtract(other) {
		return new Vector(this.x - other.x, this.y - other.y)
	}

	toString() {
		return `x${this.x}y${this.y}`		
	}
}

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

function randomElement(array) {
	const a = array.slice(0)
	for(let i = a.length - 1; i >= 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const item = a[j]
		a[j] = a[i]
		a[i] = item
	}
	return a[0]
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
	Vector,					// world.js
	directions,			// world.js
	directionNames, // critters.js
	randomElement,  // critters.js/world.js
	elementFromChar,// world.js
	charFromElement // world.js
}
