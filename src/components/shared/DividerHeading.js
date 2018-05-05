import React from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import { DefaultText } from "./TextStyles"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"

const DividerHeading = ({ children }) => {
  return (
    <View style={styles.wrapper}>
      <View style={styles.line} />
      <DefaultText
        style={{
          marginHorizontal: Spacing.m,
          color: Colors.textMuted,
        }}
      >
        {children.toUpperCase()}
      </DefaultText>
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
