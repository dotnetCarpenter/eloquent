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
}

module.exports = {
	Grid,
	Vector
}
