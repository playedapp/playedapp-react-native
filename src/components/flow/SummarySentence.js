import React from "react"
import PropTypes from "prop-types"
import { Text } from "react-native"
import text from "../../styles/text"

export const SummarySentence = ({
  games,
  notFollowedPlayers,
  anonymousPlayers,
  onPlayerPress,
  onGamePress,
}) => {
  const players = [
    ...notFollowedPlayers.map(player => (
      <Text
        style={text.link}
        key={player.id}
        onPress={() => onPlayerPress && onPlayerPress(player)}
      >
        {player.person.name}
      </Text>
    )),
  ]

  if (anonymousPlayers.length === 1) {
    players.push("one other")
  } else if (anonymousPlayers.length > 1) {
    players.push(`${anonymousPlayers.length} others`)
  }

  return (
    <Text style={text.default}>
      {"Played "}
      <Text
        style={text.link}
        onPress={() => onGamePress && onGamePress(games[0])}
      >
        {games[0].title}
      </Text>
      {players.length > 0 && " with "}
      {players.reduce((arr, player, index, players) => {
        if (index === 0) {
          return [...arr, player]
        } else if (index === players.length - 1) {
          return [...arr, " and ", player]
        } else {
          return [...arr, ", ", player]
        }
      }, [])}
    </Text>
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
