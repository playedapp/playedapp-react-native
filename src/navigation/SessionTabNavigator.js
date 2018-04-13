import React from "react"
import { Image, View, Dimensions, StyleSheet } from "react-native"
import { TabNavigator, TabBarTop } from "react-navigation"
import Colors from "../constants/Colors"
import SessionDetailsScreen from "../screens/SessionDetailsScreen"
import SessionScoreboardScreen from "../screens/SessionScoreboardScreen"
import SessionRatingsScreen from "../screens/SessionRatingsScreen"
import SessionCommentsScreen from "../screens/SessionCommentsScreen"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Swiper from "react-native-swiper"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        title
      }
      images {
        id
        url
      }
    }
  }
`

const Tabs = TabNavigator(
  {
    Session: {
      screen: SessionDetailsScreen,
    },
    ScoreBoard: {
      screen: SessionScoreboardScreen,
    },
    Ratings: {
      screen: SessionRatingsScreen,
    },
    Comments: {
      screen: SessionCommentsScreen,
    },
  },
  {
    //   initialRouteName: "Session",
    //   initialRouteParams: { id: this.props.navigation.state.params.id },
    tabBarComponent: TabBarTop,
    tabBarPosition: "top",
    tabBarOptions: {
      activeTintColor: Colors.primary,
      inactiveTintColor: Colors.text,
      scrollEnabled: true,
      upperCaseLabel: false,
      tabStyle: {},
      style: {
        backgroundColor: Colors.white,
      },
      labelStyle: {
        fontSize: 16,
        fontWeight: "bold",
        padding: 0,
        margin: 0,
      },
      indicatorStyle: {
        backgroundColor: "cyan",
      },
    },
  },
)

export default Tabs

const styles = StyleSheet.create({
  image: {
    width: Dimensions.get("window").width,
    height: 300,
  },
})