// @ts-nocheck

'use strict'

// const chessBoard1 = [
//   [1,1,1],
//   [1,1,1],
//   [1,1,1],
// ]
// const chessBoard2 = [
//   [1,1,1],
//   [1,0,1],
//   [1,1,0],
// ]

// main()
// function main () {
//   let [x, y] = maxSize(diagonal, chessBoard2, 0, 0)
//   console.log(x, y)
// }

export function maxSquare (direction, board, ...coordinates) {
  let x, y, value

  for ([x, y, value] of direction(board, ...coordinates)) {
    if (value === 0) break
  }

  return [x, y]
}

export function* diagonal (board, x, y) {
  let length = board.length

  do {
    yield [x, y, board[y][x]]
    x++
    y++
  } while (x < length && y < length)
}

export function* up (board, x, y) {
  let c = y

  do {
    yield [x, c, board[c][x]]
    c--
  } while (c >= 0)
}

export function* left (board, x, y) {
  let c = x

  do {
    yield [c, y, board[y][c]]
    c--
  } while (c >= 0)
}
