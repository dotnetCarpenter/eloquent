"use strict"

module.exports = flatten;

// flatten :: [a] -> [a]
function flatten(array) {
	return array.reduce(reduceFlat);
}

function reduceFlat(a,b) {
	let aIsArray = Array.isArray(a),
			bIsArray = Array.isArray(b);

	return (!aIsArray && !bIsArray) ? [a,b] :
					(aIsArray && !bIsArray) ? a.concat([b]) :
					(!aIsArray && bIsArray) ? [a].concat(b) :
																		flatten(a.concat(b));
}
