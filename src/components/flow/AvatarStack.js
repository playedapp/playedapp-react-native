import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import Avatar from "./Avatar"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"

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

    return (
      <View style={styles.container}>
        {people.map(({ id }, index) => (
          <View
            key={id}
            style={{
              marginLeft: index > 0 ? -Spacing.l : 0,
            }}
          >
            <Avatar id={id} />
          </View>
        ))}
      </View>
    )
  }
}

export default AvatarStack

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
})
