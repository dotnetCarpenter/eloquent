"use strict";

var debug = false;
var program;
var testPrograms = [];

module.exports = {
  set debug(bool) {
    debug = Boolean(bool);
  },
  get debug() {
    return debug;
  },
  log: function() {
    if(debug)
      console.log.apply(null, arguments);
  },
  getTestCode: function() {
    var testString = testPrograms[0];

    if( !process && !process.argv)
      return; // abort if we aren't in a nodejs compatible environment

    if(!program && require) { // load commander if it isn't loaded
      program = require("commander");
      program
        .version("1.0.0")
        .option("-d, --debug", "output debug information")
        .option("-c, --code <code>", "JavaScript code to evaluate")
    }

    testPrograms.forEach(function(test, i) {
      program
        .option("" + i + " --code is ignored " + (i === 0 ? " (default)" : ""), test);
        // .command("" + i)
        // .description(test + (i === 0 ? "\t- default" : ""))
        // .action(/*???*/)
    });

    program.parse(process.argv);
    debug = program.debug;

    if(program.code)
      testString = program.code;

    if( testPrograms[ process.argv[2] ] )
      testString = testPrograms[ process.argv[2] ];

    return testString;
  },
  addTest: function(testcode) {
    testPrograms.push(testcode);
  }
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
