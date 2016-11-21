'use strict';

const Trait = require('traits.js');

function replicate(x, times) {
  if(times < 1 || x.length === 0) return [];
  else return x.concat( replicate(x, times-1) );
  // return times < 1 ? '' : string + replicate(x, times - 1);
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
    result.push([line].concat( replicate([' '], width - line.length)).join(''));
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
    .concat([replicate(['-'], width).join('')]);
};

function RTextCell(text) {
  TextCell.call(this, text);
}
RTextCell.prototype = Object.create(TextCell.prototype);
RTextCell.prototype.draw = function(width, height) {
  let result = [];
  for(let i = 0; i < height; i++) {
    let line = this.text[i] || '';
    result.push(replicate([' '], width - line.length).concat(line).join(''));
  }
  return result;
};

const Capitalize = Trait({
  capitalize() {
    this.text[0] = this.text[0].split(' ').map(
      word => word.charAt(0).toUpperCase() + word.substr(1).toLowerCase()
    ).join(' ');
  }
});
function THeaderCell(inner) {
  return Trait.compose(
    Capitalize,
    Trait(new UnderlinedCell(inner)),
    Trait({
      // minWidth() { return inner.minWidth() },
      // minHeight() { return inner.minHeight() },
      // draw(width, height) {
      //   this.capitalize();
      //   return inner.draw(width, height)
      // },
      get text() { return inner.text; },
      set text(value) { inner.text = value; }
    })
  );
}
function HeaderCell(inner) {
  return Trait.create(
    UnderlinedCell.prototype,
    THeaderCell(inner)
  );
}
//HeaderCell.prototype = Trait.create(UnderlinedCell.prototype, THeaderCell);

// Cell interface: .minHeight(), .minWidth(), .draw(width, height)

function rowHeights(rows) {
  return rows.map(row =>
    row.reduce((max, cell) =>
      Math.max(max, cell.minHeight())
    , 0)
  );
}

function colWidths(rows) {
  return rows[0].map((_, i) => // create an array of equal size as rows[0]
    rows.reduce((max, row) => // return the longest length of characters
     Math.max(max, row[i].minWidth()) // find the longest length of two 
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

// TEST
function dataTable(data) {
  let keys = Object.keys(data[0]);
  let headers = keys.map(name =>
    new HeaderCell( new TextCell(name) )
  );
  // capitalize header row
  headers.forEach(header => { header.capitalize(); });

  let body = data.map(row =>
    keys.map(name => {
      let value = row[name];
      if(typeof value == 'number')
        return new RTextCell(String(value));
      else
        return new TextCell(String(value));
    })
  );
  console.dir( [headers].concat(body))
  return [headers].concat(body);
}

var datalist = [
  {name: "Anita", "super power": "Fearful wrath", team: "ISKRA"},
  {name: "Iskra", "super power": "Sweet peeps", team: "ISKRA"},
  {name: "Jon", "super power": "Dodge smiles", team: "ISKRA"},
];
console.log(
  drawTable(dataTable(datalist)),
  "\n\n"
);

var datalist = require('./mountains');
console.log(
  drawTable(dataTable(datalist))
);

