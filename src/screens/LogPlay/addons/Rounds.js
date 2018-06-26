import PropTypes from "prop-types"
import React, { Component } from "react"
import { View, Text } from "react-native"
import TextInput from "../../../components/shared/TextInput"
import { withNavigation } from "react-navigation"
import Spacing from "../../../constants/Spacing"
import { CreateSessionContext } from "../../../contexts/create-session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import text from "../../../styles/text"

export const Button = withNavigation(({ navigation }) => (
  <CreateSessionContext.Consumer>
    {({ rounds }) => (
      <AddOnButton
        title="Rounds"
        icon="repeat"
        done={rounds !== undefined}
        onPress={() => {
          navigation.navigate("RoundsScreen")
        }}
      />
    )}
  </CreateSessionContext.Consumer>
))

Button.propTypes = {
  navigation: PropTypes.object,
}

export const Row = withNavigation(({ navigation }) => (
  <CreateSessionContext.Consumer>
    {({ rounds, setRounds }) =>
      rounds !== undefined && (
        <AddOnRow
          onPress={() => navigation.navigate("RoundsScreen")}
          onRemove={() => setRounds(undefined)}
        >
          <Text style={text.bold}>Rounds</Text>
          <Text style={text.muted}>{rounds}</Text>
        </AddOnRow>
      )
    }
  </CreateSessionContext.Consumer>
))

Row.propTypes = {
  navigation: PropTypes.object,
}

export class Screen extends Component {
  static navigationOptions = { title: "Set rounds" }

  state = {}

  render() {
    return (
      <CreateSessionContext.Consumer>
        {({ rounds, setRounds }) => (
          <View style={{ padding: Spacing.m }}>
            <TextInput
              keyboardType="numeric"
              value={rounds}
              placeholder="Enter number of rounds"
              onChangeText={rounds => setRounds(rounds)}
            />
          </View>
        )}
      </CreateSessionContext.Consumer>
    )
  }
}
