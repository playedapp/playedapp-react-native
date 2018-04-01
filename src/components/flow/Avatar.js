import React, { Component } from "react"
import { Image, StyleSheet, View, Text } from "react-native"
import PropTypes from "prop-types"
import { primary } from "../../style/colors"

class Avatar extends Component {
  static propTypes = {
    imageSource: PropTypes.string,
    text: PropTypes.string,
  }

  render() {
    const { imageSource, text } = this.props
    return imageSource ? (
      <Image style={styles.imageAvatar} source={{ uri: imageSource }} />
    ) : (
      <View style={styles.textAvatar}>
        <Text style={styles.text}>{text}</Text>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  imageAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
  },
  textAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: primary,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    color: "aqua",
  },
})

export default Avatar
