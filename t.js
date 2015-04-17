var SEPERATOR = "0x0";
var t = [ [ [2], [1, 2, ["JON"], 3, 4, 5], "anita"] ];
//var t = [1,2];

//Array.prototype.forEach = forEach;
Array.prototype.reduce = reduce;
Array.prototype.map = map;

//console.dir(t)
//console.log(Array.prototype.toString)
//var t2 = t.reduce(flatten);
//t.forEach(log)
//debugger;
//log(t.map(iskra).reduce(flatten));
log(t)
log(flatten(t));

function flatten(array) {
  var ret = [];
  array.forEach(function(value) {
    if ( Array.isArray(value) )
      ret = ret.concat(flatten(value));
    else
      ret.push(value);
  });
  return ret;
}


function reduce(fn, seed) {
  var ret;

  this.forEach(function(item, i, all) {
    var a, b;

    // if(i === 0) {
    //   a = seed ? item;
    //   b = seed
    // }
    fn(item, all[i+1]);
    ret += fn(item, all[i+1]);
  });
  return ret;
}

function map(fn, scope) {
  var ret = [];
  this.forEach(function(item, i, all) {
    ret.push( fn.call(scope, item, i, all) );
  });
  return ret;
}

function forEach(fn, scope) {
  for(var i = 0, len = this.length; i < len; i++) {
    fn.call(scope, this[i], i, this);
  }
}

function log(a) {
  console.log(a);
}
function iskra() { return "iskra" }
