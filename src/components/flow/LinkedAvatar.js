import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity } from "react-native"
import Avatar from "./Avatar"
import { withNavigation } from "react-navigation"

class LinkedAvatar extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
    player: PropTypes.shape({ name: PropTypes.string.isRequired }).isRequired,
  }

  handlePress = () => {
    const { navigate } = this.props.navigation
    navigate("Player", { name: this.props.player.name })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Avatar {...this.props} />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(LinkedAvatar)
