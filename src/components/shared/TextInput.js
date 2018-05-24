import React from "react"
import { TextInput as RNTextInput } from "react-native"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"

const TextInput = props => (
  <RNTextInput
    style={{
      padding: Spacing.m,
      borderRadius: 12,
      backgroundColor: Colors.white,
      borderWidth: 1,
    }}
    {...props}
  />
)

export default TextInput
