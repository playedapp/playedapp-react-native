import React from "react"
import PropTypes from "prop-types"
import { TouchableOpacity } from "react-native"
import Feather from "@expo/vector-icons/Feather"
import Colors from "../../../constants/Colors"

const AddOnRow = ({ onPress, onRemove, children }) => (
  <TouchableOpacity onPress={onPress} style={{ flexDirection: "row" }}>
    <TouchableOpacity onPress={onRemove}>
      <Feather name="x" size={32} color={Colors.danger} />
    </TouchableOpacity>
    {children}
  </TouchableOpacity>
)

AddOnRow.propTypes = {
  onPress: PropTypes.func.isRequired,
  onRemove: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
}

export default AddOnRow
