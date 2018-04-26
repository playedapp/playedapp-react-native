import React from "react"
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
import { Query } from "react-apollo"
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

const removeFromArray = (array, item) => {
  const newArray = array.slice()
  newArray.splice(newArray.indexOf(item), 1)
  return newArray
}

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

export default class LogPlayScreen extends React.Component {
  static navigationOptions = {
    title: "Log play",
  }

  state = {
    gameSearchText: "",
    personSearchText: "",
    games: [],
    comment: "",
    participants: [],
  }

  addGame = game => {
    this.setState({ games: [...this.state.games, game], gameSearchText: "" })
  }

  removeGame = game => {
    this.setState({ games: removeFromArray(this.state.games, game) })
  }

  addParticipant = person => {
    this.setState({
      participants: [...this.state.participants, { person }],
      personSearchText: "",
    })
  }

  removeParticipant = participant => {
    this.setState({
      participants: removeFromArray(this.state.participants, participant),
    })
  }

  render() {
    const {
      gameSearchText,
      personSearchText,
      comment,
      games,
      participants,
    } = this.state

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
                  <Box>
                    {data.games.map(game => {
                      const { id, title, yearPublished } = game
                      return (
                        <TouchableOpacity
                          key={id}
                          onPress={() => this.addGame(game)}
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
                )
              }}
            </Query>
          )}
          {games.map(game => {
            const { id, title } = game
            return (
              <Box key={id}>
                <View style={{ justifyContent: "center", padding: Spacing.m }}>
                  <View
                    style={{
                      flexDirection: "row",
                      justifyContent: "space-between",
                    }}
                  >
                    <Button title="×" onPress={() => this.removeGame(game)} />
                    <Cover id={id} />
                    <Button title="…" />
                  </View>
                  <BoldText style={{ textAlign: "center" }}>{title}</BoldText>
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
          })}
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
            {participants.map(participant => (
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
                  onPress={() => this.removeParticipant(participant)}
                />
                <Text>{participant.person.name}</Text>
              </View>
            ))}
            <TextInput
              style={styles.textInput}
              placeholder="Search or invite people"
              value={personSearchText}
              returnKeyType="done"
              onChangeText={debounce(
                text => this.setState({ personSearchText: text }),
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
                            onPress={() => this.addParticipant(person)}
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
          </Box>
        </View>
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
