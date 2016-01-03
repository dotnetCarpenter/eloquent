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
