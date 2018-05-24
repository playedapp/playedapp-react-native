import React, { Component } from "react"
import { SessionContext } from "../../../contexts/session-context"
import AddOnButton from "./AddOnButton"
import AddOnRow from "./AddOnRow"
import { BoldText, MutedText } from "../../../components/shared/TextStyles"
import PropTypes from "prop-types"
import { withNavigation } from "react-navigation"
import TextInput from "../../../components/shared/TextInput"
import { View } from "react-native"
import Spacing from "../../../constants/Spacing"
import { MapView } from "expo"

export const Button = withNavigation(({ navigation }) => (
  <SessionContext.Consumer>
    {({ location }) => (
      <AddOnButton
        title="Location"
        icon="map-pin"
        done={location !== undefined}
        onPress={() => {
          navigation.navigate("LocationScreen")
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
    {({ location, setLocation }) =>
      location !== undefined && (
        <AddOnRow
          onPress={() => navigation.navigate("LocationScreen")}
          onRemove={() => setLocation(undefined)}
        >
          <BoldText>Location</BoldText>
          <MutedText>{location}</MutedText>
        </AddOnRow>
      )
    }
  </SessionContext.Consumer>
))

Row.propTypes = {
  navigation: PropTypes.object,
}

export class Screen extends Component {
  static navigationOptions = { title: "Set location" }

  state = {}

  render() {
    return (
      <SessionContext.Consumer>
        {({ location, setLocation }) => (
          <View style={{ padding: Spacing.m }}>
            <TextInput
              value={location}
              onChangeText={location => setLocation(location)}
            />
            <MapView
              initialRegion={{
                latitude: 37.78825,
                longitude: -122.4324,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }}
              style={{ width: 300, height: 300 }}
            />
          </View>
        )}
      </SessionContext.Consumer>
    )
  }
}
