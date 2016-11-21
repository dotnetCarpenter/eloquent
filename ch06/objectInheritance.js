"use strict"

const Trait = require("traits.js")
const flatten = require("../chapter05/flatten")

const dataList = [ // Cannabis varieties - source: http://www.turiba.lv/f/Latvijas_kanepju_nozre.Prieksizpete.pdf
  { breed: "Ferimon", "country of origin": "France", "Seed yield (kg/ha)": "800-900", "Plant height (cm)": "6.2" },
  { breed: "Bialobrzeskie", "country of origin": "Polen", "Seed yield (kg/ha)": "500-1,000", "Plant height (cm)": "8-9" },
  { breed: "USO-31", "country of origin": "Ukraine", "Seed yield (kg/ha)": "700-1,000", "Plant height (cm)": "3.5-7.0" },
  { breed: "Finola", "country of origin": "Finland", "Seed yield (kg/ha)": "400-1,800", "Plant height (cm)": "0.5-1.5" }
]

function TextCell(text) {
  this.text = text.split('\n')
}
TextCell.prototype.minWidth = function() {
  return this.text.reduce((width, line) =>
    Math.max(width, line.length), 0)
}
TextCell.prototype.minHeight = function() {
  return this.text.length
}
TextCell.prototype.draw = function(width, height) {
  let result = []
  for (let i = 0; i < height; i++) {
    let line = this.text[i] || ''
    result.push(line + replicate(' ', width - line.length))
  }
  return result
}

// UnderlinedCell has a reference to an instance of TextCell
// and delegate calls to 
function UnderlinedCell(inner) {
  this.inner = inner
}
UnderlinedCell.prototype.minWidth = function() {
  return this.inner.minWidth()
}
UnderlinedCell.prototype.minHeight = function() {
  return this.inner.minHeight() + 1
}
UnderlinedCell.prototype.draw = function(width, height) {
  return this.inner.draw(width, height - 1)
    .concat([replicate('-', width)])
}

// RTextCell inherite all of TextCell methods
// and overwrite the 'draw' method
function RTextCell(text) {
  TextCell.call(this, text)
}
RTextCell.prototype = Object.create(TextCell.prototype)
RTextCell.prototype.draw = function(width, height) {
  let result = []
  for(let i = 0; i < height; i++) {
    let line = this.text[i] || ''
    result.push(replicate([' '], width - line.length).concat(line).join(''))
  }
  return result
}

console.log(drawTable(dataTable(dataList)))

function dataTable(data) {
  let keys = Object.keys(data[0])
  let headers = keys.map(name =>
    new UnderlinedCell( new TextCell(name) )
  )
  let body = data.map(row =>
    keys.map(name => {
      console.log(row[name])
      return new TextCell(String(row[name]))
    })
  )

  console.log(flatten(body))
  console.log(body)
  console.log(keys)
  console.log(headers)

  return headers.concat( flatten(body) )
}

function drawTable(rows) {
  let widths = colWidths(rows),
      heights = rowHeights(rows)
 console.log(rows.length)
  return drawLine(rows.map(drawRow))

  function drawRow(cell, n) {
    return cell.draw(widths[n], heights[n])
  }
  function drawLine(lines) {
    let line = lines[0].map((_, i) => // create an array with length == row height
      lines.map(block => block[i]) // combine all strings in the i position
           .reduce((sentence1, sentence2) => sentence1 + ' ' + sentence2)
    )
    return line.join('\n') // combine all lines wih a newline seperator between
  }
}

function colWidths(rows) {
  return rows.map(row => // create new array of equal size as rows
    row.minWidth() // fill each row with the minimum width (using the cell's minWidth method) 
  )
}

function rowHeights(rows) {
  return rows.map(row => // create new array of equal size as rows
    rows.reduce((max, cell) => // call minHeight() on each cell
      Math.max(max, cell.minHeight()) // and return the heighest value
    , 0)
  )
}

function replicate(string, times) {
  let ret = ''
  while (times --> 0) {
    ret += string
  }
  return ret
}
