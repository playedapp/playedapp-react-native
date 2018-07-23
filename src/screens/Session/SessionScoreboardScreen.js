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
import GameHistory from "../../components/session/GameHistory"
import text from "../../styles/text"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!, $games: [ID!]) {
    session(id: $id) {
      participants {
        id
        person {
          id
          name
          stats(games: $games) {
            plays
            wins
            best
            worst
            average
          }
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

  handlePersonPress = ({ name, id }) => {
    const { navigate } = this.props.navigation
    navigate("Person", { name, id })
  }

  render() {
    return (
      <View style={{ padding: Spacing.m }}>
        <SessionContext.Consumer>
          {({ id, games }) => (
            <Query query={GET_SESSION} variables={{ id, games }}>
              {({ loading, error, data }) => {
                if (loading) return <Text>Loading…</Text>
                if (error) return <Text>Error!</Text>

                const { participants } = data.session

                return participants
                  .slice(0)
                  .sort((a, b) => a.rank - b.rank)
                  .map(({ id, person, score, rank, role }) => (
                    <Box
                      key={id}
                      onPress={() => this.handlePersonPress(person)}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          padding: Spacing.m,
                        }}
                      >
                        <View style={{ marginRight: Spacing.m }}>
                          <Avatar id={id} winner={rank === 1} />
                        </View>
                        <View style={{ flexGrow: 1 }}>
                          <View style={{ flexDirection: "row" }}>
                            <View>
                              <Text style={text.bold}>{person.name}</Text>
                              <Text>
                                {rank === 1 ? (
                                  <Text style={text.default}>
                                    Winner with{" "}
                                    <Text style={text.bold}>{score}</Text>!
                                  </Text>
                                ) : (
                                  <Text style={text.default}>
                                    {toOrdinal(rank)} with{" "}
                                    <Text style={text.bold}>{score}</Text>
                                  </Text>
                                )}
                              </Text>
                            </View>

                            <View style={{ marginLeft: "auto" }}>
                              {role && (
                                <Text style={text.muted}>Role: {role}</Text>
                              )}
                            </View>
                          </View>
                          <View style={{ marginTop: Spacing.m }}>
                            <GameHistory stats={person.stats[0]} />
                          </View>
                        </View>
                      </View>
                    </Box>
                  ))
              }}
            </Query>
          )}
        </SessionContext.Consumer>
      </View>
    )
  }
}

export default withNavigation(SessionScoreboardScreen)
