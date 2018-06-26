import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity, View, StyleSheet, Text } from "react-native"
import Colors from "../../constants/Colors"
import text from "../../styles/text"
import colors from "../../styles/colors"

const ButtonPrimary = ({ title, ...props }) => {
  return (
    <TouchableOpacity {...props} style={styles.outer}>
      <View style={styles.inner}>
        <Text style={[text.extraBold, colors.white, styles.text]}>
          {title.toUpperCase()}
        </Text>
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
    textShadowColor: Colors.primaryDarker,
    textShadowOffset: { height: -1 },
    textShadowRadius: 1,
  },
})
