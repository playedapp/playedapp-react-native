import React, { Component } from "react"
import { StackNavigator } from "react-navigation"
import LogPlayScreen from "../screens/LogPlayScreen"
import { SessionContext } from "../screens/session-context"
import EditParticipantScreen from "../screens/EditParticipantScreen"
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

  state = {
    games: [],
    comment: "",
    participants: [],
    addGame: this.addGame,
    removeGame: this.removeGame,
    addParticipant: this.addParticipant,
    removeParticipant: this.removeParticipant,
    updateParticipant: this.updateParticipant,
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        <LogPlayStackNavigator />
      </SessionContext.Provider>
    )
  }
}

export default LogPlayStack
