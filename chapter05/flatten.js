"use strict"

module.exports = flatten;

// flatten :: [a] -> [a]
function flatten(array) {
	return array.reduce( (b,c) => {
		let bIsArray = Array.isArray(b),
				cIsArray = Array.isArray(c);
		const actions = [concat, append, prepend, add];
		let action;
		if(bIsArray && cIsArray) action = actions[0];
		if(bIsArray && !cIsArray) action = actions[1];
		if(!bIsArray && cIsArray) action = actions[2];
		if(!bIsArray && !cIsArray) action = actions[3]
		return action(b,c);
	})
	
	function append(list, value) {
		list.push(value);
		return list;
	}
	function prepend(value, list) {
		list.unshift(value);
		return list;
	}
	function concat(list1, list2) {
		let list = list1.concat(list2);
		return flatten(list);
	}
	function add(a,b) {
		return [a,b];
	}
}