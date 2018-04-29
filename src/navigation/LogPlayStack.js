import React from "react"
import { StackNavigator } from "react-navigation"
import LogPlayScreen from "../screens/LogPlayScreen"

const LogPlayStackNavigator = StackNavigator(
  {
    Main: { screen: LogPlayScreen },
  },
  {
    initialRouteName: "Main",
    headerMode: "none",
  },
)

const LogPlayStack = () => <LogPlayStackNavigator />
export default LogPlayStack
