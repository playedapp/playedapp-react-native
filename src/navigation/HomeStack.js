import React from "react"
import { StackNavigator } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import Colors from "../constants/Colors"
import GameScreen from "../screens/GameScreen"
import PlayerScreen from "../screens/PlayerScreen"
import SessionScreen from "../screens/SessionScreen"
import SessionTabNavigator from "../navigation/SessionTabNavigator"

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
      headerStyle: {
        backgroundColor: Colors.primary,
      },
      headerTintColor: Colors.textOnPrimary,
    },
  },
)

const HomeStack = () => <HomeStackNavigator />
export default HomeStack
