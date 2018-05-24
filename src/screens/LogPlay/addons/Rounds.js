import PropTypes from "prop-types"
import React, { Component } from "react"
import { View, SegmentedControlIOS } from "react-native"
import TextInput from "../../../components/shared/TextInput"
import { withNavigation } from "react-navigation"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"
import Spacing from "../../../constants/Spacing"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"

export const Button = withNavigation(({ navigation }) => (
  <SessionContext.Consumer>
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
  </SessionContext.Consumer>
))

Button.propTypes = {
  navigation: PropTypes.object,
}

export const Row = withNavigation(({ navigation }) => (
  <SessionContext.Consumer>
    {({ rounds, setRounds }) =>
      rounds !== undefined && (
        <AddOnRow
          onPress={() => navigation.navigate("RoundsScreen")}
          onRemove={() => setRounds(undefined)}
        >
          <BoldText>Rounds</BoldText>
          <MutedText>{rounds}</MutedText>
        </AddOnRow>
      )
    }
  </SessionContext.Consumer>
))

Row.propTypes = {
  navigation: PropTypes.object,
}

export class Screen extends Component {
  static navigationOptions = { title: "Set rounds" }

  state = {}

  render() {
    return (
      <SessionContext.Consumer>
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
      </SessionContext.Consumer>
    )
  }
}
