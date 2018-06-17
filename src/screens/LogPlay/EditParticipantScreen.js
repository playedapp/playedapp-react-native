import React, { Component } from "react"
import PropTypes from "prop-types"
import {
  TouchableOpacity,
  ScrollView,
  View,
  StyleSheet,
  Switch,
} from "react-native"
import { CreateSessionContext } from "../../contexts/create-session-context"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import Box from "../../components/shared/Box"
import Avatar from "../../components/flow/Avatar"
import TextInput from "../../components/shared/TextInput"

class EditParticipantScreen extends Component {
  static propTypes = {
    participants: PropTypes.arrayOf(
      PropTypes.shape({
        score: PropTypes.number,
        rank: PropTypes.number,
        role: PropTypes.string,
        isFirstPlay: PropTypes.bool,
        person: PropTypes.shape({
          id: PropTypes.string,
          name: PropTypes.string,
        }),
      }),
    ).isRequired,
    index: PropTypes.number.isRequired,
    updateParticipant: PropTypes.func.isRequired,
    onChangeParticipant: PropTypes.func,
  }

  state = {
    current: this.props.index,
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.index === this.props.index) return

    this.setState({ current: nextProps.index })
  }

  handleChangeParticipant = index => {
    const { onChangeParticipant, participants } = this.props
    this.setState({ current: index })
    onChangeParticipant && onChangeParticipant(participants[index])
  }

  render() {
    const { participants, updateParticipant } = this.props
    const { current } = this.state
    const participant = participants[current]

    return (
      <View style={styles.container}>
        <View style={{ padding: Spacing.m, flexDirection: "row" }}>
          {participants.map(({ person: { id } }, index) => (
            <TouchableOpacity
              key={id}
              onPress={() => this.handleChangeParticipant(index)}
            >
              <Avatar id={id} />
            </TouchableOpacity>
          ))}
        </View>
        <ScrollView keyboardShouldPersistTaps="always">
          <View style={{ padding: Spacing.m, flexDirection: "row" }}>
            <View style={{ marginRight: Spacing.m }}>
              <Avatar id={participant.person.id} />
            </View>
            <Box>
              <View style={{ padding: Spacing.m }}>
                <TextInput
                  value={participant.score ? String(participant.score) : ""}
                  placeholder="Score"
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onChangeText={score =>
                    updateParticipant(current, {
                      score: parseInt(score),
                    })
                  }
                />
                <TextInput
                  value={participant.rank ? String(participant.rank) : ""}
                  placeholder="Rank"
                  keyboardType="number-pad"
                  returnKeyType="done"
                  onChangeText={rank =>
                    updateParticipant(current, {
                      rank: parseInt(rank),
                    })
                  }
                />
                <TextInput
                  value={participant.role}
                  placeholder="Role"
                  returnKeyType="done"
                  onChangeText={role =>
                    updateParticipant(current, {
                      role,
                    })
                  }
                />
                <Switch
                  value={participant.isFirstPlay}
                  onValueChange={isFirstPlay =>
                    updateParticipant(current, { isFirstPlay })
                  }
                />
              </View>
            </Box>
          </View>
        </ScrollView>
      </View>
    )
  }
}

export default class X extends Component {
  static navigationOptions = ({ navigation }) => {
    return {
      title: navigation.state.params.name,
    }
  }

  render() {
    const { index } = this.props.navigation.state.params

    return (
      <CreateSessionContext.Consumer>
        {({ participants, updateParticipant }) => {
          return (
            <EditParticipantScreen
              index={index}
              participants={participants}
              updateParticipant={updateParticipant}
              onChangeParticipant={participant =>
                this.props.navigation.setParams({
                  name: participant.person.name,
                })
              }
            />
          )
        }}
      </CreateSessionContext.Consumer>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
})
