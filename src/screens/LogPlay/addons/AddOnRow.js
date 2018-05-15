import React from "react"
import PropTypes from "prop-types"
import { View, TouchableOpacity } from "react-native"
import Feather from "@expo/vector-icons/Feather"
import Colors from "../../../constants/Colors"

const AddOnRow = ({ onRemove, children }) => (
  <View style={{ flexDirection: "row" }}>
    <TouchableOpacity onPress={onRemove}>
      <Feather name="x" size={32} color={Colors.danger} />
    </TouchableOpacity>
    {children}
  </View>
)

AddOnRow.propTypes = {
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default AddOnRow
