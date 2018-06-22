import React from "react"
import { View, TouchableOpacity, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import Colors from "../../constants/Colors"
import Shadows from "../../constants/Shadows"
import Spacing from "../../constants/Spacing"

const Box = ({ children, style = {}, onPress }) => {
  return onPress ? (
    <TouchableOpacity onPress={onPress} style={[styles.box, style]}>
      {children}
    </TouchableOpacity>
  ) : (
    <View style={[styles.box, style]}>{children}</View>
  )
}

Box.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
  onPress: PropTypes.func,
}

const styles = StyleSheet.create({
  box: {
    marginBottom: Spacing.l,
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...Shadows.box,
  },
})

export default Box
