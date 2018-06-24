import React, { Component } from "react"
import { View, Text } from "react-native"
import PropTypes from "prop-types"
import gql from "graphql-tag"
import { Query } from "react-apollo"
import Box from "../../components/shared/Box"
import { toOrdinal } from "../../lib/utils"
import { SessionContext } from "./session-context"
import Spacing from "../../constants/Spacing"
import Avatar from "../../components/flow/Avatar"
import { withNavigation } from "react-navigation"

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

class SessionScoreboardScreen extends Component {
  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }),
  }

  handlePersonPress = ({ name }) => {
    const { navigate } = this.props.navigation
    navigate("Person", { name })
  }

  render() {
    return (
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
                        <View
                          style={{ flexDirection: "row", padding: Spacing.m }}
                        >
                          <Avatar
                            id={id}
                            onPress={() => this.handlePersonPress(person)}
                          />
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
  }
}

export default withNavigation(SessionScoreboardScreen)
