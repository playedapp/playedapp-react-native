import React, { Component } from "react"
import { Text } from "react-native"

class Game extends Component {
  state = {}
  render() {
    return <Text>{this.props.navigation.state.params.title}</Text>
  }
}

export default Game
