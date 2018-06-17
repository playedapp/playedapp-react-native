import React from "react"
import { View, Text } from "react-native"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../../components/shared/Box"
import LinkedAvatar from "../../components/flow/LinkedAvatar"
import { toOrdinal } from "../../lib/utils"
import { SessionContext } from "./session-context"

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

const SessionDetailsScreen = () => (
  <SessionContext.Consumer>
    {({ id }) => (
      <Query query={GET_SESSION} variables={{ id }}>
        {({ loading, error, data }) => {
          if (loading) return <Text>Loading…</Text>
          if (error) return <Text>Error!</Text>

          const { participants } = data.session

          return (
            <View>
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
            </View>
          )
        }}
      </Query>
    )}
  </SessionContext.Consumer>
)

export default SessionDetailsScreen
