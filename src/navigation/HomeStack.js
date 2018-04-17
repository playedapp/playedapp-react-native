import React from "react"
import { StackNavigator } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import GameScreen from "../screens/GameScreen"
import PlayerScreen from "../screens/PlayerScreen"
import SessionScreen from "../screens/SessionScreen"
import SessionTabNavigator from "../navigation/SessionTabNavigator"
import headerStyles from "./headerStyles"

const HomeStackNavigator = StackNavigator(
  {
    Main: { screen: HomeScreen },
    Game: { screen: GameScreen },
    Player: { screen: PlayerScreen },
    Session: { screen: SessionScreen },
    // Session: { screen: SessionTabNavigator },
  },
  {
    initialRouteName: "Main",
    navigationOptions: {
      ...headerStyles,
    },
  },
)

const HomeStack = () => <HomeStackNavigator />
export default HomeStack
