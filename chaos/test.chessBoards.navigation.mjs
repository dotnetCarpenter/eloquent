//@ts-check

'use strict'

import assert from 'assert'
import { diagonal, up, left } from './chessBoards.mjs'

const chessBoard1 = [
  [1,1,1],
  [1,1,1],
  [1,1,1],
]
const chessBoard2 = [
  [1,1,1],
  [1,0,1],
  [1,1,0],
]

main()
function main () {
  test(() => {
    let actual = []
    let expected = [1, 1, 1]
    diagonal(chessBoard1, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [1, 0, 0]
    diagonal(chessBoard2, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [1, 1]
    up(chessBoard1, 1, 1, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [0, 1]
    up(chessBoard2, 1, 1, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [1, 1, 1]
    up(chessBoard1, 2, 2, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [0, 1, 1]
    up(chessBoard2, 2, 2, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [0, 1, 1]
    left(chessBoard2, 2, 2, map(actual))
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const actual = []
    const expected = [1, 0, 1]
    left(chessBoard2, 2, 1, map(actual))
    assert.deepStrictEqual(actual, expected)
  })
}

/**
 * @param {{ (): void; (): void; (): void; (): void; }} f
 */
function test (f) {
  f()
}

/**
 * Ad-hoc mapping function.
 * @param {any[]} [array] Optional out argument
 */
function map (array = []) {
  return x => (array.push(x), array)
}
