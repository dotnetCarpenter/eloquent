"use strict"

const dimensional = [[1,2,3], ["a", "b", "c"]]
const crazy = [1,[2],[3],["a",["b","c"]],["Eloquent"],["JavaScript"]]
const wild = ["a",["b"],"c",1,2,3]
var l = console.log

// flatten :: [a]
function flatten(array) {
	return array.reduce( (b,c) => {
		let bIsArray = Array.isArray(b),
				cIsArray = Array.isArray(c)
		return (bIsArray && cIsArray) ? (l("both are arrays"),flatten(b.concat(c))) :
					(bIsArray && !cIsArray) ? (l("b is array"),b.concat([c])) :
					(!bIsArray && cIsArray) ? (l("c is array"),[b].concat(c)) :
																		(l("none is array"),[b].concat([c]))  
	})
}
l(crazy)
let flatArray = flatten(crazy)
l( flatArray )
l( "Test case pass:", flatArray.every(x => !Array.isArray(x)) )