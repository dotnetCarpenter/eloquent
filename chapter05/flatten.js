"use strict"

module.exports = flatten;

// flatten :: [a] -> [a]
function flatten(array) {
	return array.reduce(reduceFlat);
}

function reduceFlat(a,b) {
	let aIsArray = Array.isArray(a),
			bIsArray = Array.isArray(b);

	return	(aIsArray && bIsArray) ? flatten(a.concat(b)) : // tail call
					(aIsArray && !bIsArray) ? a.concat([b]) :
					(!aIsArray && bIsArray) ? [a].concat(b) : [a,b];
}
