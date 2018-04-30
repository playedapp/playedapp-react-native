import React, { Component, Fragment } from "react"
import PropTypes from "prop-types"
import { Text, TextInput } from "react-native"
import { SessionContext } from "./session-context"

class EditParticipantScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Edit ${navigation.state.params.participant.person.name}`,
  })

  state = {}

  static propTypes = {
    navigation: PropTypes.shape({
      state: PropTypes.shape({
        params: PropTypes.shape({
          index: PropTypes.number.isRequired,
          participant: PropTypes.shape({
            score: PropTypes.number,
            person: PropTypes.shape({
              name: PropTypes.string,
            }),
          }).isRequired,
        }).isRequired,
      }).isRequired,
    }).isRequired,
  }

  render() {
    const { participant, index } = this.props.navigation.state.params

    return (
      <SessionContext.Consumer>
        {({ updateParticipant }) => (
          <Fragment>
            <Text>{participant.person.name}</Text>
            <TextInput
              value={String(participant.score)}
              keyboardType="number-pad"
              returnKeyType="done"
              onChangeText={score =>
                updateParticipant(index, {
                  score: parseInt(score),
                })
              }
              style={{ width: 100 }}
            />
          </Fragment>
        )}
      </SessionContext.Consumer>
    )
  }
}

export default EditParticipantScreen
