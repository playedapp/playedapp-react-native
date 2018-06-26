import React from "react"
import { Text, StyleSheet } from "react-native"
import Colors from "../constants/Colors"
import fontFamilies from "../styles/font-families"
import fontSizes from "../styles/font-sizes"
import colors from "../styles/colors"

export default {
  headerStyle: {
    backgroundColor: Colors.primary,
    borderBottomWidth: 0,
  },
  headerTitle: ({ style, children }) => (
    <Text style={style}>{String(children).toUpperCase()}</Text>
  ),
  headerTitleStyle: StyleSheet.flatten([
    fontFamilies.fredokaOneRegular,
    fontSizes.m,
    colors.white,
    {
      letterSpacing: 2,
    },
  ]),
  headerTintColor: Colors.textOnPrimary,
}
