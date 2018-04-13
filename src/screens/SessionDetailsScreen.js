import React, { Component } from "react"
import { View, Text, ScrollView } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../components/shared/Box"
import Cover from "../components/shared/Cover"

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
            <ScrollView>
              {games.map(({ title, averageRating, id }) => (
                <Box key={id}>
                  <Cover id={id} key={id} />
                  <Text>{title}</Text>
                  <Text>{averageRating}</Text>
                </Box>
              ))}
              <Box>
                {playtime && (
                  <View>
                    <Text>PLAYTIME</Text>
                    <Text>Total {playtime}</Text>
                    <Text>Per player {playtime / participants.length}</Text>
                  </View>
                )}
                {variants && (
                  <View>
                    <Text>VARIANTS</Text>
                    <Text>{variants}</Text>
                  </View>
                )}
                {location && (
                  <View>
                    <Text>LOCATION</Text>
                    <Text>
                      {location.name} {location.address}
                    </Text>
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
