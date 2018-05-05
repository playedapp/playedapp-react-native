import React from "react"
import { Text } from "react-native"
import Colors from "../constants/Colors"
import Fonts from "../constants/Fonts"

export default {
  headerStyle: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 0,
  },
  headerTitle: ({ style, children }) => (
    <Text style={style}>{String(children).toUpperCase()}</Text>
  ),
  headerTitleStyle: {
    fontFamily: Fonts.families.fredokaOne.regular,
    fontSize: Fonts.sizes.default,
    letterSpacing: 2,
  },
  headerTintColor: Colors.textOnPrimary,
}
