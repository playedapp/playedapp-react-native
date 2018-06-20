import React from "react"
import { View } from "react-native"
import PropTypes from "prop-types"

const FlexRow = ({ children }) => {
  return <View style={{ flexDirection: "row" }}>{children}</View>
}

FlexRow.propTypes = {
  children: PropTypes.node,
}

export default FlexRow
