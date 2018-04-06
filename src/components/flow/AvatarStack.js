import React, { Component } from "react"
import PropTypes from "prop-types"
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native"
import Avatar from "./Avatar"

class AvatarStack extends Component {
  static propTypes = {
    users: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.shape({ url: PropTypes.string }),
      }),
    ).isRequired,
  }

  handleTogglePress = () => {
    // TODO: go to session details
  }

  render() {
    const { users } = this.props

    return (
      <TouchableWithoutFeedback onPress={this.handleTogglePress}>
        {users.length < 4 ? (
          <View style={styles.container}>
            {users.map(({ id, avatar, name }) => (
              <Avatar
                key={id}
                imageSource={avatar ? avatar.url : null}
                text={name[0]}
              />
            ))}
          </View>
        ) : (
          <View style={styles.container}>
            {users
              .slice(0, 2)
              .map(({ id, avatar, name }) => (
                <Avatar
                  key={id}
                  imageSource={avatar ? avatar.url : null}
                  text={name[0]}
                />
              ))}

            <Avatar text={`+${users.length - 2}`} />
          </View>
        )}
      </TouchableWithoutFeedback>
    )
  }
}

export default AvatarStack

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
  },
})
