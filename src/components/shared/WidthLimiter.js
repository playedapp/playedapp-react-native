import React from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import Whitespace from "../../constants/Spacing"

const WidthLimiter = ({ children }) => {
  return (
    <View style={{ width: "100%", paddingHorizontal: Whitespace.m }}>
      {children}
    </View>
  )
}

WidthLimiter.propTypes = {
  children: PropTypes.node,
}

export default WidthLimiter
