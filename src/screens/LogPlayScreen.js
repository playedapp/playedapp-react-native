import React, { Fragment } from "react"
import PropTypes from "prop-types"
import {
  ScrollView,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
} from "react-native"
import Fonts from "../constants/Fonts"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import { debounce } from "lodash-es"
import Box from "../components/shared/Box"
import Spacing from "../constants/Spacing"
import Colors from "../constants/Colors"
import {
  DefaultText,
  MutedText,
  BoldText,
} from "../components/shared/TextStyles"
import Cover from "../components/shared/Cover"
import Avatar from "../components/flow/Avatar"
import { SessionContext } from "./session-context"

const SEARCH_GAMES = gql`
  query SEARCH_GAMES($search: String) {
    games(search: $search) {
      id
      title
      yearPublished
    }
  }
`
const SEARCH_PEOPLE = gql`
  query SEARCH_PEOPLE($search: String) {
    people(search: $search) {
      id
      name
      avatar {
        url
      }
    }
  }
`
const CREATE_SESSION = gql`
  mutation createSession($input: SessionInput) {
    createSession(input: $input) {
      session {
        playtime
      }
    }
  }
`

export default class LogPlayScreen extends React.Component {
  static navigationOptions = { title: "Log play" }

  static propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func,
      dispatch: PropTypes.func,
    }),
  }

  state = {
    gameSearchText: "",
    personSearchText: "",
  }

  showParticipantScreen = (participant, index) => {
    const { navigate } = this.props.navigation
    navigate("EditParticipantScreen", { participant, index })
  }

  get inputObject() {
    const { games, comment, participants } = this.state

    return {
      games: games.map(({ id }) => id),
      participants: participants.map(({ person }) => ({
        person: person.id,
        ratings: [
          {
            game: games[0].id,
            person: person.id,
            comment: {
              content: comment,
            },
          },
        ],
      })),
    }
  }

  handleComplete = () => {
    const { navigate } = this.props.navigation
    navigate("Home")
  }

  render() {
    const { gameSearchText, personSearchText, comment } = this.state

    return (
      <ScrollView style={styles.container} keyboardShouldPersistTaps="always">
        <View style={{ padding: Spacing.m }}>
          <TextInput
            style={styles.textInput}
            placeholder="Search games and expansions"
            autoCorrect={false}
            value={gameSearchText}
            returnKeyType="done"
            onChangeText={debounce(
              text => this.setState({ gameSearchText: text }),
              300,
            )}
          />
          {gameSearchText && (
            <Query query={SEARCH_GAMES} variables={{ search: gameSearchText }}>
              {({ loading, error, data }) => {
                if (loading) return <Text>Loading…</Text>
                if (error) return <Text>Error!</Text>

                return (
                  <SessionContext.Consumer>
                    {({ addGame }) => (
                      <Box>
                        {data.games.map(game => {
                          const { id, title, yearPublished } = game

                          return (
                            <TouchableOpacity
                              key={id}
                              onPress={() => {
                                addGame(game)
                                this.setState({ gameSearchText: "" })
                              }}
                            >
                              <View
                                style={{
                                  padding: Spacing.m,
                                  flexDirection: "row",
                                  alignItems: "center",
                                  width: "100%",
                                }}
                              >
                                <Text style={{ flexGrow: 1 }}>
                                  <DefaultText>{title}</DefaultText>
                                  <MutedText>{yearPublished}</MutedText>
                                </Text>
                                <Cover id={id} />
                              </View>
                            </TouchableOpacity>
                          )
                        })}
                      </Box>
                    )}
                  </SessionContext.Consumer>
                )
              }}
            </Query>
          )}
          <SessionContext.Consumer>
            {({ games, removeGame }) =>
              games.map(game => {
                const { id, title } = game
                return (
                  <Box key={id}>
                    <View
                      style={{ justifyContent: "center", padding: Spacing.m }}
                    >
                      <View
                        style={{
                          flexDirection: "row",
                          justifyContent: "space-between",
                        }}
                      >
                        <Button title="×" onPress={() => removeGame(game)} />
                        <Cover id={id} />
                        <Button title="…" />
                      </View>
                      <BoldText style={{ textAlign: "center" }}>
                        {title}
                      </BoldText>
                      <MutedText
                        style={{
                          paddingHorizontal: Spacing.l,
                          textAlign: "center",
                        }}
                      >
                        You’ve rated this game before. Adjusting the rating here
                        will change your overall rating for this game.
                      </MutedText>
                    </View>
                  </Box>
                )
              })
            }
          </SessionContext.Consumer>
        </View>
        <View style={{ padding: Spacing.m }}>
          <DefaultText>REVIEW OR NOTES</DefaultText>
          <TextInput
            style={styles.textInput}
            placeholder="Add…"
            value={comment}
            onChangeText={text => this.setState({ comment: text })}
          />
        </View>
        <View style={{ padding: Spacing.m }}>
          <DefaultText>PLAYERS</DefaultText>
          <Box>
            <SessionContext.Consumer>
              {({ participants, removeParticipant, updateParticipant }) =>
                participants.map((participant, index) => (
                  <View
                    key={participant.id}
                    style={{
                      padding: Spacing.m,
                      flexDirection: "row",
                      alignItems: "center",
                    }}
                  >
                    <Button
                      title="×"
                      onPress={() => removeParticipant(participant)}
                    />
                    <Text>{participant.person.name}</Text>
                    <TextInput
                      value={String(participant.score)}
                      keyboardType="number-pad"
                      onChangeText={score =>
                        updateParticipant(index, {
                          score: parseInt(score),
                        })
                      }
                      style={{ width: 100 }}
                    />
                    <Button
                      title=">"
                      onPress={() =>
                        this.showParticipantScreen(participant, index)
                      }
                    />
                  </View>
                ))
              }
            </SessionContext.Consumer>
            <SessionContext.Consumer>
              {({ addParticipant }) => (
                <Fragment>
                  <TextInput
                    style={styles.textInput}
                    placeholder="Search or invite people"
                    value={personSearchText}
                    returnKeyType="done"
                    onChangeText={debounce(
                      text =>
                        this.setState({
                          personSearchText: text,
                        }),
                      300,
                    )}
                  />
                  {personSearchText && (
                    <Query
                      query={SEARCH_PEOPLE}
                      variables={{ search: personSearchText }}
                    >
                      {({ loading, error, data }) => {
                        if (loading) return <Text>Loading…</Text>
                        if (error) return <Text>Error!</Text>

                        return (
                          <Box>
                            {data.people.map(person => {
                              const { id, name } = person
                              return (
                                <TouchableOpacity
                                  key={id}
                                  onPress={() => {
                                    this.setState({ personSearchText: "" })
                                    addParticipant(person)
                                  }}
                                >
                                  <View
                                    style={{
                                      padding: Spacing.m,
                                      flexDirection: "row",
                                      alignItems: "center",
                                      width: "100%",
                                    }}
                                  >
                                    <Avatar id={id} />
                                    <DefaultText style={{ flexGrow: 1 }}>
                                      {name}
                                    </DefaultText>
                                  </View>
                                </TouchableOpacity>
                              )
                            })}
                          </Box>
                        )
                      }}
                    </Query>
                  )}
                </Fragment>
              )}
            </SessionContext.Consumer>
          </Box>
        </View>
        <Mutation mutation={CREATE_SESSION} onCompleted={this.handleComplete}>
          {(createSession, { error, loading }) => {
            return (
              <View>
                {error && <Text>{error}</Text>}
                <Button
                  title={loading ? "Publishing" : "Publish"}
                  onPress={() => {
                    createSession({
                      variables: {
                        input: this.inputObject,
                      },
                    })
                  }}
                />
              </View>
            )
          }}
        </Mutation>
      </ScrollView>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  text: {
    fontFamily: Fonts.families.nunito.regular,
  },
  textInput: {
    padding: Spacing.m,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
  },
})
