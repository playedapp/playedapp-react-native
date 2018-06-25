import React from "react"
import { View, StyleSheet } from "react-native"
import { MutedText, BoldText } from "../shared/TextStyles"
import PropTypes from "prop-types"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"

const GameHistory = ({ stats }) => {
  const { plays, wins, best, worst, average } = stats
  return (
    <View style={{ alignItems: "center" }}>
      <MutedText>GAME HISTORY</MutedText>
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
          <MutedText>Plays</MutedText>
          <BoldText>{plays}</BoldText>
        </View>
        <View style={styles.cell}>
          <MutedText>Won</MutedText>
          <BoldText>{wins}</BoldText>
        </View>
        <View style={styles.cell}>
          <MutedText>Best</MutedText>
          <BoldText>{best}</BoldText>
        </View>
        <View style={styles.cell}>
          <MutedText>Worst</MutedText>
          <BoldText>{worst}</BoldText>
        </View>
        <View style={styles.cell}>
          <MutedText>Avg.</MutedText>
          <BoldText>{average}</BoldText>
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
