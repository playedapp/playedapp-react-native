import React from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import Colors from "../../constants/Colors"

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
        key={player.key}
        style={styles.link}
        onPress={() => onPlayerPress && onPlayerPress(player)}
      >
        {player.name}
      </Text>
    )),
  ]

  if (anonymousPlayers.length === 1) {
    players.push("one other")
  } else if (anonymousPlayers.length > 1) {
    players.push(`${anonymousPlayers.length} others`)
  }

  return (
    <Text>
      <Text key="game">
        {"Played "}
        <Text
          style={styles.link}
          onPress={() => onGamePress && onGamePress(games[0])}
        >
          {games[0].title}
        </Text>
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
    </Text>
  )
}

const playerList = PropTypes.arrayOf(
  PropTypes.shape({
    key: PropTypes.any.isRequired,
    name: PropTypes.string.isRequired,
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

const styles = StyleSheet.create({
  link: {
    color: Colors.primary,
    fontWeight: "bold",
  },
})
