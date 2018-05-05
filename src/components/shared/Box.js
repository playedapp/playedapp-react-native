import React from "react"
import { View, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import Colors from "../../constants/Colors"
import Shadows from "../../constants/Shadows"

const Box = ({ children, style = {} }) => (
  <View style={[styles.box, style]}>{children}</View>
)

Box.propTypes = {
  children: PropTypes.node,
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  box: {
    marginBottom: 10,
    backgroundColor: Colors.white,
    borderRadius: 12,
    ...Shadows.box,
  },
})

export default Box
