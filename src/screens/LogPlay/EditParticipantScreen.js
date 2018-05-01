import React, { Component } from "react"
import PropTypes from "prop-types"
import { ScrollView, View, TextInput, StyleSheet, Switch } from "react-native"
import { SessionContext } from "../../contexts/session-context"
import Colors from "../../constants/Colors"
import Spacing from "../../constants/Spacing"
import Box from "../../components/shared/Box"
import Avatar from "../../components/flow/Avatar"

class EditParticipantScreen extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: `Edit ${navigation.state.params.participant.person.name}`,
  })

  state = {}

  static propTypes = {
    participant: PropTypes.shape({
      score: PropTypes.number,
      rank: PropTypes.string,
      role: PropTypes.string,
      isFirstPlay: PropTypes.bool,
      person: PropTypes.shape({
        name: PropTypes.string,
      }),
    }).isRequired,
    index: PropTypes.number.isRequired,
  }

  render() {
    const { participant, index } = this.props

    return (
      <SessionContext.Consumer>
        {({ updateParticipant }) => (
          <ScrollView
            style={styles.container}
            keyboardShouldPersistTaps="always"
          >
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
                      updateParticipant(index, {
                        score: parseInt(score),
                      })
                    }
                    style={styles.textInput}
                  />
                  <TextInput
                    value={participant.rank ? String(participant.rank) : ""}
                    placeholder="Rank"
                    keyboardType="number-pad"
                    returnKeyType="done"
                    onChangeText={rank =>
                      updateParticipant(index, {
                        rank: parseInt(rank),
                      })
                    }
                    style={styles.textInput}
                  />
                  <TextInput
                    value={participant.role}
                    placeholder="Role"
                    returnKeyType="done"
                    onChangeText={role =>
                      updateParticipant(index, {
                        role,
                      })
                    }
                    style={styles.textInput}
                  />
                  <Switch
                    value={participant.isFirstPlay}
                    onValueChange={isFirstPlay =>
                      updateParticipant(index, { isFirstPlay })
                    }
                  />
                </View>
              </Box>
            </View>
          </ScrollView>
        )}
      </SessionContext.Consumer>
    )
  }
}

export default props => {
  const { index } = props.navigation.state.params
  return (
    <SessionContext.Consumer>
      {({ participants }) => (
        <EditParticipantScreen
          index={index}
          participant={participants[index]}
        />
      )}
    </SessionContext.Consumer>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.mainBackground,
  },
  textInput: {
    padding: Spacing.m,
    borderRadius: 12,
    backgroundColor: Colors.white,
    borderWidth: 1,
    width: 100,
  },
})
