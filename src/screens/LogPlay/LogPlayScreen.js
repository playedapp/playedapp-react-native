import React from "react"
import PropTypes from "prop-types"
import {
  ScrollView,
  Image,
  View,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  Button,
  ActionSheetIOS,
} from "react-native"
import Fonts from "../../constants/Fonts"
import gql from "graphql-tag"
import { Query, Mutation } from "react-apollo"
import { debounce } from "lodash-es"
import Box from "../../components/shared/Box"
import Spacing from "../../constants/Spacing"
import Colors from "../../constants/Colors"
import {
  DefaultText,
  MutedText,
  BoldText,
} from "../../components/shared/TextStyles"
import Cover from "../../components/shared/Cover"
import Avatar from "../../components/flow/Avatar"
import { SessionContext } from "../../contexts/session-context"
import DividerHeading from "../../components/shared/DividerHeading"
import { Feather, MaterialCommunityIcons } from "@expo/vector-icons"
import Expo from "expo"

const { ImagePicker, Permissions } = Expo

const SEARCH_GAMES = gql`
  query SEARCH_GAMES($search: String) {
    games(search: $search) {
      id
      title
      yearPublished
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
  }

  showEditParticipantScreen = (index, name) => {
    const { navigate } = this.props.navigation
    navigate("EditParticipantScreen", { index, name })
  }

  showAddParticipantsScreen = () => {
    const { navigate } = this.props.navigation
    navigate("AddParticipantsScreen")
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
    const { gameSearchText, comment } = this.state

    return (
      <ScrollView keyboardShouldPersistTaps="always" style={styles.container}>
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
                        <TouchableOpacity onPress={() => removeGame(game)}>
                          <Feather name="x" size={32} color={Colors.danger} />
                        </TouchableOpacity>
                        <Cover id={id} />
                        <TouchableOpacity onPress={() => removeGame(game)}>
                          <MaterialCommunityIcons
                            name="dots-horizontal"
                            size={32}
                            color={Colors.primary}
                          />
                        </TouchableOpacity>
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
        <DividerHeading>Review or notes</DividerHeading>
        <View style={{ padding: Spacing.m }}>
          <TextInput
            style={styles.textInput}
            placeholder="Add…"
            value={comment}
            onChangeText={text => this.setState({ comment: text })}
          />
        </View>
        <DividerHeading>Photos</DividerHeading>
        <SessionContext.Consumer>
          {({ photos, addPhoto, removePhoto }) => {
            return (
              <View
                style={{
                  padding: Spacing.m,
                  flexDirection: "row",
                  flexWrap: "wrap",
                }}
              >
                {photos.map(photo => (
                  <TouchableOpacity
                    key={photo.uri}
                    onPress={() => removePhoto(photo)}
                  >
                    <Image
                      source={{ uri: photo.uri }}
                      style={{ width: 100, height: 100 }}
                    />
                  </TouchableOpacity>
                ))}
                <TouchableOpacity
                  onPress={async () => {
                    const options = ["Camera", "Library", "Cancel"]
                    ActionSheetIOS.showActionSheetWithOptions(
                      {
                        options,
                        cancelButtonIndex: 2,
                      },
                      async index => {
                        switch (options[index]) {
                          case "Camera": {
                            const { status } = await Permissions.askAsync(
                              Permissions.CAMERA,
                            )
                            if (status === "granted") {
                              const {
                                uri,
                                width,
                                height,
                              } = await ImagePicker.launchCameraAsync()
                              addPhoto({ uri, width, height })
                            }
                            break
                          }
                          case "Library": {
                            const { status } = await Permissions.askAsync(
                              Permissions.CAMERA_ROLL,
                            )
                            if (status === "granted") {
                              const {
                                cancelled,
                                uri,
                                width,
                                height,
                              } = await ImagePicker.launchImageLibraryAsync()
                              if (cancelled) return
                              addPhoto({ uri, width, height })
                            }
                            break
                          }
                        }
                      },
                    )
                  }}
                  style={{ flexDirection: "row", justifyContent: "center" }}
                >
                  <Feather name="plus" size={32} color={Colors.primary} />
                </TouchableOpacity>
              </View>
            )
          }}
        </SessionContext.Consumer>

        <DividerHeading>Players</DividerHeading>
        <View style={{ padding: Spacing.m }}>
          <Box>
            <SessionContext.Consumer>
              {({ participants, removeParticipant }) =>
                participants.map((participant, index) => {
                  const {
                    person: { id, name },
                    score,
                    role,
                    isFirstPlay,
                    rank,
                  } = participant
                  return (
                    <TouchableOpacity
                      key={id}
                      onPress={() =>
                        this.showEditParticipantScreen(index, name)
                      }
                      style={{
                        padding: Spacing.m,
                        width: "100%",
                        flexDirection: "row",
                        alignItems: "center",
                        flexGrow: 1,
                      }}
                    >
                      <TouchableOpacity
                        onPress={() => removeParticipant(participant)}
                      >
                        <Feather name="x" size={32} color={Colors.danger} />
                      </TouchableOpacity>
                      <Avatar id={id} />
                      <View style={{ flexGrow: 1 }}>
                        <BoldText>
                          {name} <MutedText>{score}p</MutedText>
                        </BoldText>
                        {(isFirstPlay || rank || role) && (
                          <MutedText>
                            {isFirstPlay && "First play "}
                            {rank === 1 && "👑 "}
                            {role}
                          </MutedText>
                        )}
                      </View>
                      <Feather
                        name="chevron-right"
                        size={32}
                        color={Colors.primary}
                      />
                    </TouchableOpacity>
                  )
                })
              }
            </SessionContext.Consumer>
            <TouchableOpacity
              onPress={this.showAddParticipantsScreen}
              style={{ flexDirection: "row", justifyContent: "center" }}
            >
              <Feather name="plus" size={32} color={Colors.primary} />
            </TouchableOpacity>
          </Box>
        </View>
        <DividerHeading>Add-ons</DividerHeading>
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
