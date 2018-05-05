import React, { Component } from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import Fonts from "../../constants/Fonts"
import Colors from "../../constants/Colors"

export const DefaultText = ({ style, ...props }) => (
  <Text {...props} style={[styles.default, style]} />
)
DefaultText.propTypes = {
  style: PropTypes.object,
}

export const MutedText = ({ style, ...props }) => (
  <Text {...props} style={[styles.muted, style]} />
)
MutedText.propTypes = {
  style: PropTypes.object,
}

export const BoldText = ({ style, ...props }) => (
  <Text {...props} style={[styles.bold, style]} />
)
BoldText.propTypes = {
  style: PropTypes.object,
}

export const ExtraBoldText = ({ style, ...props }) => (
  <Text {...props} style={[styles.extraBold, style]} />
)
ExtraBoldText.propTypes = {
  style: PropTypes.object,
}

export const Link = ({ style, ...props }) => (
  <Text {...props} style={[styles.link, style]} />
)
Link.propTypes = {
  style: PropTypes.object,
}

const styles = StyleSheet.create({
  default: {
    fontFamily: Fonts.families.nunito.regular,
    fontSize: Fonts.sizes.default,
    color: Colors.text,
  },
  bold: {
    fontFamily: Fonts.families.nunito.bold,
    fontSize: Fonts.sizes.default,
    color: Colors.text,
  },
  extraBold: {
    fontFamily: Fonts.families.nunito.extrabold,
    fontSize: Fonts.sizes.default,
    color: Colors.text,
  },
  muted: {
    fontFamily: Fonts.families.nunito.regular,
    fontSize: Fonts.sizes.small,
    color: Colors.textMuted,
  },
  link: {
    fontFamily: Fonts.families.nunito.bold,
    fontSize: Fonts.sizes.default,
    color: Colors.primary,
  },
})
