import React from "react"
import { ScrollView, Image, StyleSheet, Text } from "react-native"
import PropTypes from "prop-types"
import Swiper from "react-native-swiper"
import Colors from "../constants/Colors"
import { TabNavigator, TabBarTop } from "react-navigation"
import SessionDetailsScreen from "./SessionDetailsScreen"
import SessionScoreboardScreen from "./SessionScoreboardScreen"
import SessionRatingsScreen from "./SessionRatingsScreen"
import SessionCommentsScreen from "./SessionCommentsScreen"
import { Query } from "react-apollo"
import gql from "graphql-tag"

const GET_SESSION = gql`
  query getSession($id: ID!) {
    session(id: $id) {
      games {
        title
      }
      images {
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

export default class SessionScreen extends React.Component {
  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.object,
      }),
      setParams: PropTypes.func,
    }).isRequired,
  }

  static navigationOptions = () => {
    return { title: "Session details" }
  }

  render() {
    const { id } = this.props.navigation.state.params

    return (
      <Query query={GET_SESSION} variables={{ id }}>
        {({ loading, error, data }) => {
          console.log(data)
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          return (
            <ScrollView style={styles.container}>
              <Swiper
                loop={false}
                bounces={true}
                style={{ height: 300 }}
                onTouchStart={() => this.setState({ slideshowActive: true })}
              >
                {data.images.map(image => (
                  <Image
                    key={image.url}
                    style={{ width: "100%", height: 300 }}
                    source={{ uri: image.url }}
                  />
                ))}
              </Swiper>
              <Tabs />
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackground,
  },
})
