import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  View,
  StyleSheet,
  Animated,
  TouchableWithoutFeedback,
} from "react-native"
import Avatar from "./Avatar"
import LinkedAvatar from "./LinkedAvatar"

class AvatarStack extends Component {
  static propTypes = {
    players: PropTypes.arrayOf(
      PropTypes.shape({
        name: PropTypes.string,
        avatar: PropTypes.shape({ url: PropTypes.string }),
      }),
    ),
  }

  state = {
    isExpanded: false,
    avatarMargin: -25, // new Animated.Value(-25)
  }

  handleTogglePress = () => {
    //  Animated.timing(this.state.avatarMargin, {
    //    toValue: 5,
    //    duration: 1000,
    //  }).start()
    this.setState({ isExpanded: !this.state.isExpanded })
  }

  render() {
    const { avatarMargin, isExpanded } = this.state
    const { players } = this.props

    if (isExpanded) {
      return (
        <View style={styles.container}>
          {players.map(({ key, avatar, name, ...player }, index) => (
            <View key={key} style={index > 0 && { marginLeft: 5 }}>
              <LinkedAvatar
                imageSource={avatar ? avatar.url : null}
                text={name[0]}
                player={player}
              />
            </View>
          ))}
        </View>
      )
    }

    return (
      <TouchableWithoutFeedback onPress={this.handleTogglePress}>
        {players.length < 4 ? (
          <View style={styles.container}>
            {players.map(({ key, avatar, name }, index) => (
              <Animated.View
                key={key}
                style={index > 0 && { marginLeft: avatarMargin }}
              >
                <Avatar
                  imageSource={avatar ? avatar.url : null}
                  text={name[0]}
                />
              </Animated.View>
            ))}
          </View>
        ) : (
          <View style={styles.container}>
            {players.slice(0, 2).map(({ key, avatar, name }, index) => (
              <Animated.View
                key={key}
                style={index > 0 && { marginLeft: avatarMargin }}
              >
                <Avatar
                  imageSource={avatar ? avatar.url : null}
                  text={name[0]}
                />
              </Animated.View>
            ))}
            <Animated.View style={{ marginLeft: avatarMargin }}>
              <Avatar text={`+${players.length - 2}`} />
            </Animated.View>
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
