import { StyleSheet } from "react-native"
import fontFamilies from "./font-families"
import fontSizes from "./font-sizes"
import colors from "./colors"

export default StyleSheet.create({
  default: StyleSheet.flatten([
    fontFamilies.nunitoRegular,
    fontSizes.m,
    colors.darkGrey,
  ]),
  small: StyleSheet.flatten([
    fontFamilies.nunitoRegular,
    fontSizes.s,
    colors.darkGrey,
  ]),
  bold: StyleSheet.flatten([
    fontFamilies.nunitoBold,
    fontSizes.m,
    colors.darkGrey,
  ]),
  extraBold: StyleSheet.flatten([
    fontFamilies.nunitoExtrabold,
    fontSizes.m,
    colors.darkGrey,
  ]),
  muted: StyleSheet.flatten([
    fontFamilies.nunitoRegular,
    fontSizes.s,
    colors.brownGrey,
  ]),
  link: StyleSheet.flatten([
    fontFamilies.nunitoBold,
    fontSizes.m,
    colors.primary,
  ]),
})
