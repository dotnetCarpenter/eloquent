"use strict"

const dimensional = [[1,2,3], ["a", "b", "c"]]
const crazy = [1,2,[3],["a",["b","c"]],["Eloquent"],["JavaScript"]]
var l = console.log
function flatten(array) {
	return array.reduce( (b,c) => {
		let bIsArray = Array.isArray(b),
				cIsArray = Array.isArray(c)
		return (bIsArray && cIsArray) ? (l("both are arrays"),flatten(b.concat(c))) :
					(!bIsArray && cIsArray) ? (l("c is array"),[b].concat(c)) :
					(bIsArray && !cIsArray) ? (l("b is array"),b.concat([c])) :
																		(l("none is array"),[b].concat([c]))  
	})
}
console.log(crazy)
console.log( flatten(crazy) )