import React from "react"
import { StackNavigator } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import GameScreen from "../screens/GameScreen"
import PlayerScreen from "../screens/PlayerScreen"
import SessionScreen from "../screens/Session/SessionScreen"
import headerStyles from "./headerStyles"

const HomeStackNavigator = StackNavigator(
  {
    Main: { screen: HomeScreen },
    Game: { screen: GameScreen },
    Player: { screen: PlayerScreen },
    Session: { screen: SessionScreen },
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
