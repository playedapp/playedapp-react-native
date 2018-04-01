import React from "react"
import { Platform, View } from "react-native"
import { Ionicons } from "@expo/vector-icons"
import { TabNavigator, TabBarBottom } from "react-navigation"

import Colors from "../constants/Colors"

import HomeScreen from "../screens/HomeScreen"
import SearchScreen from "../screens/SearchScreen"
import AlertsScreen from "../screens/AlertsScreen"
import ProfileScreen from "../screens/ProfileScreen"

export default TabNavigator(
  {
    Home: {
      screen: HomeScreen,
    },
    Search: {
      screen: SearchScreen,
    },
    LogPlay: {
      screen: View,
    },
    Alerts: {
      screen: AlertsScreen,
    },
    Profile: {
      screen: ProfileScreen,
    },
  },
  {
    navigationOptions: ({ navigation }) => ({
      tabBarOnPress: ({
        scene: { route: { routeName }, index },
        jumpToIndex,
      }) => {
        routeName === "LogPlay"
          ? navigation.navigate("LogPlayModal")
          : jumpToIndex(index)
      },
      tabBarIcon: ({ focused }) => {
        const { routeName } = navigation.state

        let iconName
        switch (routeName) {
          case "Home":
            iconName =
              Platform.OS === "ios"
                ? `ios-information-circle${focused ? "" : "-outline"}`
                : "md-information-circle"
            break
          case "Links":
            iconName =
              Platform.OS === "ios"
                ? `ios-link${focused ? "" : "-outline"}`
                : "md-link"
            break
          case "Settings":
            iconName =
              Platform.OS === "ios"
                ? `ios-options${focused ? "" : "-outline"}`
                : "md-options"
        }
        return (
          <Ionicons
            name={iconName}
            size={28}
            style={{ marginBottom: -3, width: 25 }}
            color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        )
      },
    }),
    tabBarComponent: TabBarBottom,
    tabBarPosition: "bottom",
    animationEnabled: false,
    swipeEnabled: false,
  },
)
