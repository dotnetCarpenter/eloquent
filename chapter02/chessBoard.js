var white = " ",
    black = "#"
    board = "",
    size = 8;

var row = 0;
while (row < size) {
  for(var column = 0; column < size; column++) {
    board += row % 2 ?
      (column % 2 === 0 ? white : black) :
      (column % 2 === 0 ? black : white);

  }
  board += "\n";
  row++;
}

console.log(board);
