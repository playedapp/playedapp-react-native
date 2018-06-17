import PropTypes from "prop-types"
import React, { Component } from "react"
import { View, SegmentedControlIOS } from "react-native"
import TextInput from "../../../components/shared/TextInput"
import { withNavigation } from "react-navigation"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"
import Spacing from "../../../constants/Spacing"
import { CreateSessionContext } from "../../../contexts/create-session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"

export const Button = withNavigation(({ navigation }) => (
  <CreateSessionContext.Consumer>
    {({ playtime }) => (
      <AddOnButton
        title="Playtime"
        icon="clock"
        done={playtime !== undefined}
        onPress={() => {
          navigation.navigate("PlaytimeScreen")
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
    {({ playtime, setPlaytime }) =>
      playtime !== undefined && (
        <AddOnRow
          onPress={() => navigation.navigate("PlaytimeScreen")}
          onRemove={() => setPlaytime(undefined)}
        >
          <BoldText>Playtime</BoldText>
          <MutedText>{playtime}</MutedText>
        </AddOnRow>
      )
    }
  </CreateSessionContext.Consumer>
))

Row.propTypes = {
  navigation: PropTypes.object,
}

export class Screen extends Component {
  static navigationOptions = { title: "Set playtime" }

  state = {}

  render() {
    return (
      <CreateSessionContext.Consumer>
        {({ playtime, setPlaytime }) => (
          <View style={{ padding: Spacing.m }}>
            <TextInput
              keyboardType="numeric"
              value={playtime}
              placeholder="Enter playtime in minutes"
              onChangeText={playtime => setPlaytime(playtime)}
            />
            <SegmentedControlIOS
              momentary={true}
              values={["15", "30", "45", "60", "90", "120", "180", "240"]}
              onValueChange={playtime => setPlaytime(playtime)}
            />
          </View>
        )}
      </CreateSessionContext.Consumer>
    )
  }
}
