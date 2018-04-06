import React, { Component } from "react"
import PropTypes from "prop-types"
import { TouchableOpacity } from "react-native"
import Avatar from "./Avatar"
import { withNavigation } from "react-navigation"

class LinkedAvatar extends Component {
  static propTypes = {
    navigation: PropTypes.shape({ navigate: PropTypes.func }),
    id: PropTypes.string.isRequired,
  }

  handlePress = () => {
    const { navigate } = this.props.navigation
    navigate("Player", { id: this.props.id })
  }

  render() {
    return (
      <TouchableOpacity onPress={this.handlePress}>
        <Avatar id={this.props.id} />
      </TouchableOpacity>
    )
  }
}

export default withNavigation(LinkedAvatar)
