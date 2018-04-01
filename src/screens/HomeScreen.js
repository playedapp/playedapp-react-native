import React from "react"
import Flow from "../components/flow/Flow"
import Colors from "../constants/Colors"

export default class HomeScreen extends React.Component {
  static navigationOptions = {
    title: "Home",
    headerStyle: {
      backgroundColor: Colors.primary,
    },
  }

  render() {
    return <Flow />
  }
}
