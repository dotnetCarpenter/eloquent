"use strict"

module.exports = flatten;

// flatten :: [a] -> [a]
function flattenOld(array, accu = []) {
    array.forEach(a => {
        if(Array.isArray(a)) flatten(a, accu)
        else accu.push(a)
    })
    return accu
}

function flatten(array) {
	if (!Array.isArray(array)) return [array]
	return array.reduce((a,b) => a.concat(flatten(b)), [])
}

/*
function flatten(array) {
	return array.length === 0 ? [] : array.reduce(reduceFlat);
}

function reduceFlat(a,b) {
	let aIsArray = Array.isArray(a),
			bIsArray = Array.isArray(b);

	return	(aIsArray && bIsArray) ? flatten(a.concat(b)) : // tail call http://www.ecma-international.org/ecma-262/6.0/#sec-expression-rules
					(aIsArray && !bIsArray) ? a.concat([b]) :
					(!aIsArray && bIsArray) ? [a].concat(b) : [a,b];
}
*/
