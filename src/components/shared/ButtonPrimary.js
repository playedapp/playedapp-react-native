import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, View, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import Shadows from "../../constants/Shadows"
import { ExtraBoldText } from "./TextStyles"

const ButtonPrimary = ({ title, style = {}, ...props }) => {
  return (
    <TouchableOpacity {...props} style={[styles.outer, style]}>
      <View style={styles.inner}>
        <ExtraBoldText style={styles.text}>{title.toUpperCase()}</ExtraBoldText>
      </View>
    </TouchableOpacity>
  )
}

ButtonPrimary.propTypes = {
  title: PropTypes.string.isRequired,
}

export default ButtonPrimary

const styles = StyleSheet.create({
  outer: {
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 8,
    shadowColor: Colors.primaryDarker,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      height: 6,
    },
  },
  inner: {
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    width: "100%",
    height: 50,
    borderRadius: 8,
    shadowColor: Colors.cyan,
    shadowOpacity: 1,
    shadowRadius: 0,
    shadowOffset: {
      height: 0.5,
    },
    backgroundColor: Colors.primary,
  },
  text: {
    color: Colors.white,
    textShadowColor: Colors.primaryDarker,
    textShadowOffset: { height: -1 },
    textShadowRadius: 1,
  },
})
