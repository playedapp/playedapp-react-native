import React from "react"
import { StackNavigator } from "react-navigation"
import HomeScreen from "../screens/HomeScreen"
import GameScreen from "../screens/GameScreen"
import PersonScreen from "../screens/PlayerScreen"
import SessionScreen from "../screens/Session/SessionScreen"
import headerStyles from "./headerStyles"

const HomeStackNavigator = StackNavigator(
  {
    Main: { screen: HomeScreen },
    Game: { screen: GameScreen },
    Person: { screen: PersonScreen },
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
