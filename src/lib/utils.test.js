/* eslint-env jest */
import { constrainImageSize } from "./utils"

it("scales a portrait image", () => {
  expect(constrainImageSize(100, 200, 70)).toEqual([35, 70])
})

it("scales a landscape image", () => {
  expect(constrainImageSize(200, 100, 70)).toEqual([70, 35])
})

it("scales a square image", () => {
  expect(constrainImageSize(200, 200, 70)).toEqual([70, 70])
})
