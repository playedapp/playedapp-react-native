import React, { Component } from "react"
import { Text, View, ScrollView } from "react-native"
import PropTypes from "prop-types"
import { TabView, SceneMap } from "react-native-tab-view"
import SessionDetailsScreen from "./SessionDetailsScreen"
import SessionScoreboardScreen from "./SessionScoreboardScreen"
import SessionRatingsScreen from "./SessionRatingsScreen"
import SessionCommentsScreen from "./SessionCommentsScreen"
import { Query } from "react-apollo"
import gql from "graphql-tag"
import Slideshow from "../../components/shared/Slideshow"
import { SessionContext } from "./session-context"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
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

  state = {
    index: 0,
    routes: [
      { key: "details", title: "Details" },
      { key: "scoreboard", title: "Scoreboard" },
      { key: "ratings", title: "Rating" },
      { key: "comments", title: "Comments" },
    ],
  }

  render() {
    const { id } = this.props.navigation.state.params

    return (
      <Query query={GET_SESSION} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          return (
            <SessionContext.Provider
              value={{ id, games: data.session.games.map(game => game.id) }}
            >
              <ScrollView style={{ flex: 1 }}>
                <Slideshow images={data.session.images} />
                <TabView
                  navigationState={this.state}
                  renderScene={SceneMap({
                    details: SessionDetailsScreen,
                    scoreboard: SessionScoreboardScreen,
                    ratings: SessionRatingsScreen,
                    comments: SessionCommentsScreen,
                  })}
                  onIndexChange={index => this.setState({ index })}
                />
              </ScrollView>
            </SessionContext.Provider>
          )
        }}
      </Query>
    )
  }
}
