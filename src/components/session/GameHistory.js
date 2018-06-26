import React from "react"
import { View, StyleSheet, Text } from "react-native"
import PropTypes from "prop-types"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"
import text from "../../styles/text"

const GameHistory = ({ stats }) => {
  const { plays, wins, best, worst, average } = stats
  return (
    <View style={{ alignItems: "center" }}>
      <Text style={text.muted}>GAME HISTORY</Text>
      <View
        style={{
          flexDirection: "row",
          justifyContent: "space-between",
          flexGrow: 1,
          alignSelf: "stretch",
          borderWidth: StyleSheet.hairlineWidth,
          borderColor: Colors.textMuted,
          borderRadius: 5,
          paddingHorizontal: Spacing.s,
        }}
      >
        <View style={styles.cell}>
          <Text style={text.muted}>Plays</Text>
          <Text style={text.bold}>{plays}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={text.muted}>Won</Text>
          <Text style={text.bold}>{wins}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={text.muted}>Best</Text>
          <Text style={text.bold}>{best}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={text.muted}>Worst</Text>
          <Text style={text.bold}>{worst}</Text>
        </View>
        <View style={styles.cell}>
          <Text style={text.muted}>Avg.</Text>
          <Text style={text.bold}>{average}</Text>
        </View>
      </View>
    </View>
  )
}

GameHistory.propTypes = {
  stats: PropTypes.shape({
    plays: PropTypes.number,
    wins: PropTypes.number,
    best: PropTypes.number,
    worst: PropTypes.number,
    average: PropTypes.number,
  }),
}

export default GameHistory

const styles = StyleSheet.create({
  cell: {
    padding: Spacing.s,
    alignItems: "center",
  },
})
