/* global test, expect */
import React from "react"
import renderer from "react-test-renderer"
import { SummarySentence } from "./SummarySentence"

const game = {
  id: "123",
  title: "Clans of Caledonia",
  thumbnail: {
    url: "http://192.168.0.4:3000/static/covers/clansofcaledonia.png",
  },
}

const notFollowedPlayer1 = {
  id: "115",
  person: {
    id: "115",
    name: "Nina",
    isFollowedByMe: false,
  },
  score: 27,
  rank: 4,
  ratings: [{ game: "123", currentRating: 4 }],
}

const notFollowedPlayer2 = {
  key: "116",
  person: {
    key: "116",
    name: "Nina",

    isFollowedByMe: false,
  },
  score: 27,
  rank: 4,
  ratings: [{ game: "123", currentRating: 4 }],
}

const notFollowedPlayer3 = {
  key: "114",
  person: {
    key: "114",
    name: "Nina",
    isFollowedByMe: false,
  },
  score: 27,
  rank: 4,
  ratings: [{ game: "123", currentRating: 4 }],
}

const anonymousPlayer = {
  key: 117,
  name: "Player 7",
  score: 2,
  rank: 7,
}

test("Played X", () => {
  const tree = renderer.create(<SummarySentence games={[game]} />).toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with one other", () => {
  const tree = renderer
    .create(
      <SummarySentence games={[game]} anonymousPlayers={[anonymousPlayer]} />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with 2 others", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        anonymousPlayers={[anonymousPlayer, anonymousPlayer]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y and one other", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1]}
        anonymousPlayers={[anonymousPlayer]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y and two others", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1]}
        anonymousPlayers={[anonymousPlayer, anonymousPlayer]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y and Z", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1, notFollowedPlayer2]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y, Z and W", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[
          notFollowedPlayer1,
          notFollowedPlayer2,
          notFollowedPlayer3,
        ]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y, Z and one other", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1, notFollowedPlayer2]}
        anonymousPlayers={[anonymousPlayer]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})

test("Played X with Y, Z and two others", () => {
  const tree = renderer
    .create(
      <SummarySentence
        games={[game]}
        notFollowedPlayers={[notFollowedPlayer1, notFollowedPlayer2]}
        anonymousPlayers={[anonymousPlayer, anonymousPlayer]}
      />,
    )
    .toJSON()
  expect(tree).toMatchSnapshot()
})
