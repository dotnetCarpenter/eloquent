"use strict";

var debug = false;
// var SEPERATOR = "0x0";
var program;

module.exports = {
  set debug(bool) {
    debug = Boolean(bool);
  },
  get debug() {
    return debug;
  },
  log: function(msg) {
    if(debug)
      console.log(msg);
  },
  getTestCode: function() {
    var testString = this.defaultInput;

    if( !process && !process.argv)
      return; // abort if we aren't in a nodejs compatible environment

    if(!program && require) { // load commander if it isn't loaded
      program = require("commander");
      program
        .option("-d, --debug", "Output debug information")
        .option("-c, --code <code>", "JavaScript code to evaluate")
      // program
      //   .command("*")
      //   .description("JavaScript code to evaluate")
      //   .action(function(input) {
      //     var testString = input || self.defaultInput;
      //     console.log(testString + " eval to:", eval(testString));
      //   });
    }

    program.parse(process.argv);
    debug = program.debug;
    if(program.code)
      testString = program.code ;

    return testString;
  },
  defaultInput: ""
}

// function flatten(array) {
//   var ret = [];
//   array.forEach(function(value) {
//     if ( Array.isArray(value) )
//       ret = ret.concat(flatten(value));
//     else
//       ret.push(value);
//   });
//   return ret;
// }
