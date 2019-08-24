//@ts-check

'use strict'

export function diagonal (board, f) {
  let c = 0
  let length = board.length

  do {
    f(board[c][c])
    c++
  } while (c < length)
}

export function up (board, x, y, f) {
  let c = y

  do {
    f(board[c][x])
    c--
  } while (c >= 0)
}

export function left (board, x, y, f) {
  let c = x

  do {
    f(board[y][c])
    c--
  } while (c >= 0)
}
