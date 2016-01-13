"use strict";

const Trait = require("traits.js");

const dataList = [
  { name: "object composition", "programming paradigm": "OOP" },
  { name: "function composition", "programming paradigm": "FP" }
];

function TextCell(text) {
  this.text = text.split('\n');
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce((width, line) =>
    Math.max(width, line.length), 0);
};
TextCell.prototype.minHeight = function() {
  return this.text.length;
};
TextCell.prototype.draw = function(width, height) {
  let result = [];
  for (let i = 0; i < height; i++) {
    let line = this.text[i] || '';
    result.push(line + replicate(' ', width - line.length));
  }
  return result;
};

function UnderlinedCell(inner) {
  this.inner = inner;
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth();
};
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1;
};
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([replicate('-', width)]);
};

console.log(drawTable(dataTable(dataList)))
console.dir(
  dataTable(dataList)[0].minWidth()
  // new UnderlinedCell( new TextCell(
  //   Object.keys(dataList[0])[1]
  // ) ).minWidth()
  // dataTable(dataList)[1].inner.text
);
let u = new UnderlinedCell( new TextCell('programming paradigm'))
console.dir(u.minWidth());

function drawTable(rows) {
  //return rows[0].map((_, i) => 0);
  return rows.map(_ => // create new array of equal size as rows
    rows.reduce((max, row) => // return the longest length of characters
     Math.max(max, row.minWidth()) // find the longest length of two
    , 0)
  );
}

function dataTable(data) {
  let keys = Object.keys(data[0]);
  let headers = keys.map(name =>
    new UnderlinedCell( new TextCell(name) )
  );
  return headers;
}


function replicate(string, times) {
  return times < 1 ? '' : (string + replicate(string, times - 1));
}
