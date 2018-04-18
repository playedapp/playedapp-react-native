import React, { Component } from "react"
import { Text, StyleSheet } from "react-native"
import PropTypes from "prop-types"
import Fonts from "../../constants/Fonts"
import Colors from "../../constants/Colors"

export class DefaultText extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return <Text {...this.props} style={[this.props.style, styles.default]} />
  }
}

export class MutedText extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return <Text {...this.props} style={[this.props.style, styles.muted]} />
  }
}

export class BoldText extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return <Text {...this.props} style={[this.props.style, styles.bold]} />
  }
}

export class Link extends Component {
  static propTypes = {
    style: PropTypes.object,
  }

  render() {
    return <Text {...this.props} style={[this.props.style, styles.link]} />
  }
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
