/* eslint-env jest */
import {
  constrainImageSize,
  followedParticipants,
  notFollowedParticipants,
  anonymousParticipants,
} from "./utils"

const participants = [
  {
    person: { isFollowedByMe: false },
  },
  {
    person: { isFollowedByMe: true },
  },
  {},
]

it("scales a portrait image", () => {
  expect(constrainImageSize(100, 200, 70)).toEqual([35, 70])
})

it("scales a landscape image", () => {
  expect(constrainImageSize(200, 100, 70)).toEqual([70, 35])
})

it("scales a square image", () => {
  expect(constrainImageSize(200, 200, 70)).toEqual([70, 70])
})

it("filters followed participants", () => {
  expect(followedParticipants(participants)).toEqual([participants[1]])
})

it("filters not followed participants", () => {
  expect(notFollowedParticipants(participants)).toEqual([participants[0]])
})

it("filters anonymous participants", () => {
  expect(anonymousParticipants(participants)).toEqual([participants[2]])
})
