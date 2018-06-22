import React from "react"
import { View, Text, StyleSheet } from "react-native"
import Colors from "../../constants/Colors"
import PropTypes from "prop-types"
import Fonts from "../../constants/Fonts"

const AverageRating = ({ rating, size = "small" }) => {
  const isSmall = size === "small"

  return (
    <View
      style={[styles.outerRectangle, isSmall && styles.outerRectangleSmall]}
    >
      <View
        style={[styles.innerRectangle, isSmall && styles.innerRectangleSmall]}
      >
        <Text style={[styles.text, isSmall && styles.textSmall]}>
          {rating.toFixed(1)}
        </Text>
      </View>
    </View>
  )
}

AverageRating.propTypes = {
  rating: PropTypes.number.isRequired,
  size: PropTypes.oneOf(["small", "large"]),
}

const styles = StyleSheet.create({
  outerRectangle: {
    transform: [{ translateY: -5 }, { rotate: "45deg" }],
    borderRadius: 7,
    borderWidth: 3,
    borderColor: Colors.white,
  },
  outerRectangleSmall: {
    borderRadius: 5,
    borderWidth: 2,
  },
  innerRectangle: {
    width: 40,
    height: 40,
    backgroundColor: Colors.primary,
    borderRadius: 5,
    alignItems: "center",
    justifyContent: "center",
  },
  innerRectangleSmall: {
    width: 27,
    height: 27,
    borderRadius: 3,
  },
  text: {
    color: Colors.cyan,
    transform: [{ rotate: "-45deg" }],
    fontFamily: Fonts.families.fredokaOne.regular,
    fontSize: 20,
  },
  textSmall: {
    fontSize: 14,
  },
})

export default AverageRating
