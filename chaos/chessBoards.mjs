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
//   let [x, y] = maxSize(diagonal, chessBoard1)
//   console.log(x, y)
// }

export function maxSize (direction, board) {
  let x, y, value

  for ([x, y, value] of direction(board)) {
    if (value === 0) break
  }

  return [x, y]
}

export function* diagonal (board, x, y) {
  if (x !== y) throw "different x and y is not supported"

  let c = x
  let length = board.length

  do {
    yield [c, c, board[c][c]]
    c++
  } while (c < length)
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
