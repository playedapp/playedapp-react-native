import React from "react"
import Flow from "../components/flow/Flow"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
  }

  render() {
    return <Flow />
  }
}
