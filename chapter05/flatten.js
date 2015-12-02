"use strict"

module.exports = flatten;

// flatten :: [a] -> [a]
function flatten(array) {
	return array.reduce( (b,c) => {
		let bIsArray = Array.isArray(b),
				cIsArray = Array.isArray(c);
		
		return (!bIsArray && !cIsArray) ? [b,c] :
						(bIsArray && !cIsArray) ? b.push(c) :
						(!bIsArray && cIsArray) ? [b].concat(c) :
																			flatten(b.concat(c));
	})
}