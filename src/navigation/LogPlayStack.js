import React, { Component } from "react"
import { KeyboardAvoidingView } from "react-native"
import { StackNavigator } from "react-navigation"
import LogPlayScreen from "../screens/LogPlay/LogPlayScreen"
import EditParticipantScreen from "../screens/LogPlay/EditParticipantScreen"
import AddParticipantsScreen from "../screens/LogPlay/AddParticipantsScreen"
import headerStyles from "./headerStyles"
import LogPlayProvider from "../contexts/LogPlayProvider"

const LogPlayStackNavigator = StackNavigator(
  {
    Main: { screen: LogPlayScreen },
    EditParticipantScreen: { screen: EditParticipantScreen },
    AddParticipantsScreen: { screen: AddParticipantsScreen },
  },
  {
    initialRouteName: "Main",
    navigationOptions: {
      ...headerStyles,
    },
  },
)

class LogPlayStack extends Component {
  render() {
    return (
      <LogPlayProvider>
        <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
          <LogPlayStackNavigator />
        </KeyboardAvoidingView>
      </LogPlayProvider>
    )
  }
}

export default LogPlayStack
