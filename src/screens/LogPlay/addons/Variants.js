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
    {({ variants }) => (
      <AddOnButton
        title="Variants"
        icon="repeat"
        done={variants !== undefined}
        onPress={() => {
          navigation.navigate("VariantsScreen")
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
    {({ variants, setVariants }) =>
      variants !== undefined && (
        <AddOnRow
          onPress={() => navigation.navigate("VariantsScreen")}
          onRemove={() => setVariants(undefined)}
        >
          <Text style={text.bold}>Variants</Text>
          <Text style={text.muted}>{variants}</Text>
        </AddOnRow>
      )
    }
  </CreateSessionContext.Consumer>
))

Row.propTypes = {
  navigation: PropTypes.object,
}

export class Screen extends Component {
  static navigationOptions = { title: "Set variants" }

  state = {}

  render() {
    return (
      <CreateSessionContext.Consumer>
        {({ variants, setVariants }) => (
          <View style={{ padding: Spacing.m }}>
            <TextInput
              value={variants}
              placeholder="Describe the variants you played"
              onChangeText={variants => setVariants(variants)}
            />
          </View>
        )}
      </CreateSessionContext.Consumer>
    )
  }
}
