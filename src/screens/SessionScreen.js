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

  state = { isLoading: true, session: null }

  componentDidMount() {
    fetch(
      `http://192.168.0.4:3000/api/session/${
        this.props.navigation.state.params.id
      }`,
    )
      .then(res => res.json())
      .then(session => {
        this.setState({
          isLoading: false,
          session,
        })
      })
  }

  render() {
    const { isLoading, session } = this.state

    if (isLoading) {
      return <Text>Loading…</Text>
    }

    const { images } = session

    return (
      <ScrollView style={styles.container}>
        <Swiper
          loop={false}
          bounces={true}
          style={{ height: 300 }}
          onTouchStart={() => this.setState({ slideshowActive: true })}
        >
          {images.map(image => (
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
  }
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: Colors.mainBackground,
  },
})
