import React, { Component } from "react"
import { View, Text, ScrollView } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../components/shared/Box"
import Cover from "../components/shared/Cover"
import { MutedText, DefaultText } from "../components/shared/TextStyles"
import Spacing from "../constants/Spacing"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      games {
        id
        title
        averageRating
      }
      participants {
        id
      }
      playtime
      variants
      location {
        id
        name
        address
      }
    }
  }
`

class SessionDetailsScreen extends Component {
  static navigationOptions = {
    title: "Session",
  }

  static propTypes = {
    screenProps: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      state: PropTypes.shape({
        params: PropTypes.object,
      }),
    }).isRequired,
  }

  render() {
    const { id } = this.props.screenProps

    return (
      <Query query={GET_SESSION} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          const {
            games,
            location,
            playtime,
            variants,
            participants,
          } = data.session

          return (
            <ScrollView style={{ padding: Spacing.m }}>
              {games.map(({ title, averageRating, id }) => (
                <Box key={id}>
                  <Cover id={id} key={id} />
                  <DefaultText>{title}</DefaultText>
                  <DefaultText>{averageRating}</DefaultText>
                </Box>
              ))}
              <Box>
                {playtime && (
                  <View style={{ padding: Spacing.m }}>
                    <MutedText>PLAYTIME</MutedText>
                    <DefaultText>Total {playtime}</DefaultText>
                    <DefaultText>
                      Per player {playtime / participants.length}
                    </DefaultText>
                  </View>
                )}
                {variants && (
                  <View style={{ padding: Spacing.m }}>
                    <MutedText>VARIANTS</MutedText>
                    <DefaultText>{variants}</DefaultText>
                  </View>
                )}
                {location && (
                  <View style={{ padding: Spacing.m }}>
                    <MutedText>LOCATION</MutedText>
                    <DefaultText>
                      {location.name} {location.address}
                    </DefaultText>
                  </View>
                )}
              </Box>
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

export default SessionDetailsScreen
