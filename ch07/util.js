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
	Vector,					// world.js
	directions,			// world.js
	directionNames, // critters.js
	randomElement,  // critters.js
	elementFromChar,// world.js
	charFromElement // world.js
}
