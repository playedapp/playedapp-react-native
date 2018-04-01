import React, { Component } from "react"
import { Text } from "react-native"

class Profile extends Component {
  state = {}
  render() {
    return <Text>{this.props.navigation.state.params.name}</Text>
  }
}

export default Profile
