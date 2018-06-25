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
import {
  BoldText,
  DefaultText,
  MutedText,
} from "../../components/shared/TextStyles"
import GameHistory from "../../components/session/GameHistory"

const GET_SESSION = gql`
  query GET_SESSION($id: ID!, $games: [ID!]) {
    session(id: $id) {
      participants {
        id
        person {
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

  handlePersonPress = ({ name }) => {
    const { navigate } = this.props.navigation
    navigate("Person", { name })
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
                    <Box key={id}>
                      <View
                        style={{
                          flexDirection: "row",
                          padding: Spacing.m,
                        }}
                      >
                        <View style={{ marginRight: Spacing.m }}>
                          <Avatar
                            id={id}
                            onPress={() => this.handlePersonPress(person)}
                            winner={rank === 1}
                          />
                        </View>
                        <View style={{ flexGrow: 1 }}>
                          <View style={{ flexDirection: "row" }}>
                            <View>
                              <BoldText>{person.name}</BoldText>
                              <Text>
                                {rank === 1 ? (
                                  <DefaultText>
                                    Winner with <BoldText>{score}</BoldText>!
                                  </DefaultText>
                                ) : (
                                  <DefaultText>
                                    {toOrdinal(rank)} with{" "}
                                    <BoldText>{score}</BoldText>
                                  </DefaultText>
                                )}
                              </Text>
                            </View>

                            <View style={{ marginLeft: "auto" }}>
                              {role && <MutedText>Role:{role}</MutedText>}
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
