'use strict';

// Cell interface: .minHeight(), .minWidth(), .draw(width, height)

function rowHeights(rows) {
  return rows.map(row =>
    row.reduce((max, cell) =>
      Math.max(max, cell.minHeight())
    , 0)
  );
}

function colWidths(rows) {
  return rows[0].map((_, i) =>
    rows.reduce((max, row) =>
     Math.max(max, row[i].minWidth())
    , 0)
  );
}

function drawTable(rows) {
  let heights = rowHeights(rows),
      widths = colWidths(rows);

  function drawLine(blocks, lineNo) {
    return blocks.map(block => block[lineNo]).join(' ');
  }

  function drawRow(row, rowNum) {
    let blocks = row.map((cell, colNum) =>
      cell.draw(widths[colNum], heights[rowNum]));
    return blocks[0].map((_, lineNo) => drawLine(blocks, lineNo)).join('\n');
  }

  return rows.map(drawRow).join('\n');
}

function replicate(string, times) {
  return times < 1 ? '' : (string + replicate(string, times - 1));
}

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

function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  let result = [];
  for(let i = 0; i < height; i++) {
    let line = this.text[i] || '';
    result.push(replicate(' ', width - line.length) + line);
  }
  return result;
};

// TEST
function dataTable(data) {
  let keys = Object.keys(data[0]);
  let headers = keys.map(name => new UnderlinedCell(new TextCell(name)));
  let body = data.map(row =>
    keys.map(name => {
      let value = row[name];
      if(typeof value == 'number')
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    })
  );
  return [headers].concat(body);
}

let datalist = [
  {name: "Anita", "super power": "Fearful wrath", team: "ISKRA"},
  {name: "Iskra", "super power": "Sweet peeps", team: "ISKRA"},
  {name: "Jon", "super power": "Dodged smiles", team: "ISKRA"},
];
// let datalist = require('./mountains');
console.log(
  drawTable(dataTable(datalist))
);
