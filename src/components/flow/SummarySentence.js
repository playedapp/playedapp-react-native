import React from "react"
import { Text } from "react-native"
import PropTypes from "prop-types"
import { DefaultText, Link } from "../shared/TextStyles"

export const SummarySentence = ({
  games,
  notFollowedPlayers,
  anonymousPlayers,
  onPlayerPress,
  onGamePress,
}) => {
  const players = [
    ...notFollowedPlayers.map(player => (
      <Link
        key={player.id}
        onPress={() => onPlayerPress && onPlayerPress(player)}
      >
        {player.person.name}
      </Link>
    )),
  ]

  if (anonymousPlayers.length === 1) {
    players.push("one other")
  } else if (anonymousPlayers.length > 1) {
    players.push(`${anonymousPlayers.length} others`)
  }

  return (
    <DefaultText>
      <Text key="game">
        {"Played "}
        <Link onPress={() => onGamePress && onGamePress(games[0])}>
          {games[0].title}
        </Link>
        {players.length > 0 && <Text> with </Text>}
        {players.reduce((arr, player, index, players) => {
          if (index === 0) {
            return [...arr, player]
          } else if (index === players.length - 1) {
            return [...arr, <Text key={index}> and </Text>, player]
          } else {
            return [...arr, <Text key={index}>, </Text>, player]
          }
        }, [])}
      </Text>
    </DefaultText>
  )
}

const playerList = PropTypes.arrayOf(
  PropTypes.shape({
    id: PropTypes.string.isRequired,
    person: PropTypes.shape({ name: PropTypes.string.isRequired }),
  }),
)

SummarySentence.propTypes = {
  games: PropTypes.arrayOf(PropTypes.shape({ title: PropTypes.string }))
    .isRequired,
  notFollowedPlayers: playerList,
  anonymousPlayers: playerList,
  onPlayerPress: PropTypes.func,
  onGamePress: PropTypes.func,
}

SummarySentence.defaultProps = {
  notFollowedPlayers: [],
  anonymousPlayers: [],
}
