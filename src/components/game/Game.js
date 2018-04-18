import React, { Component } from "react"
import { DefaultText } from "../shared/TextStyles"

class Game extends Component {
  state = {}
  render() {
    return <DefaultText>{this.props.navigation.state.params.title}</DefaultText>
  }
}

export default Game
