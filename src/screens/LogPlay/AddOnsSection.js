import PropTypes from "prop-types"
import React, { Component } from "react"
import { View, ScrollView } from "react-native"
import Box from "../../components/shared/Box"
import DividerHeading from "../../components/shared/DividerHeading"
import Spacing from "../../constants/Spacing"
import styled from "styled-components"
import { SessionContext } from "../../contexts/session-context"
import { Button as LocationButton, Row as LocationRow } from "./addons/Location"
import { Button as PlaytimeButton, Row as PlaytimeRow } from "./addons/Playtime"
import { Button as RoundsButton, Row as RoundsRow } from "./addons/Rounds"
import { Button as VariantsButton, Row as VariantsRow } from "./addons/Variants"

const Item = styled.View`
  margin-left: ${Spacing.m};
`

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
                <ScrollView horizontal={true}>
                  <View
                    style={{
                      paddingVertical: Spacing.m,
                      paddingRight: Spacing.m,
                      flexDirection: "row",
                    }}
                  >
                    <Item>
                      <LocationButton />
                    </Item>
                    <Item>
                      <PlaytimeButton />
                    </Item>
                    <Item>
                      <RoundsButton />
                    </Item>
                    <Item>
                      <VariantsButton />
                    </Item>
                    <Item>
                      <VariantsButton />
                    </Item>
                  </View>
                </ScrollView>
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
