import React, { Component } from "react"
import {
  ScrollView,
  Image,
  StyleSheet,
  Text,
  View,
  Dimensions,
} from "react-native"
import PropTypes from "prop-types"
import Swiper from "react-native-swiper"
import Colors from "../constants/Colors"
import { TabNavigator, TabBarTop } from "react-navigation"
import SessionDetailsScreen from "./SessionDetailsScreen"
import SessionScoreboardScreen from "./SessionScoreboardScreen"
import SessionRatingsScreen from "./SessionRatingsScreen"
import SessionCommentsScreen from "./SessionCommentsScreen"
import SessionTabNavigator from "./../navigation/SessionTabNavigator"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Slideshow from "../components/shared/Slideshow"

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

export default class SessionScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.object,
      }),
      setParams: PropTypes.func,
    }).isRequired,
  }

  static navigationOptions = () => {
    return {
      title: "Session details",
    }
  }

  render() {
    const { id } = this.props.navigation.state.params

    return (
      <Query query={GET_SESSION} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          return (
            <View style={{ flex: 1 }}>
              <Slideshow images={data.session.images} />
              <SessionTabNavigator />
            </View>
          )
        }}
      </Query>
    )
  }
}
