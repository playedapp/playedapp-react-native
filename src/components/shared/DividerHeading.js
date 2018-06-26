import React from "react"
import { View, StyleSheet, Text } from "react-native"
import PropTypes from "prop-types"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"
import text from "../../styles/text"

const DividerHeading = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <Text
        style={[
          text.muted,
          {
            marginHorizontal: Spacing.m,
          },
        ]}
      >
        {children.toUpperCase()}
      </Text>
      <View style={styles.line} />
    </View>
  )
}

DividerHeading.propTypes = {
  children: PropTypes.string.isRequired,
}

const styles = StyleSheet.create({
  wrapper: { flexDirection: "row", width: "100%", alignItems: "center" },
  line: {
    height: 1,
    backgroundColor: Colors.textMuted,
    opacity: 0.5,
    flexGrow: 1,
  },
})

export default DividerHeading
