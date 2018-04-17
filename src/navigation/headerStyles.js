import React from "react"
import { Text } from "react-native"
import Colors from "../constants/Colors"
import Fonts from "../constants/Fonts"

export default {
  headerStyle: {
    backgroundColor: Colors.primary,
  },
  headerTitle: ({ style, children }) => (
    <Text style={style}>{String(children).toUpperCase()}</Text>
  ),
  headerTitleStyle: {
    fontFamily: Fonts.fredokaOne.regular,
    fontSize: 15,
    letterSpacing: 2,
  },
  headerTintColor: Colors.textOnPrimary,
}
