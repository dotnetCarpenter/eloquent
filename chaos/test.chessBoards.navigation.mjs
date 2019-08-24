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

function cell (x, y, value) {
  return [ x, y, value ]
}

main()
function main () {
  test(() => {
    const expected = [cell(0, 0, 1), cell(1, 1, 1), cell(2, 2, 1)]
    const actual = map(diagonal, chessBoard1, 0, 0)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(0, 0, 1), cell(1, 1, 0), cell(2, 2, 0)]
    const actual = map(diagonal, chessBoard2, 0, 0)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(1, 0, 1), cell(2, 1, 1)]
    const actual = map(diagonal, chessBoard2, 1, 0)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(1, 1, 1), cell(1, 0, 1)]
    const actual = map(up, chessBoard1, 1, 1)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(1, 1, 0), cell(1, 0, 1)]
    const actual = map(up, chessBoard2, 1, 1)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(2, 2, 1), cell(2, 1, 1), cell(2, 0, 1)]
    const actual = map(up, chessBoard1, 2, 2)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(2, 2, 0), cell(2, 1, 1), cell(2, 0, 1)]
    const actual = map(up, chessBoard2, 2, 2)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(2, 2, 0), cell(1, 2, 1), cell(0, 2, 1)]
    const actual = map(left, chessBoard2, 2, 2)
    assert.deepStrictEqual(actual, expected)
  })

  test(() => {
    const expected = [cell(2, 1, 1), cell(1, 1, 0), cell(0, 1, 1)]
    const actual = map(left, chessBoard2, 2, 1)
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
 * @param {function} f A generator function
 * @param {...any} args
 */
function map (f, ...args) {
  const results = []

  for (let values of f(...args)) {
    results.push(values)
  }

  return results
}