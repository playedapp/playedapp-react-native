import React, { Component } from "react"
import { View, Text, ScrollView } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../components/shared/Box"
import LinkedAvatar from "../components/flow/LinkedAvatar"
import { toOrdinal } from "../lib/utils"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!) {
    session(id: $id) {
      participants {
        id
        person {
          name
        }
        score
        rank
        role
      }
    }
  }
`

class SessionDetailsScreen extends Component {
  static navigationOptions = {
    title: "Scoreboard",
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

          const { participants } = data.session

          return (
            <ScrollView>
              {participants
                .slice(0)
                .sort((a, b) => a.rank - b.rank)
                .map(({ id, person, score, rank, role }) => (
                  <Box key={id}>
                    <View style={{ flexDirection: "row" }}>
                      <LinkedAvatar id={id} />
                      <View>
                        <Text>{person.name}</Text>
                        <Text>
                          {rank === 1
                            ? `Winner with ${score}!`
                            : `${toOrdinal(rank)} with ${score}`}
                        </Text>
                      </View>
                      <View>{role && <Text>Role:{role}</Text>}</View>
                    </View>
                  </Box>
                ))}
            </ScrollView>
          )
        }}
      </Query>
    )
  }
}

export default SessionDetailsScreen
