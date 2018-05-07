import React, { Component } from "react"
import { KeyboardAvoidingView } from "react-native"
import { StackNavigator } from "react-navigation"
import LogPlayScreen from "../screens/LogPlay/LogPlayScreen"
import { SessionContext } from "../contexts/session-context"
import EditParticipantScreen from "../screens/LogPlay/EditParticipantScreen"
import AddParticipantsScreen from "../screens/LogPlay/AddParticipantsScreen"
import headerStyles from "./headerStyles"

const removeFromArray = (array, item) => {
  const newArray = array.slice()
  newArray.splice(newArray.indexOf(item), 1)
  return newArray
}

const LogPlayStackNavigator = StackNavigator(
  {
    Main: { screen: LogPlayScreen },
    EditParticipantScreen: { screen: EditParticipantScreen },
    AddParticipantsScreen: { screen: AddParticipantsScreen },
  },
  {
    initialRouteName: "Main",
    navigationOptions: {
      ...headerStyles,
    },
  },
)

class LogPlayStack extends Component {
  addGame = game => {
    this.setState({
      games: [...this.state.games, game],
    })
  }

  removeGame = game => {
    this.setState({
      games: removeFromArray(this.state.games, game),
    })
  }

  addParticipant = person => {
    this.setState({
      participants: [...this.state.participants, { person, score: 0 }],
    })
  }

  updateParticipant = (updateIndex, data) => {
    this.setState({
      participants: this.state.participants.map((participant, index) => {
        return index !== updateIndex
          ? participant
          : {
              ...participant,
              ...data,
            }
      }),
    })
  }

  removeParticipant = participant => {
    this.setState({
      participants: removeFromArray(this.state.participants, participant),
    })
  }

  addPhoto = photo => {
    this.setState({
      photos: [...this.state.photos, photo],
    })
  }

  removePhoto = photo => {
    this.setState({
      photos: removeFromArray(this.state.photos, photo),
    })
  }

  setPlaytime = playtime => this.setState({ playtime })

  setRounds = rounds => this.setState({ rounds })

  setVariants = variants => this.setState({ variants })

  state = {
    games: [],
    addGame: this.addGame,
    removeGame: this.removeGame,
    playtime: undefined,
    setPlaytime: this.setPlaytime,
    rounds: undefined,
    setRounds: this.setRounds,
    variants: undefined,
    setVariants: this.setVariants,
    comment: "",
    participants: [],
    addParticipant: this.addParticipant,
    removeParticipant: this.removeParticipant,
    updateParticipant: this.updateParticipant,
    photos: [],
    addPhoto: this.addPhoto,
    removePhoto: this.removePhoto,
    location: undefined,
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        <KeyboardAvoidingView enabled behavior="padding" style={{ flex: 1 }}>
          <LogPlayStackNavigator />
        </KeyboardAvoidingView>
      </SessionContext.Provider>
    )
  }
}

export default LogPlayStack
