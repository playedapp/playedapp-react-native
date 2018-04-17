import React from "react"
import { ScrollView, StyleSheet, Text } from "react-native"
import Fonts from "../constants/Fonts"

export default class LogPlayScreen extends React.Component {
  static navigationOptions = {
    title: "Log play",
  }

  render() {
    return (
      <ScrollView style={styles.container}>
        <Text style={styles.text}>Nothing to see here yet…</Text>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    backgroundColor: "#fff",
  },
  text: {
    fontFamily: Fonts.nunito.regular,
  },
})
