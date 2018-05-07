import React, { Component } from "react"
import PropTypes from "prop-types"
import { View } from "react-native"
import DividerHeading from "../../components/shared/DividerHeading"
import Spacing from "../../constants/Spacing"
import ButtonSquare from "../../components/shared/ButtonSquare"
import { SessionContext } from "../../contexts/session-context"
import Colors from "../../constants/Colors"

const AddOnButton = ({ title, icon, done = false, onPress }) => {
  return (
    <ButtonSquare
      title={title}
      icon={done ? "check" : icon}
      color={done ? Colors.success : Colors.primary}
      onPress={onPress}
    />
  )
}

AddOnButton.propTypes = {
  title: PropTypes.string.isRequired,
  icon: PropTypes.string.isRequired,
  done: PropTypes.bool.isRequired,
  onPress: PropTypes.func.isRequired,
}

class AddOnsSection extends Component {
  static propTypes = {
    location: PropTypes.shape({}),
  }

  state = {}
  render() {
    const { location } = this.props

    return (
      <View>
        <DividerHeading>Add-ons</DividerHeading>
        <View style={{ padding: Spacing.m, flexDirection: "row" }}>
          <AddOnButton
            title="Location"
            icon="map-pin"
            done={location !== undefined}
          />
          <AddOnButton title="Playtime" icon="clock" />
          <AddOnButton title="Rounds" icon="repeat" />
          <AddOnButton title="Variants" icon="corner-left-done" />
        </View>
      </View>
    )
  }
}

export default () => (
  <SessionContext.Consumer>
    {({ location }) => {
      return <AddOnsSection location={location} />
    }}
  </SessionContext.Consumer>
)
