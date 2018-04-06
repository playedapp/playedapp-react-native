import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet } from "react-native"
import Avatar from "./Avatar"

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

    return people.length < 4 ? (
      <View style={styles.container}>
        {people.map(({ id }) => <Avatar key={id} id={id} />)}
      </View>
    ) : (
      <View style={styles.container}>
        {people.slice(0, 2).map(({ id }) => <Avatar key={id} id={id} />)}
        {/* <Avatar text={`+${people.length - 2}`} /> */}
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
