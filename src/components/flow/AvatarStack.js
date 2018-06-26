import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, Text } from "react-native"
import Avatar from "./Avatar"
import Colors from "../../constants/Colors"
import text from "../../styles/text"

class AvatarStack extends Component {
  static propTypes = {
    people: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.string.isRequired,
      }),
    ).isRequired,
  }

  render() {
    const { people } = this.props

    if (people.length < 4) {
      return (
        <View style={styles.container}>
          {people.map(({ id }, index) => (
            <View
              key={id}
              style={{
                marginLeft: index > 0 ? -20 : 0,
              }}
            >
              <Avatar id={id} />
            </View>
          ))}
        </View>
      )
    } else {
      return (
        <View style={styles.container}>
          {people.slice(0, 2).map(({ id }, index) => (
            <View
              key={id}
              style={{
                marginLeft: index > 0 ? -20 : 0,
              }}
            >
              <Avatar id={id} />
            </View>
          ))}
          <View style={styles.textAvatar}>
            <Text style={[text.bold, { color: Colors.cyan }]}>
              +{people.length - 2}
            </Text>
          </View>
        </View>
      )
    }
  }
}

export default AvatarStack

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
  textAvatar: {
    width: 39,
    height: 39,
    borderRadius: 19.5,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
    backgroundColor: Colors.primary,
    marginLeft: -20,
    alignItems: "center",
    justifyContent: "center",
  },
})
