import React, { Component } from "react"
import { KeyboardAvoidingView } from "react-native"
import { StackNavigator } from "react-navigation"
import LogPlayScreen from "../screens/LogPlay/LogPlayScreen"
import EditParticipantScreen from "../screens/LogPlay/EditParticipantScreen"
import AddParticipantsScreen from "../screens/LogPlay/AddParticipantsScreen"
import headerStyles from "./headerStyles"
import LogPlayProvider from "../contexts/LogPlayProvider"
import { Screen as LocationScreen } from "../screens/LogPlay/addons/Location"
import { Screen as PlaytimeScreen } from "../screens/LogPlay/addons/Playtime"
import { Screen as RoundsScreen } from "../screens/LogPlay/addons/Rounds"
import { Screen as VariantsScreen } from "../screens/LogPlay/addons/Variants"

const LogPlayStackNavigator = StackNavigator(
  {
    Main: { screen: LogPlayScreen },
    EditParticipantScreen: { screen: EditParticipantScreen },
    AddParticipantsScreen: { screen: AddParticipantsScreen },
    LocationScreen: { screen: LocationScreen },
    PlaytimeScreen: { screen: PlaytimeScreen },
    RoundsScreen: { screen: RoundsScreen },
    VariantsScreen: { screen: VariantsScreen },
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
