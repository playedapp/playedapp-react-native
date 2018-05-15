import PropTypes from "prop-types"
import React, { Component } from "react"
import { View } from "react-native"
import Box from "../../components/shared/Box"
import DividerHeading from "../../components/shared/DividerHeading"
import Spacing from "../../constants/Spacing"
import { SessionContext } from "../../contexts/session-context"
import { Button as LocationButton, Row as LocationRow } from "./addons/Location"
import { Button as PlaytimeButton, Row as PlaytimeRow } from "./addons/Playtime"
import { Button as RoundsButton, Row as RoundsRow } from "./addons/Rounds"
import { Button as VariantsButton, Row as VariantsRow } from "./addons/Variants"

class AddOnsSection extends Component {
  static propTypes = {
    location: PropTypes.shape({}),
  }

  render() {
    return (
      <View>
        <DividerHeading>Add-ons</DividerHeading>
        <SessionContext.Consumer>
          {({ location, playtime, rounds, variants }) => {
            const hasAddons =
              location !== undefined ||
              playtime !== undefined ||
              rounds !== undefined ||
              variants !== undefined

            return (
              <View>
                <View style={{ padding: Spacing.m, flexDirection: "row" }}>
                  <LocationButton />
                  <PlaytimeButton />
                  <RoundsButton />
                  <VariantsButton />
                </View>
                {hasAddons && (
                  <View style={{ padding: Spacing.m }}>
                    <Box>
                      <LocationRow />
                      <PlaytimeRow />
                      <RoundsRow />
                      <VariantsRow />
                    </Box>
                  </View>
                )}
              </View>
            )
          }}
        </SessionContext.Consumer>
      </View>
    )
  }
}

export default AddOnsSection

// export default () => (
//   <SessionContext.Consumer>
//     {({ location, setLocation }) => {
//       return <AddOnsSection location={location} setLocation={setLocation} />
//     }}
//   </SessionContext.Consumer>
// )
