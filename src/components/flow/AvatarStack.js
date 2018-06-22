import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import Avatar from "./Avatar"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import { BoldText } from "../shared/TextStyles"

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
            <BoldText style={{ color: Colors.cyan }}>
              +{people.length - 2}
            </BoldText>
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
    width: 40,
    height: 40,
    borderRadius: 20,
    borderWidth: 2,
    borderColor: Colors.mainBackground,
    backgroundColor: Colors.primary,
    marginLeft: -20,
    alignItems: "center",
    justifyContent: "center",
  },
})
