import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Avatar from "./Avatar"

class AvatarStack extends Component {
  static propTypes = {
    people: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.shape({ url: PropTypes.string }),
      }),
    ).isRequired,
  }

  render() {
    const { people } = this.props

    return people.length < 4 ? (
      <View style={styles.container}>
        {people.map(({ id, avatar, name }) => (
          <Avatar
            key={id}
            imageSource={avatar ? avatar.url : null}
            text={name[0]}
          />
        ))}
      </View>
    ) : (
      <View style={styles.container}>
        {people
          .slice(0, 2)
          .map(({ id, avatar, name }) => (
            <Avatar
              key={id}
              imageSource={avatar ? avatar.url : null}
              text={name[0]}
            />
          ))}

        <Avatar text={`+${people.length - 2}`} />
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
