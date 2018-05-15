import { SessionContext } from "./session-context"
import React, { Component } from "react"
import { removeFromArray } from "../lib/utils"
import PropTypes from "prop-types"

class LogPlayProvider extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
  }

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

  setLocation = location => {
    this.setState({ location })
  }

  setPlaytime = playtime => this.setState({ playtime })

  setRounds = rounds => this.setState({ rounds })

  setVariants = variants => this.setState({ variants })

  state = {
    games: [],
    addGame: this.addGame,
    removeGame: this.removeGame,
    location: undefined,
    setLocation: this.setLocation,
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
  }

  render() {
    return (
      <SessionContext.Provider value={this.state}>
        {this.props.children}
      </SessionContext.Provider>
    )
  }
}

export default LogPlayProvider
