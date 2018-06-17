import React, { Component } from "react"
import { View, Text } from "react-native"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../../components/shared/Box"
import Cover from "../../components/shared/Cover"
import { MutedText, DefaultText } from "../../components/shared/TextStyles"
import Spacing from "../../constants/Spacing"
import { formatDuration } from "../../lib/utils"
import { SessionContext } from "./session-context"

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

  render() {
    return (
      <SessionContext.Consumer>
        {({ id }) => (
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
                <View style={{ padding: Spacing.m }}>
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
                        <DefaultText>
                          Total {formatDuration(playtime)}
                        </DefaultText>
                        <DefaultText>
                          Per player{" "}
                          {formatDuration(playtime / participants.length)}
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
                </View>
              )
            }}
          </Query>
        )}
      </SessionContext.Consumer>
    )
  }
}

export default SessionDetailsScreen
